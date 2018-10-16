import React from 'react';

const WithCard = (props) => {

    const title = props.title && <h5 className="card-title">{props.title}</h5>;
    return(
        <div className="card">
            <div className="card-body">
                {title}
                {props.body}
            </div>
        </div>
        );
}

export default WithCard;