import logging
import uuid
import GameState

NEW_USER_JOINED_ROOM = "NewUserJoinedRoom"

class GameSessions:
    class GameSession:
        def __init__(self, room_id):
            self._room_id = room_id
            self._state = GameState.GameState(room_id, self) # Game State
            self._users = dict() # userid to sid
            self._usernames = dict() # userid to username
            self._sids = set() # Set of session ids of all users conencted
            self._server = None
            self._expiry = None


        def start_game():
            self._state.start_game();


        def create_user(self, username):
            for key, val in self._usernames.items():
                if val == username:
                    raise RuntimeError(f"Someone named {username} already exists in room {self._room_id}")

            user_id = uuid.uuid4()
            self._usernames[str(user_id)] = username
            self._state.join(user_id, username)
            return user_id


        def user_connected(self, user_id,  sid):
            if user_id not in self._usernames:
                raise RuntimeError(f"User not registered to room {self._room_id}")

            self._users[user_id] = sid
            self._sids.add(sid)

            self.emit(NEW_USER_JOINED_ROOM, {
                "username": f"{self._usernames[user_id]} joined the room"
            })

            self._server.enter_room(sid, self._room_id)


        def user_disconnected(self, sid):
            for key, val in self._users.items():
                if val == sid:
                    self._state.remove(key, self_.users[username])
                    self._users.pop(key)

            self._sids.remove(sid)


        def set_websocket_server(self, server):
            self._server =  server


        def emit(self, event, data):
            self._server.emit(event, data, room=self._room_id)


        def emit_to_user(self, user_id, event, data):
            self._server.emit(event, data, room=self._users[user_id])


        def emit_to_users(self, user_ids, event, data):
            skip_sids = []
            for user_id, sid in self._users.items():
                if user_id not in user_ids:
                    skip_sids.append(sid)

            self._server.emit(event, data, room=self._room_id, skip_sid=skip_sids)


        def handle_event(self, sid, event, data):
            pass

        @property
        def users(self):
            return len(self._sids)


        @property
        def state(self):
            return state


    def __init__(self):
        self._game_sessions = dict()
        self._server = None
        self._sidToRooms = dict()
        self._logger = logging.Logger("GameSessions")


    def start_game(sid):
        if(sid not in self._sidToRooms.keys()):
            raise RuntimeError("No room to start game in")

        self._game_sessions[self._sidToRooms[sid]].start_game();


    def room_exists(self, room_id):
        return (room_id in self._game_sessions)


    def create_new_session(self, room_id):
        if self.room_exists(room_id):
            raise RuntimeError(f"Room {room_id} already exists")

        self._game_sessions[room_id] = GameSessions.GameSession(room_id)
        if self._server:
            self._game_sessions[room_id].set_websocket_server(self._server)


    def get_session_state(self, room_id):
        if not self.room_exists(room_id):
            raise RuntimeError(f"Room {room_id} doesn't exist")

        return self._game_sessions[room_id].state


    def create_user(self, room_id, username):
        if not self.room_exists(room_id):
            raise RuntimeError(f"Room {room_id} doesn't exist")
        return self._game_sessions[room_id].create_user(username)


    def user_connected(self, room_id, user_id, sid):
        if not self.room_exists(room_id):
            raise RuntimeError(f"Room {room_id} doesn't exist")

        self._sidToRooms[sid] = room_id
        self._game_sessions[room_id].user_connected(user_id, sid)


    def user_disconnected(self, sid):
        if sid not in self._sidToRooms:
            self._logger.error(f"Session id {sid} not recognised")
            return

        self._game_sessions[self._sidToRooms[sid]].user_disconnected(sid)
        self._sidToRooms.pop(sid)


    def set_websocket_server(self, server):
        self._server =  server

        for key, val in self._game_sessions.items():
            val.set_websocket_server(server)


    def handle_event(self, sid, event, data):
        if sid not in self._sidToRooms:
            raise RuntimeError(f"Session id {sid} not associated with any game")

        self._game_sessions[self._sidToRooms[sid]].handle_event(sid, event, data)


games = GameSessions()
