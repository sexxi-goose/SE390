import asyncio
import json
import logging
import socketio

REQUEST_USERID_ROOMID = "SendUseridRoomid"
RESPONSE_USERID_ROOMID = "UseridRoomid"
NEW_USER_JOINED_ROOM = "NewUserJoinedRoom"
TEST_ROOM = "test_room"

server = socketio.Server()
logger = logging.Logger("ServerLogger")

count = 0

def validate_valid_user(user_id, room_id):
    return True

def get_user_name(user_id):
    global count
    count += 1
    return f"DUMMY {count} ${user_id}"

@server.event
def connect(sid, environ):
    global server
    global logger

    logger.info(f"Received connection from {sid}")
    server.emit(REQUEST_USERID_ROOMID, room=sid)

@server.on(RESPONSE_USERID_ROOMID)
def handle_handshake(sid, data):
    global server
    global logger
    global connections

    logger.info(f"Handshake from {sid}")
    logger.debug(sid, data)

    room_id = data["room_id"]
    user_id = data["user_id"]

    if not validate_valid_user(user_id, room_id):
        disconnect(sid)

    server.emit(NEW_USER_JOINED_ROOM, data =
            {"username": get_user_name(user_id)}, room=TEST_ROOM)
    server.enter_room(sid, TEST_ROOM)


