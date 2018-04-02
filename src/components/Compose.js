import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewMessage } from '../actions/ActionCreator';

const Compose = ({onComposeFinished}) => {
    const sendMessage = (e) => {
        e.preventDefault();

        var subject = e.target.subject.value;
        if (!subject) {
            subject = "(No Subject)";
        }

        var body = e.target.body.value;
        if (!body) {
            body = "(No Message Body)";
        }

        onComposeFinished({subject: subject, body: body});
    }

    return (
        <form className="form-horizontal well" onSubmit={sendMessage}>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <h4>Compose Message</h4>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                 <div className="col-sm-8">
                    <textarea name="body" id="body" className="form-control"></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-8 col-sm-offset-2">
                    <input type="submit" value="Send" className="btn btn-primary"></input>
                </div>
            </div>
        </form>
    );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onComposeFinished: (newMessage) => createNewMessage(newMessage)
}, dispatch);

export default connect(null, mapDispatchToProps)(Compose);
