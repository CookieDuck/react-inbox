import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './../index.css';
import { toggleSelected, toggleStarred } from '../actions/ActionCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Message = ({ 
    message: { id, subject, read, selected, starred, labels }, 
    toggleSelected, 
    toggleStarred
}) => {
    const readMsgStyle = read ? "read" : "unread";
    const selMsgStyle = selected ? " selected" : "";
    const starStyle = starred ? "" : "-o";

    const toggleStarredLocal = (e) => {
        e.preventDefault();
        toggleStarred(id, !starred);
    }

    return (
        <div className={"row message " + readMsgStyle + selMsgStyle}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" checked={!!selected} onClick={() => toggleSelected(id)} />
                    </div>
                    <div className="col-xs-2">
                        <i className={"star fa fa-star" + starStyle} onClick={toggleStarredLocal}></i>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleSelected: (messageId) => toggleSelected(messageId),
    toggleStarred: (id, starred) => toggleStarred(id, starred)
}, dispatch);

export default connect(null, mapDispatchToProps)(Message);