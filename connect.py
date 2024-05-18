from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://bruceandrew11:HackathonDBTest@cluster0.m6ptqli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    db = client['JobConnector']
    collection = db['testCollection']

    sample_document = {"name": "John Doe", "email": "johndoe@example.com"}
    collection.insert_one(sample_document)
    print("Sample document inserted, collection created.")
except Exception as e:
    print(e)



