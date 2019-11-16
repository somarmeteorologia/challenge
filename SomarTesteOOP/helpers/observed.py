def observed_period_json_maker(parsed_file, indexinicial, indexfinal):
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
    result["max_rel_humidity"] = [
        parsed_file["max_rel_humidity"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["min_rel_humidity"] = [
        parsed_file["min_rel_humidity"][str(i)]
        for i in range(indexinicial, indexfinal + 1)
    ]
    result["max_pressure"] = [
        parsed_file["max_pressure"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["min_pressure"] = [
        parsed_file["min_pressure"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["wind_gust"] = [
        parsed_file["wind_gust"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["frost_alert"] = [
        parsed_file["frost_alert"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["etp"] = [
        parsed_file["etp"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["radiation"] = [
        parsed_file["radiation"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    result["wetting"] = [
        parsed_file["wetting"][str(i)] for i in range(indexinicial, indexfinal + 1)
    ]
    return result
