from repository.forecast_repo import forecast_list_points, \
    forecast_read_and_parse


def forecast_singlepoint_search(file, cidade):
    parsed_file = dict(data=forecast_read_and_parse(file.upper()))
    points_listed = forecast_list_points()
    points_index = [i for i in range(len(points_listed))]
    points_listed = dict(zip(points_index, points_listed))
    for i in range(len(points_listed)):
        if cidade in points_listed[i]['cidade-estado']:
            result = {**points_listed[i], **parsed_file}
            return result


def forecast_lat_lon_search(lat, lon, file):
    parsed_file = dict(data=forecast_read_and_parse(file.upper()))
    points_listed = forecast_list_points()
    points_index = [i for i in range(len(points_listed))]
    points_listed = dict(zip(points_index, points_listed))
    for i in range(len(points_listed)):
        if lat in points_listed[i]['latitude'] and lon in points_listed[i]['longitude']:
            result = {**points_listed[i], **parsed_file}
            return result


def forecast_period_search(file, datainicial, datafinal):
    periods_list = []
    parsed_file = forecast_read_and_parse(file.upper())
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
        result['rel_humidity'] = [parsed_file['rel_humidity'][str(i)] for i in
                                  range(indexinicial, indexfinal + 1)]
        result['wind_speed'] = [parsed_file['wind_speed'][str(i)] for i in
                                range(indexinicial, indexfinal + 1)]
        result['wind_direction'] = [parsed_file['wind_direction'][str(i)] for i in
                                    range(indexinicial, indexfinal + 1)]
        result['pressure'] = [parsed_file['pressure'][str(i)] for i in
                              range(indexinicial, indexfinal + 1)]
        result['weather_conditions'] = [parsed_file['weather_conditions'][str(i)] for i in
                                        range(indexinicial, indexfinal + 1)]
        result['atmospheric_conditions'] = [parsed_file['atmospheric_conditions'][str(i)] for i in
                                            range(indexinicial, indexfinal + 1)]
        result['thunderstorm_alerts'] = [parsed_file['thunderstorm_alerts'][str(i)] for i in
                                         range(indexinicial, indexfinal + 1)]
        result['thermal_sensation'] = [parsed_file['thermal_sensation'][str(i)] for i in
                                       range(indexinicial, indexfinal + 1)]
        result['max_sensation'] = [parsed_file['max_sensation'][str(i)] for i in
                                   range(indexinicial, indexfinal + 1)]
        result['min_sensation'] = [parsed_file['min_sensation'][str(i)] for i in
                                   range(indexinicial, indexfinal + 1)]
        result['frost_alert'] = [parsed_file['frost_alert'][str(i)] for i in
                                 range(indexinicial, indexfinal + 1)]
        result['etp'] = [parsed_file['etp'][str(i)] for i in
                         range(indexinicial, indexfinal + 1)]

        return result
