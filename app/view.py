from flask import Blueprint, render_template
import json
import os
from imgurpython import client as imgur_client
import datetime
import app

all_views = Blueprint('root', __name__, url_prefix='/', static_folder='static')

IMAGES = []
PAGE = 0
PENDING = None


@all_views.route('/', methods=['GET'])
def home():
    return render_template(
        'deadclown.html'
    )


@all_views.route('next/<string:current_id>', methods=['GET'])
def get_next(current_id=None):
    global PAGE
    global IMAGES
    global PENDING
    # probably should lock

    if not IMAGES and not PENDING:
        PENDING = datetime.datetime.now()
        client = imgur_client.ImgurClient(
            app.CLIENT_ACCESS, app.CLIENT_SECRET
        )
        images = client.gallery_search('sad funny', page=PAGE)
        PAGE += 1
        if not images:
            PAGE = 0
        IMAGES.extend(images)
        PENDING = None

    if IMAGES:
        img = IMAGES.pop()
        return json.dumps({'link': img.link, 'id': img.id})
    else:
        return json.dumps({'link': None, 'id': None})
