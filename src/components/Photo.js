import React from 'react';

const Photo = props => (
    <li>
        <img src={ `https://live.staticflickr.com/${props.serverID}/${props.id}_${props.secret}.jpg` } alt="" />
    </li>
);

export default Photo;


