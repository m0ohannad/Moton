import Vid from './Vid';
import React from 'react';

const Videos = ({ items }) => {
    return (
        <>
            <Vid key={items.embed} embed={items.embed} name={items.name} />
        </>
    );
}

export default Videos;