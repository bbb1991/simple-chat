from flask import *

app = Flask(__name__)
messages = []


@app.route("/")
def root():
    return render_template("home.html", messages=messages)


@app.route("/_receiveMessage", methods=["POST"])
def receive_message():
    message = request.form['chatText']
    name = request.form['username']
    if message.strip() != '':
        messages.append((name, message, ''))
    return '', 204


@app.route("/_sendMessages")
def send_messages_list():
    rendered = get_html()
    return rendered


def get_html():
    text = '''{% for name, msg, link in messages %}
                {{ name }}: {{ msg }}<br>
              {% endfor %}'''
    return render_template_string(text, messages=messages)


def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1] in allowed_extensions


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
