import React from 'react';

const Toolbar = ({messages}) => {
    const unreadCount = messages.filter((m) => !m.read).length;
    var unreadDisplay = "unread message";
    if (unreadCount != 1)
        unreadDisplay += "s";

    return (
        <div className="row toolbar">
            <div className="col-md-12">

                <button className="btn btn-default">
                    <i className="fa fa-square-o"></i>
                </button>

                <button className="btn btn-default" disabled="disabled">
                    Mark As Read
                </button>

                <button className="btn btn-default" disabled="disabled">
                    Mark As Unread
                </button>

                <select className="form-control label-select" disabled="disabled">
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" disabled="disabled">
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" disabled="disabled">
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

export default Toolbar;
