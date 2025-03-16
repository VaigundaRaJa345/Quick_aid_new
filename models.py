from extensions import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'  # Ensure lowercase for PostgreSQL
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

class UserDetails(db.Model):
    __tablename__ = 'details'  # Ensure lowercase for PostgreSQL
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    emergency_contact = db.Column(db.String(15), nullable=False)
    vehicle_number = db.Column(db.String(20), unique=True, nullable=False)
    blood_group = db.Column(db.String(50))
    allergies = db.Column(db.String(255))
    differently_abled = db.Column(db.String(255))
    alternate_contact = db.Column(db.String(15))
    aztec_code_path = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)