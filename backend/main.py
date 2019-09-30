import game_api
import homepage
import server
import socketio

from game_sessions import games
from flask import Flask
from flask_cors import CORS


app = Flask(
    __name__,
)

app.debug = True

app.register_blueprint(homepage.home_endpoint)
app.register_blueprint(game_api.game_endpoint)
app.wsgi_app = socketio.WSGIApp(server.server, app.wsgi_app)

CORS(app)

def main():
    games.set_websocket_server(server.server)

    app.run()


if __name__ == "__main__":
    main()
