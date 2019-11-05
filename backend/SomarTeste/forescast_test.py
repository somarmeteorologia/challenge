from repository.forecast_repo import forecast_list_points,forecast_read_and_parse,forecast_dir_list
from app import app, ForecastPointsAndSinglePointByName
from flask import request
import json


app.testing = True
client = app.test_client()

#####################################################################################
############################### FORECAST REPO TESTS #################################
#####################################################################################


def forecast_list():
    assert len(forecast_list_points()) == len(forecast_dir_list())

#####################################################################################
############################### FORECAST VIEWS TESTS #################################
#####################################################################################


def test_ForecastPointsAndSinglePointByNameGET():
    forecast = ForecastPointsAndSinglePointByName().get()
    assert len(forecast), 201 == len(forecast_list_points())


def test_ForecastPointsAndSinglePointByNamePOST():
    with client as c:
        rv = c.post("APItesteSomar/forecast?cidade=abobora")
        cidade = 'abobora'
        cidade = cidade.upper().strip()
        for file in forecast_dir_list():
            if cidade in file:
                temp1 = dict(data=forecast_read_and_parse(file.upper()))
                temp2 = forecast_list_points()
                idxs = [i for i in range(len(temp2))]
                temp2 = dict(zip(idxs, temp2))
                for i in range(len(temp2)):
                    if cidade in temp2[i]['cidade-estado']:
                        result = {**temp2[i], **temp1}
        assert request.args['cidade'] == 'abobora'
        assert json.loads(rv.get_data()) == result


def test_SingleForecastByLatAndLon():
    with client as c:
        rv = c.post("APItesteSomar/forecast/latlon?lat=-23.57&lon=-46.83")
        lat = "-23.57"
        lon = "-46.83"
        for file in forecast_dir_list():
            if lat and lon in file:
                temp1 = dict(data=forecast_read_and_parse(file.upper()))
                temp2 = forecast_list_points()
                idxs = [i for i in range(len(temp2))]
                temp2 = dict(zip(idxs, temp2))
                for i in range(len(temp2)):
                    if lat in temp2[i]['latitude'] and lon in temp2[i]['longitude']:
                        result = {**temp2[i], **temp1}
        assert request.args['lat'] == lat
        assert request.args['lon'] == lon
        assert json.loads(rv.get_data()) == result


def test_DataFromSingleForecastByDate():
    with client as c:
        rv = c.post("APItesteSomar/forecast/cidadeporperiodos?cidade=abobora&datainicial=2019-08-13&datafinal=2019-09-01")
        cidade = "abobora"
        datainicial = '2019-08-13'
        datafinal = '2019-09-01'
        cidade = str(cidade).upper().strip()
        datainicial = str(datainicial).strip()
        datafinal = str(datafinal).strip()
        for file in forecast_dir_list():
            if cidade in file:
                temp1 = forecast_read_and_parse(file.upper())
                periods_list_1 = [temp1[i]['periods'].split()[0] for i in range(len(temp1))]
                if datainicial in periods_list_1 and datafinal in periods_list_1:
                    indexinicial = periods_list_1.index(datainicial)
                    indexfinal = periods_list_1.index(datafinal)
                    final = [temp1[i] for i in range(indexinicial, indexfinal + 1)]
                    assert json.loads(rv.get_data()) == final
        assert request.args['cidade'] == 'abobora'
        assert request.args['datainicial'] == datainicial
        assert request.args['datafinal'] == datafinal



