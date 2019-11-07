import os
import pandas as pd
import boto3
import json

s3 = boto3.client('s3')


def observed_dir_list():
    data = s3.list_objects(Bucket='data-somar-flask')
    data = [data["Contents"][i]['Key'].strip('data/observed') for i in range(len(data['Contents'])) if
            "data/observed" in data['Contents'][i]['Key']]
    return data


def list_points():
    points = []
    data = observed_dir_list()
    for i in range(data.__len__()):
        points.append(data[i].strip('.CSV').split('_'))

    points = pd.DataFrame(points, columns=['cidade-estado', 'latitude', 'longitude'])
    points = json.loads(points.to_json(orient='records'))
    return points


def read_and_parse(file):
    key = 'data/observed/'+file
    data = s3.get_object(Bucket="data-somar-flask", Key=key)
    df = pd.read_csv(data["Body"], encoding='utf-8', sep=';', header=0)
    df = df.drop(df.columns[len(df.columns) - 1], axis=1)
    temp = json.loads(df.to_json(orient='records'))
    return temp



