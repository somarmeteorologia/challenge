from flask import Flask, request
from consumer import get_index, ObservedConsumer, ForecastConsumer

app = Flask(__name__)

@app.route('/observed', methods=['GET'])
def observed_request():

    location_required_args = [['station'], ['latitude', 'longitude']]
    period_required_args = [['init_date', 'final_date'], ['days']]
    # Check if required arguments are missing using iterator
    if not any(all(j in request.args for j in i) for i in location_required_args) or not any(all(j in request.args for j in i) for i in period_required_args):


        return " ERROR - Missing required arguments "

    index = get_index(request.args.get('station'), request.args.get('latitude'), request.args.get('longitude'))

    if index is not None:

        consumer = ObservedConsumer(index, request.args.get('init_date'), request.args.get('final_date'), request.args.get('days'))

        if consumer.status:
            return consumer.json()
        else:
            return "ERROR - Invalid arguments for period required"

    else:
        return "ERROR - Invalid arguments for station or latitude/longitude"


@app.route('/forecast', methods=['GET'])
def forecast_request():

    location_required_args = [['station'], ['latitude', 'longitude']]
    period_required_args = [['init_date', 'final_date'], ['days']]

    if not any(all(j in request.args for j in i) for i in location_required_args) or not any(all(j in request.args for j in i) for i in period_required_args):
        # Check if required arguments are missing using iterator

        return " ERROR - Missing required arguments "

    index = get_index(request.args.get('station'), request.args.get('latitude'), request.args.get('longitude'))

    if index:

        consumer = ForecastConsumer(index, request.args.get('init_date'), request.args.get('final_date'), request.args.get('days'))
        if consumer.status:
            return consumer.json()
        else:
            return "ERROR - Invalid arguments for period required"

    else:
        return "ERROR - Invalid arguments for station or latitude/longitude"




if __name__ == '__main__':
    app.run(debug=True)

