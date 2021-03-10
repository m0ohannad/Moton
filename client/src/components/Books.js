import Book from './Book';
import Box from './Box';
import React from 'react';

const Books = ({ title, items }) => {

    const books = items.map((item) => {
        return <Book key={item.url} url={item.url} title={item.title} name={item.name} />
    });

    return (
        <Box title={title} children={books} />
    );
}

export default Books;