import json

from flask import session
from flask_socketio import emit, join_room, leave_room

from app.main.utils import get_messages_by_chat_id
from .. import socketio

users = {}


@socketio.on('connect_b', namespace='/chat')
def joined(data):
    session['name'] = "anonymous"
    session['room'] = "anonymous"

    users[session['name']] = session
    room = session.get('room')
    join_room(room)
    print(session.get('name') + " new user entered!")
    try:
        emit('status', {"uid": "system", 'msg': session.get('name') + ' has entered the room.'}, room=room)
    except:
        pass


@socketio.on('message_b', namespace='/chat')
def text(message):
    room = session.get('room')
    msg = {"uid": session.get("name"), "msg": message}
    print("Incoming text from: %s, room: %s, text: %s" % (session.get('name'), session.get('room'), msg))
    emit('message', json.loads(json.dumps(msg)), room=room)


@socketio.on('left', namespace='/chat')
def left(message):
    room = session.get('room')
    leave_room(room)
    print("User %s left room" % session.get("name"))
    emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)


@socketio.on('load', namespace='/chat')
def load_messages(message):
    chat_id = message.get('chat_id', 1)
    room = session.get('room')
    emit('load_messages', {'msg': get_messages_by_chat_id(chat_id)}, room=room)


@socketio.on("set_id", namespace='/chat')
def find_id(message):
    session['name'] = message.get('uid')
    session['room'] = message.get('uid')
    print("USER is logging in: ID: %s, ROOM: %s" % (session.get('name'), session.get('room')))
    emit('load_messages', {'msg': get_messages_by_chat_id(message.get('uid'))}, room=message.get('uid'))


@socketio.on("set_id_admin", namespace='/chat')
def find_id_admin(message):
    session['name'] = '1'
    session['room'] = message.get('uid')
    print("Admin is logging in: ID: %s, ROOM: %s" % (session.get('name'), session.get('room')))
    emit('load_messages', {'msg': get_messages_by_chat_id(message.get('uid'))}, room=message.get('uid'))
