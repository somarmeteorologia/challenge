def forescast_period_json_maker(parsed_file, indexinicial, indexfinal):
    result = {}
    keys = parsed_file.keys()
    for i in keys:
        result[i] = None
    result["periods"] = [
        parsed_file["periods"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["precipitation"] = [
        parsed_file["precipitation"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["temperature"] = [
        parsed_file["temperature"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["max_temperature"] = [
        parsed_file["max_temperature"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["min_temperature"] = [
        parsed_file["min_temperature"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["rel_humidity"] = [
        parsed_file["rel_humidity"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["wind_speed"] = [
        parsed_file["wind_speed"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["wind_direction"] = [
        parsed_file["wind_direction"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["pressure"] = [
        parsed_file["pressure"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["weather_conditions"] = [
        parsed_file["weather_conditions"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["atmospheric_conditions"] = [
        parsed_file["atmospheric_conditions"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["thunderstorm_alerts"] = [
        parsed_file["thunderstorm_alerts"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["thermal_sensation"] = [
        parsed_file["thermal_sensation"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["max_sensation"] = [
        parsed_file["max_sensation"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["min_sensation"] = [
        parsed_file["min_sensation"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["frost_alert"] = [
        parsed_file["frost_alert"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["etp"] = [
        parsed_file["etp"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]

    return result
