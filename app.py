import flask, shortuuid

app = flask.Flask(__name__)
#app.debug = True

@app.route('/')
def index():
    roomid = shortuuid.uuid()[:7]
    return flask.redirect('/{0}'.format(roomid))

@app.route('/<roomid>')
def chat(roomid):
    return flask.send_from_directory('templates', 'index.html')
