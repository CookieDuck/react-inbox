import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './../index.css';

const Message = ({ message: { subject, read } }) => {
    const msgStyle = read ? "read" : "unread"
    return (
        <div className={"row message " + msgStyle}>
            <div class="col-xs-11">
                <a href="#">
                    {`${subject} is read: ${read}`}
                </a>
            </div>
        </div>
    );
}
        
export default Message;