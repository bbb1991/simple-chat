from flask import session
from flask_socketio import emit, join_room, leave_room

from app.main.utils import get_messages_by_chat_id
from .. import socketio


@socketio.on('joined', namespace='/chat')
def joined(message):
    room = session.get('room')
    join_room(room)
    emit('status', {'msg': session.get('name') + ' has entered the room.'}, room=room)


@socketio.on('text', namespace='/chat')
def text(message):
    room = session.get('room')
    emit('message', {'msg': session.get('name') + ':' + message['msg']}, room=room)


@socketio.on('left', namespace='/chat')
def left(message):
    room = session.get('room')
    leave_room(room)
    emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)


@socketio.on('load', namespace='/chat')
def load_messages(message):
    chat_id = message.get('chat_id', 1)
    room = session.get('room')
    emit('load_messages', {'msg': get_messages_by_chat_id(chat_id)}, room=room)
