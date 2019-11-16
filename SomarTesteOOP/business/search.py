from repository.repository import Repository
from helpers.observed import observed_period_json_maker
from helpers.forecast import forescast_period_json_maker


class Search(object):
    def __init__(self):
        self.repo = Repository()

    def singlepoint_search(self, file, cidade):
        parsed_file = dict(data=self.repo.read_and_parse(self.repo.url, file.upper()))
        points_listed = self.repo.list_points()
        points_index = [i for i in range(len(points_listed))]
        points_listed = dict(zip(points_index, points_listed))
        for i in range(len(points_listed)):
            if cidade in points_listed[i]["cidade-estado"]:
                result = {**points_listed[i], **parsed_file}
                return result

    def lat_lon_search(self, lat, lon, file):
        parsed_file = dict(
            data=self.repo.read_and_parse(self.repo.url + "/", file.upper())
        )
        points_listed = self.repo.list_points()
        points_index = [i for i in range(len(points_listed))]
        points_listed = dict(zip(points_index, points_listed))
        for i in range(len(points_listed)):
            if (
                lat in points_listed[i]["latitude"]
                and lon in points_listed[i]["longitude"]
            ):
                result = {**points_listed[i], **parsed_file}
                return result

    def period_search(self, file, datainicial, datafinal):
        periods_list = []
        parsed_file = self.repo.read_and_parse(self.repo.url + "/", file.upper())
        all_periods = parsed_file["periods"]
        for i in range(len(all_periods)):
            i = str(i)
            periods_list.append(all_periods[i].split()[0])

        if datainicial in periods_list and datafinal in periods_list:
            indexinicial = periods_list.index(datainicial)
            indexfinal = periods_list.index(datafinal)
            if self.repo.url == "data/observed/":
                result = observed_period_json_maker(
                    parsed_file, indexinicial, indexfinal
                )
                return result
            if self.repo.url == "data/observed":
                result = observed_period_json_maker(
                    parsed_file, indexinicial, indexfinal
                )
                return result
            else:
                result = forescast_period_json_maker(
                    parsed_file, indexinicial, indexfinal
                )
                return result
