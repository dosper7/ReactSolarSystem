import React from 'react';

const WithGroupItem = (props) => {

const columns = props.groupItems.map((item,idx) =>{
    return <div key={idx} className="col-sm">{item}</div>
});

const className = "list-group-item list-group-item-action" + (props.active ? " active":"");
    return(
        <div className={className}>
        <div className="container">
            <div className="row" >
            {columns}
            </div>
        </div>
    </div>
        );
}

export default WithGroupItem;