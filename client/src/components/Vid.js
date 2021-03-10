import React from 'react';

const Vid = ({ name, embed }) => {
    return (
        <>
            <div className="vid">
                <iframe width="280" height="157.5" src={`https://www.youtube.com/embed/${embed}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <h3>{name}</h3>
            </div>
        </>
    );
}

export default Vid;