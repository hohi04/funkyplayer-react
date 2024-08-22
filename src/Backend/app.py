from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tracks.db'
db = SQLAlchemy(app)

class Track(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    cover = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    audio = db.Column(db.String, nullable=False)
    color = db.Column(db.PickleType, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=False)

db.create_all()

@app.route('/tracks', methods=['GET'])
def get_tracks():
    tracks = Track.query.all()
    return jsonify([{
        'id': track.id,
        'name': track.name,
        'cover': track.cover,
        'artist': track.artist,
        'audio': track.audio,
        'color': track.color,
        'active': track.active
    } for track in tracks])

@app.route('/tracks', methods=['POST'])
def add_track():
    data = request.json
    new_track = Track(
        id=str(uuid4()),
        name=data['name'],
        cover=data['cover'],
        artist=data['artist'],
        audio=data['audio'],
        color=data['color'],
        active=data['active']
    )
    db.session.add(new_track)
    db.session.commit()
    return jsonify({'message': 'Track added'}), 201

if __name__ == '__main__':
    app.run(debug=True)
