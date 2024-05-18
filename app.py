from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)

# MongoDB connection URI
uri = "mongodb+srv://bruceandrew11:HackathonDBTest@cluster0.m6ptqli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['JobConnector']
collection = db['testCollection']

@app.route('/jobs', methods=['GET'])
def get_jobs():
    # Retrieve jobs based on filters
    location = request.args.get('location')
    job_type = request.args.get('job_type')
    min_salary = request.args.get('min_salary', 0)
    max_salary = request.args.get('max_salary', 200000)
    
    query = {}
    if location:
        query['location'] = location
    if job_type:
        query['job_type'] = job_type
    query['salary'] = {'$gte': int(min_salary), '$lte': int(max_salary)}
    
    jobs = list(collection.find(query))
    for job in jobs:
        job['_id'] = str(job['_id'])  # Convert ObjectId to string for JSON serialization
    
    return jsonify(jobs)

@app.route('/insert_sample', methods=['POST'])
def insert_sample():
    sample_document = {"name": "John Doe", "email": "johndoe@example.com"}
    collection.insert_one(sample_document)
    return jsonify({"message": "Sample document inserted, collection created."})

if __name__ == '__main__':
    app.run(debug=True)