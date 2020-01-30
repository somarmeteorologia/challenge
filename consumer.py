import os
import pandas as pd
from datetime import datetime, timedelta
import json

""" Global Variables
These variables are used to support the classes and functions defined here
"""
stations = pd.read_csv('stations.csv')  # DataFrame with stations names and lat/lon
os.chdir('data')                                                        # subdirectory with all data
cwd = os.getcwd()                                                       #


init_observed_date = datetime.strptime('2019-08-12', "%Y-%m-%d")        # Data properties
final_observed_date = datetime.strptime('2019-09-10', "%Y-%m-%d")       #

today = datetime.strptime('2019-09-11', "%Y-%m-%d")                     #
final_forecast_date = datetime.strptime("2019-10-10", "%Y-%m-%d")       #


def get_index(station, latitude, longitude):
    """

    :param station: station from request.args
    :param latitude: latitude from request.args
    :param longitude: longitude from request.args
    :return: index of station on stations data frame (used to get file on data/forecast or
    data/observed folder). It prioritizes the station argument, if station isn't provided it'll look for the closest
    station to the latitude/longitude given (if none the args or given this functions isn't even called)
    """

    if station:
        index = stations.where(stations['estacao'] == station).first_valid_index()  # Returns None if name is incorrect
        if index is not None:
            return index
    else:

        best_index = 0
        best_dist = 999999
        for i in range(len(stations)):
            diference = [float(latitude) - stations['latitude'][i], float(longitude) - stations['longitude'][i]]
            square_distance = diference[0] ** 2 + diference[1] ** 2
            if square_distance < best_dist:
                best_dist = square_distance
                best_index = i

        return best_index

def observed(index, init_date, final_date, days):
    """

    :param index: from get_index to identify station file
    :param init_date: initial date for period query
    :param final_date: final date for period query
    :param days: how many days from yesterday on for days query
    :return: data frame with required data (Prioritize period query) or False if neither input is valid
    """
    os.chdir(cwd + '/observed')
    files = os.listdir()
    if init_date and final_date:
        init_date = datetime.strptime(init_date, "%Y-%m-%d")
        final_date = datetime.strptime(final_date, "%Y-%m-%d")

        if init_date >= init_observed_date and final_date <= final_observed_date:
            df = pd.read_csv(files[index], sep=';').drop(columns='Unnamed: 14')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return [True, df[init_date:final_date + timedelta(days=1)]]

    elif days:
        init_date = today - timedelta(days=int(days))
        if init_date >= init_observed_date:
            df = pd.read_csv(files[index], sep=';').drop(columns='Unnamed: 14')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return [True, df[init_date:today]]

    return [False]


def forecast(index, init_date, final_date, days):
    """

    :param index: from get_index to identify station file
    :param init_date: initial date for period query
    :param final_date: final date for period query
    :param days: how many days from today on for days query
    :return: data frame with required data (Prioritize period query) or False if neither input is valid
    """
    os.chdir(cwd + '/forecast')
    files = os.listdir()

    if init_date and final_date:
        init_date = datetime.strptime(init_date, "%Y-%m-%d")

        final_date = datetime.strptime(final_date, "%Y-%m-%d")

        if init_date >= today and final_date <= final_forecast_date:
            df = pd.read_csv(files[index], sep=';').drop(columns='Unnamed: 17')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return [True, df[init_date:final_date + timedelta(days=1)]]

    elif days:
        final_date = today

        if final_date <= final_forecast_date:
            df = pd.read_csv(files[index], sep=';').drop(columns='Unnamed: 17')
            df['periods'] = pd.to_datetime(df['periods'])
            df = df.set_index('periods')

            return [True, df[today:today + timedelta(days=int(days))]]

    return [False]


class ObservedConsumer():
    """
    This class is going to be used by the api to get the json response or an error message if the period arguments
    are incorrect
    """

    def __init__(self, index, init_date, final_date, days):

        data = observed(index, init_date, final_date, days)
        if data[0]:
            self.status = True
            self.periods = data[1].index.strftime("%Y-%m-%d %H:%M:%S").tolist()
            self.data = data[1].to_dict(orient='list')
            self.info = {'name': stations['estacao'][index],
                         'location': {
                             'longitude': stations['longitude'][index],
                             'latitude': stations['latitude'][index]
                         }
                         }
        else:
            self.status = False

    def dicto(self):
        """

        :return: Returns a dict according to the challenge model
        """
        self.dict = {"periods": self.periods, "info": self.info, "data": self.data}
        return self.dict

    def json(self):
        """

        :return: Makes dicto's return a json to be return to the browser
        """
        self.json = json.dumps(self.dicto())
        return self.json


class ForecastConsumer():
    """
    This class is going to be used by the api to get the json response or an error message if the period arguments
    are incorrect
    """
    def __init__(self, index, init_date, final_date, days):

        data = forecast(index, init_date, final_date, days)
        if data[0]:
            self.status = True
            self.periods = data[1].index.strftime("%Y-%m-%d %H:%M:%S").tolist()
            self.data = data[1].to_dict(orient='list')
            self.info = {'name': stations['estacao'][index],
                         'location': {
                             'longitude': stations['longitude'][index],
                             'latitude': stations['latitude'][index]
                         }
                         }
        else:
            self.status = False

    def dicto(self):
        """

        :return: Returns a dict according to the challenge model
        """
        self.dict = {"periods": self.periods, "info": self.info, "data": self.data}
        return self.dict

    def json(self):
        """

        :return: Makes dicto's return a json to be return to the browser
        """
        self.json = json.dumps(self.dicto())
        return self.json
