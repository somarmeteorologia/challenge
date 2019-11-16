import pytest
from flask import Response
import json
from app import app
from business.search import Search
from repository.repository import Repository

app.testing = True
client = app.test_client()

search = Search()


def test_singlepointsearch():
    with client as c:
        search.repo.url = "data/forecast/"
        cidade = "abobora"
        cidade = str(cidade).upper().strip()
        rv = c.post("APItesteSomar/forecast?cidade=" + cidade)
        for file in search.repo.dir_list():
            if cidade in file:
                result = search.singlepoint_search(file, cidade)
        assert json.loads(rv.get_data()) == result
        cidade = 'blablalbal'
        rv = c.post("APItesteSomar/forecast?cidade=" + cidade)
        result = {'message': 'Cidade nao existe'}
        assert json.loads(rv.get_data()) == result


def test_latlonsearch():
    with client as c:
        search.repo.url = "data/forecast/"
        lat = "-23.57"
        lon = "-46.83"
        rv = c.post("APItesteSomar/forecast/latlon?lat=-23.57&lon=-46.83")
        for file in search.repo.dir_list():
            if lat in file and lon in file:
                result = search.lat_lon_search(lat, lon, file)
        assert json.loads(rv.get_data()) == result
        rv = c.post("APItesteSomar/forecast/latlon?lat=22.332&lon=-46.83")
        result = {'message': 'Coordenadas inexistentes'}
        assert json.loads(rv.get_data()) == result


def test_periodsearch():
    with client as c:
        search.repo.url = "data/forecast/"
        rv = c.post(
            "APItesteSomar/forecast/cidadeporperiodos?cidade=abobora&datainicial=2019-08-13&datafinal=2019-09-01"
        )
        cidade = "abobora"
        datainicial = "2019-08-13"
        datafinal = "2019-09-01"
        cidade = str(cidade).upper().strip()
        datainicial = str(datainicial).strip()
        datafinal = str(datafinal).strip()
        for file in search.repo.dir_list():
            if cidade in file:
                result = search.period_search(file, datainicial, datafinal)
                assert json.loads(rv.get_data()) == result
        rv = c.post(
            "APItesteSomar/forecast/cidadeporperiodos?cidade=blablal&datainicial=2019-08-13&datafinal=2019-09-01")
        result = {'message': "Cidade ou Periodo inexistente"}
        assert json.loads(rv.get_data()) == result

