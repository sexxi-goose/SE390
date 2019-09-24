import logging
import uuid

from game_sessions import games
from flask import Blueprint, current_app, jsonify, request, url_for

home_endpoint = Blueprint("home_endpoint", __name__, url_prefix="")

logger = logging.Logger("homepage_endpoint")

@home_endpoint.route("/create", methods=["POST"])
def create_room():
    """Endpoint to receive create room requests.
    """
    global logger

    room_id = request.json["room_id"]
    username = request.json["username"]
    logger.info(room_id, username, request.json)

    try:
        games.create_new_session(room_id)
        user_id = games.create_user(room_id, username)

        return jsonify({"user_id": user_id}), 200

    except Exception as e:
        logger.error(f"Can't create room errmsg={e}")
        return jsonify({"error": str(e)}), 400


@home_endpoint.route("/join", methods=["POST"])
def join_room():
    """Endpoint to join a room.
    """
    global logger

    room_id = request.json["room_id"]
    username = request.json["username"]
    logger.info(room_id, username, request.json)

    try:
        if not games.room_exists(room_id):
            logger.info(f"Attempt to join non-existent room {room_id}")
            return jsonify({"error": f"Room {room_id} doesn't exist"}), 400
        user_id = games.create_user(room_id, username)

        return jsonify({"user_id": user_id}), 200

    except Exception as e:
        logger.error(f"Can't join room errmsg={e}")
        return jsonify({"error": str(e)}), 400

