import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './../index.css';
import { action } from '@storybook/addon-actions/dist/preview';

const Message = ({ message: { id, subject, read, selected, starred, labels }, actionHandler }) => {
    const readMsgStyle = read ? "read" : "unread";
    const selMsgStyle = selected ? " selected" : "";
    const sel = selected ? "checked" : "";
    const starStyle = starred ? "" : "-o";

    const toggleSelected = (e) => {
        actionHandler({ action: "toggleSelected", id: id });
    }

    const toggleStarred = (e) => {
        e.preventDefault();
        actionHandler({ action: "toggleStarred", id: id});
    }

    return (
        <div className={"row message " + readMsgStyle + selMsgStyle}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" checked={selected} onClick={toggleSelected} />
                    </div>
                    <div className="col-xs-2">
                        <i className={"star fa fa-star" + starStyle} onClick={toggleStarred}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {!!labels ? labels.map((label) => <span key={label} className="label label-warning">{label}</span> ) : "" }
                <a href="#">
                    {subject}
                </a>
            </div>
        </div>
    );
}
        
export default Message;