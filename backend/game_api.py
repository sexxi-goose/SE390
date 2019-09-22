from flask import Blueprint, current_app, jsonify, request, url_for

game_endpoint = Blueprint("game", __name__, url_prefix="/game")

@game_endpoint.route("/nominateChancellor", methods=["POST"])
def nominateChancellor():
    """Endpoint to allow the president to elect a chancellor.
    """
    room_id = request.json["room_id"]
    chancellor_id = request.json["chancellor_id"]
    print(room_id, chancellor_id, request.json)
    return "", 200


@game_endpoint.route("/voteChancellor", methods=["POST"])
def voteChancellor():
    """Endpoint to allow players to submit their votes for/against a chancellor to be elected
    """
    room_id = request.json["room_id"]
    userid = request.json["userid"]
    chancellor_id = request.json["chancellor_id"]
    print(room_id, userid, chancellor_id, request.json)
    return "", 200
