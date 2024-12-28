#!/usr/bin/python3
"""API status
"""

from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place

from os import environ
from flask import Flask, render_template, request, jsonify
from uuid import uuid4

app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/4-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)
    
    cache_id = str(uuid4())

    return render_template('4-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places, cache_id=cache_id)

@app.route('/api/v1/places_search', methods=['POST'], strict_slashes=False)
def place_search():
    """Search or retrieve place object based on specific filters passed in the JSON body of the request.
    """
    try:
        data = request.get_json()
    except Exception:
        return jsonify({"error": "Not a JSON"}), 400
    
    if not data or not any(data.values()):
        places = storage.all(Place).value()
        return jsonify([place.to_dict() for place in places])
    
    # Retrieve filters
    states = data.get("states", [])
    cities = data.get("cities", [])
    amenities = data.get("amenities", [])
    
    # Get Place objects
    places = []
    if states:
        for state_id in states:
            state = storage.get(State, state_id)
            if state:
                for city in state.cities:
                    places.extend(city.places)  #  Instead of appending one Place
                    # object at a time with append(), extend() can add all Place objects in one step.
    
    if cities:
        for city_id in cities:
            city = storage.get(City, city_id)
            if city:
                   places.extend(city.places)
    
    # Remove duplicates
    # places = list(set(places))
    
    # Filter by amenities
    if amenities:
        places = [place for place in places if all(amenity.id in [a.id for a in place.amenities] for amenity in amenities)]
    return jsonify([place.to_dict() for place in places])



if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
