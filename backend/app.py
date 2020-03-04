from flask import Flask, request
from graphqlConsumer import *
from flask_graphql import GraphQLView



app = Flask(__name__)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

@app.route('/')
def input_handler():
    if request.args.get("query"):
        return schema.execute(request.args.get("query"))
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




