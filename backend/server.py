import asyncio
import json
import logging
import socketio

from game_sessions import games
from game_events import GAME_EVENT

REQUEST_USERID_ROOMID = "SendUseridRoomid"
RESPONSE_USERID_ROOMID = "UseridRoomid"
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

    logger.info(f"Handshake from {sid}")
    logger.debug(sid, data)

    room_id = data["room_id"]
    user_id = data["user_id"]

    logger.info(sid, user_id, room_id)

    try:
        games.user_connected(room_id, user_id, sid)
    except Exception as e:
        logger.error(f"Failed to connect user to game {room_id} errmsg={e}")


@server.on(REQUEST_GAME_START)
def handle_game_start(sid, data):
    global server
    global logger

    logger.info(f"Game started from {sid}")
    logger.debug(sid, data)

    try:
        games.start_game(sid)
    except Exception as e:
        logger.error(f"Failed to start game errmsg={e}")


@server.on(GAME_EVENT)
def handle_game_events(sid, data):
    global server
    global logger

    try:
        games.handle_event(sid, data["eventType"], data)
    except Exception as e:
        logger.error(f"Failed to handle game event={e}")


