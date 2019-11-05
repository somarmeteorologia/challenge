import os
import pandas as pd
import json


def observed_dir_list():
    return os.listdir('data/observed')


def list_points():
    points = []
    data = observed_dir_list()
    for i in range(data.__len__()):
        points.append(data[i].strip('.CSV').split('_'))

    points = pd.DataFrame(points, columns=['cidade-estado', 'latitude', 'longitude'])
    points = json.loads(points.to_json(orient='records'))
    return points


def read_and_parse(file):
    df = pd.read_csv('data/observed/' + file, encoding='utf-8', sep=';', header=0)
    df = df.drop(df.columns[len(df.columns) - 1], axis=1)
    temp = json.loads(df.to_json(orient='records'))
    return temp



