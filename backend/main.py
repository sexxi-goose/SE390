import homepage

from flask import Flask


app = Flask(
    __name__,
)

app.register_blueprint(homepage.home_endpoint)

def main():
    app.run(host="localhost", port=8000)


if __name__ == "__main__":
    main()
