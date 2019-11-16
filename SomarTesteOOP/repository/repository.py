import os
import pandas as pd
import json


class Repository(object):
    def __init__(self):
        self.data_frame = None
        self.url = None

    def dir_list(self):
        return os.listdir(self.url)

    def list_points(self):
        points = []
        data = self.dir_list()
        for i in range(data.__len__()):
            points.append(data[i].strip(".CSV").split("_"))

        points = pd.DataFrame(
            points, columns=["cidade-estado", "latitude", "longitude"]
        )
        points = json.loads(points.to_json(orient="records"))
        return points

    def read_and_parse(self, path, file):
        self.data_frame = pd.read_csv(path + file, encoding="utf-8", sep=";", header=0)
        self.data_frame = self.data_frame.drop(
            self.data_frame.columns[len(self.data_frame.columns) - 1], axis=1
        )
        result = json.loads(self.data_frame.to_json())
        return result
