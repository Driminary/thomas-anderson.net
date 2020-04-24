# Website code for thomas-anderson.net

This repository contains the code for thomas-anderson.net. 

Run the following to test the application (without building):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install Flask gunicorn google-api-python-client
gunicorn -e appenv='Local Testing' --bind :8080 --workers 1 --threads 8 core:site
```

Upload "assets" folder to GCS:

```bash
gsutil -m cp -r assets/* gs://anderson-an9302-assets/
```
