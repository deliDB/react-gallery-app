import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => {
    const results = props.data
    let photos;

    if(results.length > 0) {
        photos = results.map( photo => <Photo id={ photo.id } serverID={ photo.server } secret={ photo.secret } key={ photo.id }/>)
    } else {
        photos = <NotFound />
    }

    return(
        <ul>
            { photos }
        </ul>
    );

}

export default PhotoList;


