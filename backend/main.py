import game_api
import homepage
import server
import socketio

from flask import Flask


app = Flask(
    __name__,
)

app.debug = True

app.register_blueprint(homepage.home_endpoint)
app.register_blueprint(game_api.game_endpoint)
app.wsgi_app = socketio.WSGIApp(server.server, app.wsgi_app)

def main():
    app.run(host="localhost", port=8000)


if __name__ == "__main__":
    main()
