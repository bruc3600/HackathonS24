from flask import Flask, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

app = Flask(__name__)

uri = "mongodb+srv://bruceandrew11:HackathonDBTest@cluster0.m6ptqli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['JobDB']

jobs_collection = db['Jobs']
companies_collection = db['Companies']
locations_collection = db['Locations']
job_types_collection = db['JobTypes']
boards_collection = db['Boards']



@app.route('/jobs', methods=['GET'])
def get_jobs():
    location = request.args.get('Location', '')
    job_type = request.args.get('JobTypes', '')
    min_salary = request.args.get('min_salary', 0)
    max_salary = request.args.get('max_salary', 200000)

    query = {}
    if location:
        query['_id'] = location
    if job_type:
        query['_id'] = job_type
    query['wage'] = {"$gte": int(min_salary), "$lte": int(max_salary)}

    jobs = list(jobs_collection.find(query))
    for job in jobs:
        job['_id'] = str(job['_id'])
        job['title'] = str(job['title'])
        job['description'] = str(job['description'])
        job['company_id'] = str(job['company_id'])
        job['location_id'] = str(job['location_id'])
        job['job_type_id'] = str(job['job_type_id'])
        job['board_id'] = str(job['board_id'])
    return jsonify(jobs)

@app.route('/insert_company', methods=['POST'])
def insert_company():
    data = request.json
    company_document = {
        "name": data['name'],
        "industry": data['industry'],
        "website": data['website'],
        "contact_email": data['contact_email']
    }
    result = companies_collection.insert_one(company_document)
    return jsonify({"inserted_id": str(result.inserted_id)})

@app.route('/insert_location', methods=['POST'])
def insert_location():
    data = request.json
    location_document = {
        "city": data['city'],
        "state": data['state'],
        "country": data['country'],
        "zip_code": data['zip_code']
    }
    result = locations_collection.insert_one(location_document)
    return jsonify({"inserted_id": str(result.inserted_id)})


@app.route('/insert_job_type', methods=['POST'])
def insert_job_type():
    data = request.json
    job_type_document = {
        "type": data['type']
    }
    result = job_types_collection.insert_one(job_type_document)
    return jsonify({"inserted_id": str(result.inserted_id)})

@app.route('/insert_board', methods=['POST'])
def insert_board():
    data = request.json
    board_document = {
        "name": data['name'],
        "website": data['website']
    }
    result = boards_collection.insert_one(board_document)
    return jsonify({"inserted_id": str(result.inserted_id)})

@app.route('/insert_job', methods=['POST'])
def insert_job():
    data = request.json
    job_document = {
        "title": data['title'],
        "description": data['description'],
        "company_id": data['company_id'],
        "location_id": data['location_id'],
        "wage": data['wage'],
        "start_date": datetime.strptime(data['start_date'], "%Y-%m-%d"),
        "end_date": datetime.strptime(data['end_date'], "%Y-%m-%d") if data['end_date'] else None,
        "posting_date": datetime.strptime(data['posting_date'], "%Y-%m-%d"),
        "closing_date": datetime.strptime(data['closing_date'], "%Y-%m-%d"),
        "job_type_id": data['job_type_id'],
        "board_id": data['board_id']
    }
    result = jobs_collection.insert_one(job_document)
    return jsonify({"inserted_id": str(result.inserted_id)})

@app.route('/locations', methods=['GET'])
def get_locations():
    locations = list(locations_collection.find({}))
    for location in locations:
        location['_id'] = str(location['_id'])
    return jsonify(locations)

@app.route('/job_types', methods=['GET'])
def get_job_types():
    job_types = list(job_types_collection.find({}))
    for job_type in job_types:
        job_type['_id'] = str(job_type['_id'])
    return jsonify(job_types)

@app.route('/companies', methods=['GET'])
def get_companies():
    companies = list(companies_collection.find({}))
    for company in companies:
        company['_id'] = str(company['_id'])
    return jsonify(companies)

if __name__ == '__main__':
    app.run(debug=True)

get_jobs()
print(location)