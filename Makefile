build clean:
	virtualenv venv
	source ./venv/bin/activate
	pip install -r requirements.txt
run:
	gunicorn --bind 0.0.0.0:5000 server:app
clean:
	-deactivate
	-rm -rf ./venv
