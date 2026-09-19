import os
from sqlalchemy import create_engine, MetaData
from app.config import settings

def drop_all_tables():
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    meta = MetaData()
    meta.reflect(bind=engine)
    meta.drop_all(bind=engine)
    print("All tables dropped successfully.")

if __name__ == "__main__":
    drop_all_tables()
