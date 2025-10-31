from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.config import settings
from app.models import UserAnalysis, UserProgress, User


class Database:
    client: AsyncIOMotorClient = None


db = Database()


async def connect_to_mongo():
    """Connect to MongoDB"""
    db.client = AsyncIOMotorClient(settings.mongodb_uri)
    await init_beanie(
        database=db.client[settings.database_name],
        document_models=[UserAnalysis, UserProgress, User]
    )
    print(f"Connected to MongoDB: {settings.database_name}")


async def close_mongo_connection():
    """Close MongoDB connection"""
    if db.client:
        db.client.close()
        print("Closed MongoDB connection")


async def get_database():
    """Get database instance"""
    return db.client[settings.database_name]
