import os
import pandas as pd
import json
import boto3

s3 = boto3.client('s3')


def forecast_dir_list():
    data = s3.list_objects(Bucket='data-somar-flask')
    data = [data["Contents"][i]['Key'].strip('data/forecast') for i in range(len(data['Contents'])) if
            "data/forecast" in data['Contents'][i]['Key']]
    return data


def forecast_list_points():
    points = []
    data = forecast_dir_list()
    for i in range(data.__len__()):
        points.append(data[i].strip('.CSV').split('_'))

    points = pd.DataFrame(points, columns=['cidade-estado', 'latitude', 'longitude'])
    points = json.loads(points.to_json(orient='records'))
    return points


def forecast_read_and_parse(file):
    key = 'data/forecast/'+file
    data = s3.get_object(Bucket="data-somar-flask", Key=key)
    df = pd.read_csv(data['Body'], encoding='utf-8', sep=';', header=0)
    df = df.drop(df.columns[len(df.columns) - 1], axis=1)
    temp = json.loads(df.to_json(orient='records'))
    return temp


