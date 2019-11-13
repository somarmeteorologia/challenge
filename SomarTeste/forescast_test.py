from flask import request
import json

from repository.forecast_repo import forecast_dir_list, forecast_list_points, forecast_read_and_parse
from helpers.forecast_helpers import forecast_singlepoint_search, forecast_lat_lon_search, forecast_period_search

from app import app, ForecastPointsAndSinglePointByName

app.testing = True
client = app.test_client()

#####################################################################################
############################### FORECAST REPO TESTS #################################
#####################################################################################


def test_forecast_list():
    assert len(forecast_list_points()) == len(forecast_dir_list())

#####################################################################################
############################### FORECAST VIEWS TESTS #################################
#####################################################################################


def test_ForecastPointsAndSinglePointByNameGET():
    forecast = ForecastPointsAndSinglePointByName().get()
    assert len(forecast), 201 == len(forecast_list_points())


def test_ForecastPointsAndSinglePointByNamePOST():
    with client as c:
        rv = c.post('APItesteSomar/forecast?cidade=abobora')
        cidade = 'abobora'
        cidade = cidade.upper().strip()
        for file in forecast_dir_list():
            if cidade in file:
                result = forecast_singlepoint_search(file, cidade)
        assert request.args['cidade'] == 'abobora'
        assert json.loads(rv.get_data()) == result


def test_SingleForecastByLatAndLon():
    with client as c:
        rv = c.post('APItesteSomar/forecast/latlon?lat=-23.57&lon=-46.83')
        lat = '-23.57'
        lon = '-46.83'
        for file in forecast_dir_list():
            if lat and lon in file:
                result = forecast_lat_lon_search(lat, lon, file)
        assert request.args['lat'] == lat
        assert request.args['lon'] == lon
        assert json.loads(rv.get_data()) == result


def test_DataFromSingleForecastByDate():
    with client as c:
        rv = c.post('APItesteSomar/forecast/cidadeporperiodos?cidade=abobora&datainicial=2019-08-13&datafinal=2019-09-01')
        cidade = 'abobora'
        datainicial = '2019-08-13'
        datafinal = '2019-09-01'
        cidade = str(cidade).upper().strip()
        datainicial = str(datainicial).strip()
        datafinal = str(datafinal).strip()
        for file in forecast_dir_list():
            if cidade in file:
               result = forecast_period_search(file, datainicial, datafinal)
        assert request.args['cidade'] == 'abobora'
        assert request.args['datainicial'] == datainicial
        assert request.args['datafinal'] == datafinal
        assert json.loads(rv.get_data()) == result



