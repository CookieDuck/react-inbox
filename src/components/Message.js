import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './../index.css';

const Message = ({ message: { subject, read, selected } }) => {
    const msgStyle = read ? "read" : "unread";
    const sel = selected ? "checked" : "";

    return (
        <div className={"row message " + msgStyle}>
            <div class="col-xs-1">
                <div class="row">
                    <div class="col-xs-2">
                        <input type="checkbox" checked={sel}/>
                    </div>
                    <div class="col-xs-2">
                        <i class="star fa fa-star-o"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-11">
                <a href="#">
                    {`${subject} is read: ${read}`}
                </a>
            </div>
        </div>
    );
}
        
export default Message;