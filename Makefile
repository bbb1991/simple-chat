build clean:
	virtualenv venv
	source ./venv/bin/activate
	pip install -r requirements.txt
run:
	gunicorn --worker-class eventlet --bind 0.0.0.0:5000 chat:app
clean:
	-deactivate
	-rm -rf ./venv
