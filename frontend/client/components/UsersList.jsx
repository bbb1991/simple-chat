import React from 'react'

var AddMessageForm = React.createClass({
    createMessage: function (e) {
        e.preventDefault();

        var message = this.refs.message_form.value;

        if (typeof message === 'string' && !message.isEmpty()) {
            this.props.addMessage(message);
            this.refs.message_form.reset();
        }
    },

    render: function () {
        return (
            <form className="form-inline" ref="fruitForm" onSubmit={this.createFruit}>
                <div className="form-group">
                    <label for="fruitItem">
                        Fruit Name
                        <input type="text" id="fruitItem" placeholder="e.x.lemmon" ref="fruitName"
                               className="form-control"/>
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
        )
    }
});