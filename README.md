# Website code for thomas-anderson.net

This repository contains the code for thomas-anderson.net. 

Run the following to test the application (without building):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install Flask gunicorn google-api-python-client
gunicorn -e appenv='Local Testing' --bind :8080 --workers 1 --threads 8 core:site
```

Upload "assets" folder to GCS (assumng '$GOOGLE_CLOUD_PROJECT-assets' was used as GCS bucket name):

```bash
gsutil -m cp -r assets/* gs://$GOOGLE_CLOUD_PROJECT-assets/
```

To build locally:

```bash
docker build -t gcr.io/$GOOGLE_CLOUD_PROJECT/ta-net .
```
To run docker image locally:

```
PORT=8080 && docker run -p 8080:${PORT} -e PORT=${PORT} -e appenv='Local Test' gcr.io/${GOOGLE_CLOUD_PROJECT}/ta-net
```
