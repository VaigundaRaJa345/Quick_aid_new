import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', os.urandom(24).hex())  # Use environment variable or generate a random key
    SQLALCHEMY_DATABASE_URI = 'postgresql://quick_care_user:0SM3EPvLjGsVr8LCFNPcotpNahYME0pH@dpg-cv5bp5q3esus73aridg0-a.oregon-postgres.render.com/quick_care'
    SQLALCHEMY_TRACK_MODIFICATIONS = False