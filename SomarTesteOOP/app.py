from flask import Flask
from webargs import fields
from webargs.flaskparser import use_kwargs
from flask_restplus import Resource, abort, Api

from business.search import Search
from repository.repository import Repository

app = Flask(__name__)

api = Api(
    app,
    version="0.1",
    title="ApiTesteSomar",
    description="Api para pesquisa de dados meteorologicos Somar" "Meteorologia",
)
ns = api.namespace("APItesteSomar", description="Desafio Somar Dados Meteorologicos")

search = Search()

#####################################################################################
############################### OBSERVED VIEWS ######################################
#####################################################################################

obs_url = "data/observed/"


@ns.route("/observed")
class ObservedPointsAndSinglePointByName(Resource):
    search.repo.url = obs_url

    @staticmethod
    def get():
        """
        Lista de todos os pontos observados (nome da cidade-estado, latitude, longitude).
        """
        return search.repo.list_points()

    args = {
        "cidade": fields.Str(required=True),
    }

    @use_kwargs(args)
    @api.doc(params={"cidade": "insira o nome de uma cidade"})
    def post(self, cidade):
        """
        Busca dados de um ponto com base em seu nome, todos os periodos disponiveis (cidade)
        BUSQUE SEMPRE POR NOMES COMPLETOS! A APLICAÇAO E CONFIGURADA PARA BUSCAR O RESULTADO
         MAIS PROXIMO/RAPIDO! EX: ABAETE !== ABAETETUBA !== ABAETEDOSMENDES
        """
        cidade = cidade.upper().strip()
        for file in search.repo.dir_list():
            if cidade in file:
                result = search.singlepoint_search(file, cidade)
                return result
        else:
            return abort(400, message="Cidade nao existe")


@ns.route("/observed/latlon")
@api.doc(params={"lat": "latitude de uma cidade", "lon": "longitude de uma cidade"})
class SinglePointByLatAndLon(Resource):

    search.repo.url = obs_url

    args = {
        "lat": fields.Float(required=True),
        "lon": fields.Float(required=True),
    }

    @use_kwargs(args)
    def post(self, lat, lon):
        """
        Busca de dados observados por latitude e longitude da cidade. Ex: lat=-16.18&lon=-40.69
        """
        lat = str(lat).strip()
        lon = str(lon).strip()

        for file in search.repo.dir_list():
            if lat in file and lon in file:
                result = search.lat_lon_search(lat, lon, file)
                return result
        else:
            return abort(400, message="Coordenadas inexistentes")


@ns.route("/observed/cidadeporperiodos")
@api.doc(
    params={
        "cidade": "nome de uma cidade",
        "datainicial": "ex: 2019-08-01",
        "datafinal": "ex: 2019-09-01",
    }
)
class DataFromSinglePointByDate(Resource):
    search.repo.url = obs_url

    args = {
        "cidade": fields.Str(required=True),
        "datainicial": fields.Str(required=True),
        "datafinal": fields.Str(required=True),
    }

    @use_kwargs(args)
    def post(self, cidade, datainicial, datafinal):
        """
              Busca de dados observados por periodo de datas e cidade. Ex: cidade=abadiania&datainicial=2019-08-13
              &datafinal=2019-09-01
        """
        cidade = str(cidade).upper().strip()
        datainicial = str(datainicial).strip()
        datafinal = str(datafinal).strip()

        for file in search.repo.dir_list():
            if cidade in file:
                result = search.period_search(file, datainicial, datafinal)
                return result
        else:
            return abort(400, message="Cidade ou Periodo inexistente")


#####################################################################################
############################### FORECAST VIEWS ######################################
#####################################################################################

fore_url = "data/forecast/"


@ns.route("/forecast")
class ForecastPointsAndSinglePointByName(Resource):
    search.repo.url = fore_url

    def get(self):
        """
        Lista de todos os pontos forecast (nome da cidade-estado, latitude, longitude).
        """
        return search.repo.list_points()

    args = {
        "cidade": fields.Str(required=True),
    }

    @use_kwargs(args)
    @api.doc(params={"cidade": "insira o nome de uma cidade"})
    def post(self, cidade):
        """
        Busca forecast de um ponto com base em seu nome, todos os periodos disponiveis
        BUSQUE SEMPRE POR NOMES COMPLETOS! A APLICAÇAO E CONFIGURADA PARA BUSCAR O RESULTADO
         MAIS PROXIMO/RAPIDO! EX: ABAETE !== ABETETUBA !== ABAETEDOSMENDES
        """
        cidade = cidade.upper().strip()
        for file in search.repo.dir_list():
            if cidade in file:
                result = search.singlepoint_search(file, cidade)
                return result
        else:
            return abort(400, message="Cidade nao existe")


@ns.route("/forecast/latlon")
@api.doc(params={"lat": "latitude de uma cidade", "lon": "longitude de uma cidade"})
class SingleForecastByLatAndLon(Resource):
    search.repo.url = fore_url

    args = {
        "lat": fields.Float(required=True),
        "lon": fields.Float(required=True),
    }

    @use_kwargs(args)
    def post(self, lat, lon):
        """
        Busca de dados forecast por latitude e longitude da cidade
        """
        lat = str(lat).strip()
        lon = str(lon).strip()

        for file in search.repo.dir_list():
            if lat in file and lon in file:
                result = search.lat_lon_search(lat, lon, file)
                return result

        else:
            return abort(400, message="Coordenadas inexistentes")


@ns.route("/forecast/cidadeporperiodos")
@api.doc(
    params={
        "cidade": "nome de uma cidade",
        "datainicial": "ex: 2019-08-01",
        "datafinal": "ex: 2019-09-01",
    }
)
class DataFromSingleForecastByDate(Resource):
    search.repo.url = fore_url

    args = {
        "cidade": fields.Str(required=True),
        "datainicial": fields.Str(required=True),
        "datafinal": fields.Str(required=True),
    }

    @use_kwargs(args)
    def post(self, cidade, datainicial, datafinal):
        """
        Busca de dados forecast por periodo de datas e cidade Ex: cidade=abadiania&datainicial=2019-08-13&datafinal=2019-09-01
        """

        cidade = str(cidade).upper().strip()
        datainicial = str(datainicial).strip()
        datafinal = str(datafinal).strip()

        for file in search.repo.dir_list():
            if cidade in file:
                result = search.period_search(file, datainicial, datafinal)
                return result
        else:
            return abort(400, message="Cidade ou Periodo inexistente")


if __name__ == "__main__":
    app.run()
