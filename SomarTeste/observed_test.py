from flask import request
import json

from helpers.observed_helpers import observed_singlepoint_search, observed_lat_lon_search, observed_period_search
from repository.observed_repo import observed_dir_list, list_points
from app import ObservedPointsAndSinglePointByName
from app import app


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
        rv = c.post('APItesteSomar/observed?cidade=abobora')
        cidade = 'abobora'
        cidade = cidade.upper().strip()
        for file in observed_dir_list():
            if cidade in file:
                result = observed_singlepoint_search(file, cidade)
        assert request.args['cidade'] == 'abobora'
        assert json.loads(rv.get_data()) == result


def test_SinglePointByLatAndLon():
    with client as c:
        rv = c.post('APItesteSomar/observed/latlon?lat=-23.57&lon=-46.83')
        lat = '-23.57'
        lon = '-46.83'
        for file in observed_dir_list():
            if lat and lon in file:
                result = observed_lat_lon_search(lat, lon, file)
        assert request.args['lat'] == lat
        assert request.args['lon'] == lon
        assert json.loads(rv.get_data()) == result


def test_DataFromSinglePointByDate():
    with client as c:
        rv = c.post('APItesteSomar/observed/cidadeporperiodos?cidade=abobora&datainicial=2019-08-13&datafinal=2019-09-01')
        cidade = 'abobora'
        datainicial = '2019-08-13'
        datafinal = '2019-09-01'
        cidade = str(cidade).upper().strip()
        datainicial = str(datainicial).strip()
        datafinal = str(datafinal).strip()
        for file in observed_dir_list():
            if cidade in file:
                result = observed_period_search(file, datainicial, datafinal)
        assert request.args['cidade'] == cidade.lower()
        assert request.args['datainicial'] == datainicial
        assert request.args['datafinal'] == datafinal
        assert json.loads(rv.get_data()) == result


