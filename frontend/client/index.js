import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import UsersList from './components/UsersList.jsx';
import DialogFrame from './components/DialogFrame.jsx';


ReactDOM.render(<App/>, document.getElementById('message_field'));
ReactDOM.render(<UsersList/>, document.getElementById('users_list'));
ReactDOM.render(<DialogFrame/>, document.getElementById('dialog_frame'));

require('bootstrap');