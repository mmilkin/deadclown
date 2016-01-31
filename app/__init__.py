
# Import flask and template operators
import os

from flask import Flask, render_template, url_for

CLIENT_ACCESS = None
CLIENT_SECRET = None

def create_app(debug=True):
    from app.view import all_views
    global CLIENT_ACCESS
    global CLIENT_SECRET
    app = Flask(__name__, static_folder='static')
    app.debug = debug
    app.secret_key = 'development'
    app.config.from_object('config')
    app.config['STATIC_FOLDER'] = 'static'
    CLIENT_ACCESS = app.config['CLIENT_ACCESS']
    CLIENT_SECRET = app.config['CLIENT_SECRET']
    app.register_blueprint(all_views)
    return app
