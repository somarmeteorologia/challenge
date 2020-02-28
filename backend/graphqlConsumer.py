import os
import pandas as pd
from datetime import datetime, timedelta
import graphene
from cerberus import Validator

""" Global Variables
These variables are used to support the classes and functions defined here
"""
stations = pd.read_csv('stations.csv')  # DataFrame with stations names and lat/lon
os.chdir('data')  # subdirectory with all data
cwd = os.getcwd()  #

init_observed_date = datetime.strptime('2019-08-12', "%Y-%m-%d")  # Data properties
final_observed_date = datetime.strptime('2019-09-10', "%Y-%m-%d")  #

today = datetime.strptime('2019-09-11', "%Y-%m-%d")  #
final_forecast_date = datetime.strptime("2019-10-10", "%Y-%m-%d")  #


def list_indexes(index, first):
    """
    :param index: reference index to get indexes from
    :param first: how many index we want
    :return: returns the indexes of the 'first' stations nearest to the reference index station
    """
    diference = [float(stations['latitude'][index]) - stations['latitude'],
                 float(stations['longitude'][index]) - stations['longitude']]
    square_distance = diference[0] ** 2 + diference[1] ** 2

    return square_distance.sort_values().index[0:first]


def get_index(first=1, station=None, latitude=None, longitude=None):
    """

    :param station: central station to get info from. if first=1, then it's the only station to be used.(station is
    priority in case lat/lon are also given)
    :param latitude: latitude to get stations from
    :param longitude: longitude to get stations from
    :param first: how many stations to get from latitude/longitude or station given. If the first argument passed isn't
    an integer between 1 and 200, first will be assigned the integer '1'
    :return: returns a list of indexes to identify the stations on the database (csv-files)
        or   returns False if either station or lat/lon args are incorrect

    """
    if not (0 < first <= 200):
        first = 1
    if station:
        schema = {'station': {'type': 'string', 'allowed': list(stations['estacao'])}}
        document = {'station': station}
        v = Validator(schema)
        validator = v.validate(document)

        if validator:
            return list_indexes(stations.where(stations['estacao'] == station).first_valid_index(), first)
        else:
            return Exception(v.errors)

    elif latitude and longitude:

        closest_index = 0
        dist = 9999999999999
        for i in range(len(stations)):

            diference = [float(latitude) - stations['latitude'][i], float(longitude) - stations['longitude'][i]]
            square_distance = diference[0] ** 2 + diference[1] ** 2

            if square_distance < dist:
                dist = square_distance
                closest_index = i

        return list_indexes(closest_index, first)

    else:
        return Exception("Neither a valid station nor lat/lon was sent")


def observed(index, init_date=None, final_date=None, days=1):
    """

    :param index: from get_index to identify station file
    :param init_date: initial date for period query
    :param final_date: final date for period query
    :param days: how many days from yesterday on for days query
    :return: data frame with required data (Prioritize period query) or False if neither input is valid
    """

    files = os.listdir(cwd + '/observed')
    os.chdir(cwd + '/observed')
    if init_date is not None and final_date is not None:
        if init_date >= init_observed_date and final_date <= final_observed_date:
            df = pd.read_csv(files[index], sep=';')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return df[init_date:final_date + timedelta(days=1)]

    elif days:
        init_date = today - timedelta(days=int(days))
        if init_date >= init_observed_date:
            df = pd.read_csv(files[index], sep=';')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return df[init_date:today]

    return False


def forecast(index, init_date=None, final_date=None, days=1):
    """

    :param index: from get_index to identify station file
    :param init_date: initial date for period query
    :param final_date: final date for period query
    :param days: how many days from today on for days query
    :return: data frame with required data (Prioritize period query) or False if neither input is valid
    """
    files = os.listdir(cwd + '/forecast')
    os.chdir(cwd + '/forecast')
    if init_date is not None and final_date is not None:
        if init_date >= today and final_date <= final_forecast_date:
            df = pd.read_csv(files[index], sep=';')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return df[init_date:final_date + timedelta(days=1)]

    elif days:
        final_date = today + timedelta(days=int(days))
        if final_date <= final_forecast_date:
            df = pd.read_csv(files[index], sep=';')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return df[today:final_date]

    return False


class forecastData(graphene.ObjectType):
    periods = graphene.List(graphene.String)
    precipitation = graphene.List(graphene.List(graphene.Float))
    max_temperature = graphene.List(graphene.List(graphene.Float))
    min_temperature = graphene.List(graphene.List(graphene.Float))
    max_rel_humidity = graphene.List(graphene.List(graphene.Float))
    min_rel_humidity = graphene.List(graphene.List(graphene.Float))
    max_pressure = graphene.List(graphene.List(graphene.Float))
    min_pressure = graphene.List(graphene.List(graphene.Float))
    wind_gust = graphene.List(graphene.List(graphene.Float))
    frost_alert = graphene.List(graphene.List(graphene.Int))
    etp = graphene.List(graphene.List(graphene.Float))
    radiation = graphene.List(graphene.List(graphene.Float))
    wetting = graphene.List(graphene.List(graphene.Float))


class observedData(graphene.ObjectType):
    periods = graphene.List(graphene.String)
    precipitation = graphene.List(graphene.List(graphene.Float))
    max_temperature = graphene.List(graphene.List(graphene.Float))
    min_temperature = graphene.List(graphene.List(graphene.Float))
    max_rel_humidity = graphene.List(graphene.List(graphene.Float))
    min_rel_humidity = graphene.List(graphene.List(graphene.Float))
    max_pressure = graphene.List(graphene.List(graphene.Float))
    min_pressure = graphene.List(graphene.List(graphene.Float))
    wind_gust = graphene.List(graphene.List(graphene.Float))
    frost_alert = graphene.List(graphene.List(graphene.Int))
    etp = graphene.List(graphene.List(graphene.Float))
    radiation = graphene.List(graphene.List(graphene.Float))
    wetting = graphene.List(graphene.List(graphene.Float))


