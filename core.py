# Import OS to get environment variables
import os
import datetime

# Get Flask and associated modules
from flask import Flask, request, jsonify, abort, render_template

# Import Google API Client
from googleapiclient.discovery import build

# Import Google Auth
from google.oauth2 import id_token
from google.auth.transport import requests

# Define the Flask app name from the filename
site = Flask(__name__)

# Get environment, and default to Local
env = os.environ.get('appenv', 'Local')
rev = os.environ.get('K_REVISION', 'Local')

################
# Begin Routes #
################

# Root
@site.route('/')
def home():
    return render_template('home.html', rev=rev)

# About
@site.route('/about')
def about():
    return render_template('about.html', rev=rev)

# Broadband
@site.route('/broadband')
def broadband():
    if not request.cookies.get('session'):
        # Not logged in
        abort(401, "Please log in.")
    return render_template('broadband.html', rev=rev)

# Privacy Policy
@site.route('/privacy')
def privacy():
    return render_template('privacy.html', rev=rev)

# Terms of Service
@site.route('/terms')
def terms():
    return render_template('terms.html', rev=rev)

# Authorisation
@site.route('/auth', methods=['POST'])
def auth():

    if request.cookies.get('session'):
        # Session exists
        return

    # Protect from CSRF
    if not request.headers.get('X-Requested-With'):
        abort(403)

    token = request.json['token']

    try:

        # Verifies aud, exp + JWT signature:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), '654558835136-q9cqi3n4phvojlf93oqo2q08gtlt38hd.apps.googleusercontent.com')

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError

        # ID token is valid. Set the session cookie to match the token expiry.
        response = jsonify({'status': 'success'})
        response.set_cookie('session', token, expires=idinfo['exp'], httponly=True, secure=True)

        return response

    except ValueError:
        # Invalid token
        abort(401, 'Invalid token')


@site.route('/logout')
def logout():

    if not request.cookies.get('session'):
        return jsonify({'status': 'not required'}) # Return if no cookie present

    response = jsonify({'status': 'success'})
    response.set_cookie('session', '', expires=0)
    return response


# 404
@site.errorhandler(404)
def page_not_found(e):
    # Set the 404 status explicitly
    return render_template('404.html'), 404
