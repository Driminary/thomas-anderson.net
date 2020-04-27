# Import OS to get environment variables
import os
import datetime

# Get Flask and associated modules
from flask import Flask, request, jsonify, abort, render_template

# Import Google API Client
from googleapiclient.discovery import build

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

# About
@site.route('/broadband')
def broadband():
    return render_template('broadband.html', rev=rev)

# 404
@site.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404
