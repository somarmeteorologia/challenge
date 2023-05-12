from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongo", 27017)
db = client["mydatabase"]
collection = db["mycollection"]

@app.route('/')
def hello():
    return jsonify({
        'message': 'Hello, Flask and MongoDB!'
    })