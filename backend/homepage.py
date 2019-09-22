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

@home_endpoint.route("/create", methods=["GET"])
def homepage():
    """Show user the create room page.
    """
    return """
    <html>
        <body>
            <form method="post">
                <input type="text" name="room_id" placeholder="Room id" required /> <br />
                <input type="text" name="username" placeholder="username" required /> <br />
                <button type="submit">
                    Submit
                </button>
            </form>
        </body>
    </html>
    """, 200
