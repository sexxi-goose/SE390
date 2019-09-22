from flask import Blueprint, current_app, jsonify, request, url_for

home_endpoint = Blueprint("home_endpoint", __name__, url_prefix="")

@home_endpoint.route("/create", methods=["POST"])
def create_room():
    """Endpoint to receive create room requests.
    """
    room_id = request.form["room_id"]
    username = request.form["username"]
    print(room_id, username)
    return "", 200


