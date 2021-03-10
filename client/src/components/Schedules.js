import React from 'react';
import Schedule from './Schedule';

const Schedules = ({ items }) => {
    return (
        <>
            <Schedule key={items.src} src={items.src} name={items.name} />
        </>
    );
}

export default Schedules;