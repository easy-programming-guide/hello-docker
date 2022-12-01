from typing import Union
import uvicorn as uvicorn
from fastapi import FastAPI
from bson.objectid import ObjectId
import motor.motor_asyncio
from fastapi.encoders import jsonable_encoder
import os
from dotenv import load_dotenv
load_dotenv(override=True)

MONGODB_URI = os.getenv("MONGODB_URI")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI)

database = client['ugc']

review_collection = database.get_collection("productReview")


def review_helper(review) -> dict:
    return {
        "id": str(review["_id"]),
        "title": review["title"],
        "content": review["content"],
    }


async def retrieve_reviews(limit: int):
    reviews = []
    async for student in review_collection.find().limit(limit):
        reviews.append(review_helper(student))
    return reviews


async def add_review(review_data: dict) -> dict:
    review = await review_collection.insert_one(review_data)
    new_review = await review_collection.find_one({"_id": review.inserted_id})
    return review_helper(new_review)

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.post("/review")
async def add(review: dict):
    review = jsonable_encoder(review)
    new_review = await add_review(review)
    return new_review


@app.get("/reviews")
async def list(limit: int = 10):
    reviews = await retrieve_reviews(limit)
    if reviews:
        return reviews
    return []


if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=8000, reload=True)