class Stations(graphene.ObjectType):
    name = graphene.List(graphene.String)
    location = graphene.Field(graphene.String)

    observed = graphene.Field(observedData,
                              initdate=graphene.String(),
                              finaldate=graphene.String(),
                              days=graphene.Int())

    forecast = graphene.Field(forecastData,
                              initdate=graphene.String(),
                              finaldate=graphene.String(),
                              days=graphene.Int())

    def resolve_name(parent, info):
        return [stations['estacao'][i] for i in parent]

    def resolve_location(parent, info):
        return {'longitude': [stations['longitude'][i] for i in parent],
                'latitude': [stations['latitude'][i] for i in parent]}

    def resolve_observed(parent, info, initdate=False, finaldate=False, days=False):
        # initdate and finaldate have priority over day
        if initdate and finaldate:
            initdate = datetime.strptime(initdate, "%Y-%m-%d")
            finaldate = datetime.strptime(finaldate, "%Y-%m-%d")
            schema = {'initdate': {'type': 'date', 'min': init_observed_date, 'max': final_observed_date},
                      'finaldate': {'type': 'date', 'min': initdate, 'max': final_observed_date}}

            document = {'initdate': initdate, 'finaldate': finaldate}
            v = Validator(schema)
            validator = v.validate(document)
            if validator:
                output = {
                    'precipitation': [], 'max_temperature': [], 'min_temperature': [],
                    'max_rel_humidity': [], 'min_rel_humidity': [], 'max_pressure': [],
                    'min_pressure': [], 'wind_gust': [], 'frost_alert': [],
                    'etp': [], 'radiation': [], 'wetting': []
                }

                for i in parent:
                    data = observed(index=i, init_date=initdate, final_date=finaldate, days=days).to_dict(orient='list')
                    for j in output:
                        output[j].append(data[j])
                output['periods'] = observed(index=0, init_date=initdate, final_date=finaldate,
                                             days=days).index.strftime("%Y-%m-%d %H:%M:%S").tolist()
                return output
            else:
                return Exception(v.errors)

        elif not (1 <= int(days) < 200):
            return Exception("Neither a valid init/final dates nor days arguments were given")

        else:
            output = {
                'precipitation': [], 'max_temperature': [], 'min_temperature': [],
                'max_rel_humidity': [], 'min_rel_humidity': [], 'max_pressure': [],
                'min_pressure': [], 'wind_gust': [], 'frost_alert': [],
                'etp': [], 'radiation': [], 'wetting': []
            }

            for i in parent:
                data = observed(index=i, days=days).to_dict(orient='list')
                for j in output:
                    output[j].append(data[j])
            output['periods'] = observed(index=0, days=days).index.strftime("%Y-%m-%d %H:%M:%S").tolist()
            return output

    def resolve_forecast(parent, info, initdate=None, finaldate=None, days=None):
        # initdate and finaldate have priority over day
        if initdate and finaldate:
            initdate = datetime.strptime(initdate, "%Y-%m-%d")
            finaldate = datetime.strptime(finaldate, "%Y-%m-%d")
            schema = {'initdate': {'type': 'date', 'min': today, 'max': final_forecast_date},
                      'finaldate': {'type': 'date', 'min': initdate, 'max': final_forecast_date}}

            document = {'initdate': initdate, 'finaldate': finaldate}
            v = Validator(schema)
            validator = v.validate(document)
            if validator:
                output = {
                    'precipitation': [], 'temperature': [], 'max_temperature': [],
                    'min_temperature': [], 'rel_humidity': [], 'wind_speed': [],
                    'wind_direction': [], 'pressure': [], 'weather_conditions': [],
                    'atmospheric_conditions': [], 'thunderstorm_alerts': [],
                    'thermal_sensation': [], 'max_sensation': [],
                    'min_sensation': [], 'frost_alert': [], 'etp': []
                }

                for i in parent:
                    data = forecast(index=i, init_date=initdate, final_date=finaldate, days=days).to_dict(
                        orient='list')
                    for j in output:
                        output[j].append(data[j])
                output['periods'] = forecast(index=0, days=days, init_date=initdate,
                                             final_date=finaldate).index.strftime("%Y-%m-%d %H:%M:%S").tolist()
                return output
            else:
                return Exception(v.errors)

        elif not (1 <= int(days) < 200):
            return Exception("Neither a valid init/final dates nor days arguments were given")

        else:
            output = {
                'precipitation': [], 'temperature': [], 'max_temperature': [],
                'min_temperature': [], 'rel_humidity': [], 'wind_speed': [],
                'wind_direction': [], 'pressure': [], 'weather_conditions': [],
                'atmospheric_conditions': [], 'thunderstorm_alerts': [],
                'thermal_sensation': [], 'max_sensation': [],
                'min_sensation': [], 'frost_alert': [], 'etp': []
            }

            for i in parent:
                data = forecast(index=i, days=days).to_dict(orient='list')
                for j in output:
                    output[j].append(data[j])

            output['periods'] = forecast(index=0, days=days).index.strftime("%Y-%m-%d %H:%M:%S").tolist()

            return output


class Query(graphene.ObjectType):
    stations = graphene.Field(Stations,
                              station=graphene.String(),
                              latitude=graphene.Float(),
                              longitude=graphene.Float(),
                              first=graphene.Int())

    def resolve_stations(parent, info, station=None, latitude=None, longitude=None, first=1):
        return get_index(first=first, latitude=latitude, longitude=longitude,
                         station=station)  # validation on the function


schema = graphene.Schema(query=Query)



