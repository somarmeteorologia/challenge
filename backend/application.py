from flask import Flask, request
from graphqlConsumer import *
from flask_graphql import GraphQLView

app = Flask(__name__)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))


@app.route('/')
def input_handler():
    query = request.args.get("query")
    if query:
        result = schema.execute(query)
        if result.errors is None:
            return result.data
        else:
            return result.errors

    else:
        return """ Query Example \n{stations(first:2, latitude:-20, longitude:-10) {
                    name
                    location
                    forecast(initdate:"2019-09-11" finaldate:"2019-09-12" ){
                        periods
                        maxTemperature
                        precipitation
                        }
                    }

                }"""


if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run()
