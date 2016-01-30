
# Import flask and template operators
import os

from flask import Flask, render_template, url_for


def create_app(debug=True):
    from app.view import all_views

    app = Flask(__name__, static_folder='static')
    app.debug = debug
    app.secret_key = 'development'
    app.config.from_object('config')
    app.config['STATIC_FOLDER'] = 'static'
    app.register_blueprint(all_views)
    return app
