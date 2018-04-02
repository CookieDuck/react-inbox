import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    toggleComposeForm, 
    selectAll, 
    selectNone, 
    markAsRead, 
    markAsUnread, 
    deleteMessages, 
    applyLabel,
    removeLabel 
 } from '../actions/ActionCreator';

const Toolbar = ({
    messages, 
    toggleCompose, 
    selectAll, 
    selectNone, 
    markAsRead, 
    markAsUnread, 
    deleteMessages, 
    applyLabel,
    removeLabel
}) => {
    const handleSelectAll = (e) => {
        if (messages && messages.every((m) => m.selected)) {
            selectNone();
        } else {
            selectAll();
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteMessages(getSelectedMessageIds());
    }

    const handleApplyLabel = (e) => {
        const value = e.target.value;
        if (value) {
            applyLabel(getSelectedMessageIds(), value);
        }
        e.target.selectedIndex = 0;
    }

    const handleRemoveLabel = (e) => {
        const value = e.target.value;
        if (value) {
            removeLabel(getSelectedMessageIds(), value);
        }
        e.target.selectedIndex = 0;
    }

    const getSelectedMessageIds = () => {
        return !messages ? [] : messages.filter((m) => m.selected).map((m) => m.id);
    }

    const unreadCount = messages.filter((m) => !m.read).length;
    var unreadDisplay = "unread message";
    if (unreadCount !== 1)
        unreadDisplay += "s";
    
    const selectedCount = messages.filter((m) => m.selected).length;
    var selectMessagesStyle = "fa-square-o"; // 0
    if (selectedCount !== 0 && messages.length > 0) {
        if (messages.length === selectedCount) {
            selectMessagesStyle = "fa-check-square-o"
        } else {
            selectMessagesStyle = "fa-minus-square-o"
        }
    }

    const disabled = (selectedCount > 0 && messages.length > 0) ? "" : "disabled";

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <a className="btn btn-danger" onClick={toggleCompose}>
                    <i className="fa fa-plus"></i>
                </a>

                <button className="btn btn-default" onClick={handleSelectAll}>
                    <i className={"fa " + selectMessagesStyle}></i>
                </button>

                <button className="btn btn-default" disabled={disabled} onClick={() => markAsRead(getSelectedMessageIds())} >
                    Mark As Read
                </button>

                <button className="btn btn-default" disabled={disabled} onClick={() => markAsUnread(getSelectedMessageIds())} >
                    Mark As Unread
                </button>

                <select className="form-control label-select" disabled={disabled} onChange={handleApplyLabel} >
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" disabled={disabled} onChange={handleRemoveLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" disabled={disabled} onClick={handleDelete} >
                    <i className="fa fa-trash-o"></i>
                </button>

                <p className="pull-right">
                    <span className="badge badge">{unreadCount}</span>
                    {unreadDisplay}
                </p>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    messages: state.messages
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleCompose: () => toggleComposeForm(),
    selectAll, 
    selectNone, 
    markAsRead: (ids) => markAsRead(ids),
    markAsUnread: (ids) => markAsUnread(ids),
    deleteMessages: (ids) => deleteMessages(ids),
    applyLabel: (ids, label) => applyLabel(ids, label),
    removeLabel: (ids, label) => removeLabel(ids, label),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
