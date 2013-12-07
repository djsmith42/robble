import flask

app = flask.Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return flask.render_template('index.html')
