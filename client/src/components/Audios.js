import React from 'react';
import Box from './Box';
import Audio from './Audio';

const Audios = ({ title, items }) => {
    const audios = items.map((item) => {
        return <Audio key={item.embed} embed={item.embed} name={item.name} />
    });
    return (
        <>
            <Box title={title} children={audios} />
        </>
    );
}
export default Audios;