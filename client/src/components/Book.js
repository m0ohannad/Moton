import React from 'react';

const Book = ({ title, name, url }) => {

    return (
        <>
            <div className="book">
                <img src={`${url}files/shot.jpg`} data-rel='fh5-light-box-demo' data-href={url} data-width='700' data-height='400' data-title={title} />
                <h3>{name}</h3>
            </div>
        </>
    );
}

export default Book;