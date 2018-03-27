import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSelected } from '../actions/ActionCreator';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './../index.css';

const Message = ({ message: { id, subject, read, selected, starred, labels }, actionHandler }) => {
    const readMsgStyle = read ? "read" : "unread";
    const selMsgStyle = selected ? " selected" : "";
    const starStyle = starred ? "" : "-o";

    const toggleSelectedMessage = (e) => {
        // actionHandler({ action: "toggleSelected", id: id });
        console.log('toggleSelectedMessage');
        toggleSelected(id);
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
                        <input type="checkbox" checked={selected} onClick={toggleSelectedMessage} />
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

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleSelected }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);