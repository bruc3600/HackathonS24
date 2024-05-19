from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

uri = "mongodb+srv://bruceandrew11:HackathonDBTest@cluster0.m6ptqli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db = client['JobDB']

    # collections
    jobs_collection = db['Jobs']
    companies_collection = db['Companies']
    locations_collection = db['Locations']
    job_types_collection = db['JobTypes']
    boards_collection = db['Boards']
    
    
    #collection.insert_one(sample_document)
    #print("Sample document inserted, collection created.")
except Exception as e:
    print(e)




def insert_company():
    name = input("Enter company name: ")
    industry = input("Enter company industry: ")
    website = input("Enter company website: ")
    contact_email = input("Enter company contact email: ")
    
    company_document = {
        "name": name,
        "industry": industry,
        "website": website,
        "contact_email": contact_email
    }
    return companies_collection.insert_one(company_document).inserted_id

def insert_location():
    city = input("Enter job location city: ")
    state = input("Enter job location state: ")
    country = input("Enter job location country: ")
    zip_code = input("Enter job location zip code: ")
    
    location_document = {
        "city": city,
        "state": state,
        "country": country,
        "zip_code": zip_code
    }
    return locations_collection.insert_one(location_document).inserted_id

def insert_job_type():
    job_type = input("Enter job type (e.g., Full-time, Part-time): ")
    
    job_type_document = {
        "type": job_type
    }
    return job_types_collection.insert_one(job_type_document).inserted_id

def insert_board():
    name = input("Enter board name: ")
    website = input("Enter board website: ")
    
    board_document = {
        "name": name,
        "website": website
    }
    return boards_collection.insert_one(board_document).inserted_id

def insert_job(company_id, location_id, job_type_id, board_id):
    title = input("Enter job title: ")
    description = input("Enter job description: ")
    wage = (input("Enter wage (salary): "))
    start_date = datetime.strptime(input("Enter start date (YYYY-MM-DD): "), "%Y-%m-%d")
    end_date_input = input("Enter end date (YYYY-MM-DD) (leave blank if not applicable): ")
    end_date = datetime.strptime(end_date_input, "%Y-%m-%d") if end_date_input else None
    posting_date = datetime.strptime(input("Enter posting date (YYYY-MM-DD): "), "%Y-%m-%d")
    closing_date = datetime.strptime(input("Enter closing date (YYYY-MM-DD): "), "%Y-%m-%d")
    
    job_document = {
        "title": title,
        "description": description,
        "company_id": company_id,
        "location_id": location_id,
        "wage": wage,
        "start_date": start_date,
        "end_date": end_date,
        "posting_date": posting_date,
        "closing_date": closing_date,
        "job_type_id": job_type_id,
        "board_id": board_id
    }
    return jobs_collection.insert_one(job_document).inserted_id



if __name__ == "__main__":
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        # Insert a company
        company_id = insert_company()
        print(f"Inserted Company with ID: {company_id}")

        # Insert a location
        location_id = insert_location()
        print(f"Inserted Location with ID: {location_id}")

        # Insert a job type
        job_type_id = insert_job_type()
        print(f"Inserted Job Type with ID: {job_type_id}")

        # Insert a board
        board_id = insert_board()
        print(f"Inserted Board with ID: {board_id}")

        # Insert a job
        job_id = insert_job(company_id, location_id, job_type_id, board_id)
        print(f"Inserted Job with ID: {job_id}")

    except Exception as e:
        print(f"An error occurred: {e}")