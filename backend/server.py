import asyncio
import json
import logging
import socketio

from game_sessions import games

REQUEST_USERID_ROOMID = "SendUseridRoomid"
RESPONSE_USERID_ROOMID = "UseridRoomid"
NEW_USER_JOINED_ROOM = "NewUserJoinedRoom"
REQUEST_GAME_START = "StartGame"

server = socketio.Server()
logger = logging.Logger("ServerLogger")

@server.event
def connect(sid, environ):
    global server
    global logger

    logger.info(f"Received connection from {sid}")
    server.emit(REQUEST_USERID_ROOMID, room=sid)

@server.event
def disconnect(sid):
    global logger

    logger.info(f"Received disconnect frmo {sid}")
    games.user_disconnected(sid)

@server.on(RESPONSE_USERID_ROOMID)
def handle_handshake(sid, data):
    global server
    global logger
    global connections

    logger.info(f"Handshake from {sid}")
    logger.debug(sid, data)

    room_id = data["room_id"]
    user_id = data["user_id"]

    logger.info(sid, user_id, room_id)

    try:
        games.user_connected(room_id, user_id, sid)
    except Exception as e:
        logger.error(f"Failed to connect user to game {room_id} errmsg={e}")


@server.on(RESPONSE_USERID_ROOMID)
def handle_handshake(sid, data):
    global server
    global logger
    global connections

    logger.info(f"Game started from {sid}")
    logger.debug(sid, data)

    try:
        games.start_game(sid)
    except Exception as e:
        logger.error(f"Failed to start game errmsg={e}")

