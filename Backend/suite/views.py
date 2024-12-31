import base64
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from pymongo import MongoClient
from django.conf import settings
import os
import json
from bson.objectid import ObjectId  # Import ObjectId

# MongoDB Atlas configuration
MONGO_URI = "mongodb+srv://krish:krish123@productsuite.hpjhf.mongodb.net/"  # Replace with your MongoDB Atlas connection string
DB_NAME = "Product_Suite"  # Replace with your database name
COLLECTION_NAME = "Products"  # Replace with your collection name

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# API to handle data submission
@csrf_exempt
def submit_data(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        tagline = request.POST.get('tagline')
        description = request.POST.get('description')
        key_features = request.POST.get('key_features')
        tags = request.POST.get('tags')
        image = request.FILES.get('image')

        if not (title and tagline and description and key_features and tags and image):
            return JsonResponse({"error": "All fields are required!"}, status=400)

        # Read the image file as binary data
        image_binary = image.read()

        # Prepare the data to save in MongoDB
        data = {
            "title": title,
            "tagline": tagline,
            "description": description,
            "key_features": key_features,
            "tags": tags,
            "image": {
                "data": image_binary,
                "filename": image.name,
                "content_type": image.content_type
            }
        }

        # Insert data into MongoDB
        result = collection.insert_one(data)

        return JsonResponse({"message": "Data saved successfully!", "id": str(result.inserted_id)})

    return JsonResponse({"error": "Invalid request method!"}, status=405)

# API to fetch all data@csrf_exempt
def fetch_data(request):
    if request.method == 'GET':
        try:
            # Get pagination parameters
            page = int(request.GET.get('page', 1))
            limit = int(request.GET.get('limit', 10))
            skip = (page - 1) * limit

            # Get total count
            total_count = collection.count_documents({})

            # Retrieve documents with pagination
            cursor = collection.find({}).skip(skip).limit(limit)
            data = []

            for document in cursor:
                document['_id'] = str(document['_id'])

                # Handle tags field
                if 'tags' in document:
                    document['tags'] = json.loads(document['tags'])

                # Handle image field
                if 'image' in document:
                    image_binary = document['image']['data']
                    image_content_type = document['image']['content_type']
                    base64_image = base64.b64encode(image_binary).decode('utf-8')
                    document['image_data_url'] = f"data:{image_content_type};base64,{base64_image}"
                    document['filename'] = document['image']['filename']
                    document['content_type'] = document['image']['content_type']
                    del document['image']

                data.append(document)

            return JsonResponse({
                "status": "success",
                "data": data,
                "pagination": {
                    "current_page": page,
                    "total_pages": -(-total_count // limit),  # Ceiling division
                    "total_records": total_count,
                    "records_per_page": limit
                }
            }, safe=False)

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=500)

# API to fetch a single product by ID
def fetch_product_by_id(request, product_id):
    if request.method == 'GET':
        try:
            # Convert product_id to ObjectId
            product = collection.find_one({"_id": ObjectId(product_id)})  # Use ObjectId for MongoDB query
            if product is None:
                raise Http404("Product not found")

            product['_id'] = str(product['_id'])

            # Handle image field
            if 'image' in product:
                image_binary = product['image']['data']
                image_content_type = product['image']['content_type']
                base64_image = base64.b64encode(image_binary).decode('utf-8')
                product['image_data_url'] = f"data:{image_content_type};base64,{base64_image}"
                product['filename'] = product['image']['filename']
                product['content_type'] = product['image']['content_type']
                del product['image']

            return JsonResponse({"status": "success", "data": product})

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

