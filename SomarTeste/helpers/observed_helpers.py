from repository.observed_repo import list_points, read_and_parse


def observed_singlepoint_search(file, cidade):
    parsed_file = dict(data=read_and_parse(file.upper()))
    points_listed = list_points()
    points_index = [i for i in range(len(points_listed))]
    points_listed = dict(zip(points_index, points_listed))
    for i in range(len(points_listed)):
        if cidade in points_listed[i]['cidade-estado']:
            result = {**points_listed[i], **parsed_file}
            return result


def observed_lat_lon_search(lat, lon, file):
    parsed_file = dict(data=read_and_parse(file.upper()))
    points_listed = list_points()
    points_index = [i for i in range(len(points_listed))]
    points_listed = dict(zip(points_index, points_listed))
    for i in range(len(points_listed)):
        if lat in points_listed[i]['latitude'] and lon in points_listed[i]['longitude']:
            result = {**points_listed[i], **parsed_file}
            return result


def observed_period_search(file, datainicial, datafinal):
    periods_list = []
    parsed_file = read_and_parse(file.upper())
    all_periods = parsed_file['periods']
    for i in range(len(all_periods)):
        i = str(i)
        periods_list.append(all_periods[i].split()[0])

    if datainicial in periods_list and datafinal in periods_list:
        indexinicial = periods_list.index(datainicial)
        indexfinal = periods_list.index(datafinal)

        result = {}
        keys = parsed_file.keys()
        for i in keys:
            result[i] = None

        result['periods'] = [parsed_file['periods'][str(i)] for i in
                             range(indexinicial, indexfinal + 1)]
        result['precipitation'] = [parsed_file['precipitation'][str(i)] for i in
                                   range(indexinicial, indexfinal + 1)]
        result['temperature'] = [parsed_file['temperature'][str(i)] for i in
                                 range(indexinicial, indexfinal + 1)]
        result['max_temperature'] = [parsed_file['max_temperature'][str(i)] for i in
                                     range(indexinicial, indexfinal + 1)]
        result['min_temperature'] = [parsed_file['min_temperature'][str(i)] for i in
                                     range(indexinicial, indexfinal + 1)]
        result['max_rel_humidity'] = [parsed_file['max_rel_humidity'][str(i)] for i in
                                      range(indexinicial, indexfinal + 1)]
        result['min_rel_humidity'] = [parsed_file['min_rel_humidity'][str(i)] for i in
                                      range(indexinicial, indexfinal + 1)]
        result['max_pressure'] = [parsed_file['max_pressure'][str(i)] for i in
                                  range(indexinicial, indexfinal + 1)]
        result['min_pressure'] = [parsed_file['min_pressure'][str(i)] for i in
                                  range(indexinicial, indexfinal + 1)]
        result['wind_gust'] = [parsed_file['wind_gust'][str(i)] for i in
                               range(indexinicial, indexfinal + 1)]
        result['frost_alert'] = [parsed_file['frost_alert'][str(i)] for i in
                                 range(indexinicial, indexfinal + 1)]
        result['etp'] = [parsed_file['etp'][str(i)] for i in range(indexinicial, indexfinal + 1)]
        result['radiation'] = [parsed_file['radiation'][str(i)] for i in
                               range(indexinicial, indexfinal + 1)]
        result['wetting'] = [parsed_file['wetting'][str(i)] for i in
                             range(indexinicial, indexfinal + 1)]
        return result
