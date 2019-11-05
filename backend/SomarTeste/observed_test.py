from repository.observed_repo import list_points, observed_dir_list, read_and_parse
from app import ObservedPointsAndSinglePointByName
from app import app
from flask import request
import json


app.testing = True
client = app.test_client()

#####################################################################################
############################### OBSERVED REPO TESTS #################################
#####################################################################################

def test_list_points():
    assert len(list_points()) == len(observed_dir_list())

#####################################################################################
############################### OBSERVED VIEWS TESTS #################################
#####################################################################################


def test_ObservedPointsAndSinglePointByNameGET():
    observed = ObservedPointsAndSinglePointByName().get()
    assert len(observed), 201 == len(list_points())


def test_ObservedPointsAndSinglePointByNamePOST():
    with client as c:
        rv = c.post("APItesteSomar/observed?cidade=abobora")
        cidade = 'abobora'
        cidade = cidade.upper().strip()
        for file in observed_dir_list():
            if cidade in file:
                temp1 = dict(data=read_and_parse(file.upper()))
                temp2 = list_points()
                idxs = [i for i in range(len(temp2))]
                temp2 = dict(zip(idxs, temp2))
                for i in range(len(temp2)):
                    if cidade in temp2[i]['cidade-estado']:
                        result = {**temp2[i], **temp1}
        assert request.args['cidade'] == 'abobora'
        assert json.loads(rv.get_data()) == result


def test_SinglePointByLatAndLon():
    with client as c:
        rv = c.post("APItesteSomar/observed/latlon?lat=-23.57&lon=-46.83")
        lat = "-23.57"
        lon = "-46.83"
        for file in observed_dir_list():
            if lat and lon in file:
                temp1 = dict(data=read_and_parse(file.upper()))
                temp2 = list_points()
                idxs = [i for i in range(len(temp2))]
                temp2 = dict(zip(idxs, temp2))
                for i in range(len(temp2)):
                    if lat in temp2[i]['latitude'] and lon in temp2[i]['longitude']:
                        result = {**temp2[i], **temp1}
        assert request.args['lat'] == lat
        assert request.args['lon'] == lon
        assert json.loads(rv.get_data()) == result


def test_DataFromSinglePointByDate():
    with client as c:
        rv = c.post("APItesteSomar/observed/cidadeporperiodos?cidade=abobora&datainicial=2019-08-13&datafinal=2019-09-01")
        cidade = "abobora"
        datainicial = '2019-08-13'
        datafinal = '2019-09-01'
        cidade = str(cidade).upper().strip()
        datainicial = str(datainicial).strip()
        datafinal = str(datafinal).strip()
        for file in observed_dir_list():
            if cidade in file:
                temp1 = read_and_parse(file.upper())
                periods_list_1 = [temp1[i]['periods'].split()[0] for i in range(len(temp1))]
                if datainicial in periods_list_1 and datafinal in periods_list_1:
                    indexinicial = periods_list_1.index(datainicial)
                    indexfinal = periods_list_1.index(datafinal)
                    final_periods = [temp1[i] for i in range(indexinicial, indexfinal + 1)]
        assert request.args['cidade'] == 'abobora'
        assert request.args['datainicial'] == datainicial
        assert request.args['datafinal'] == datafinal
        assert json.loads(rv.get_data()) == final_periods
