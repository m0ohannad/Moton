import React, { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import '../style/Box.css'

const Box = ({ title, children }) => {
    const [show, toggleShow] = useState(false);

    return (
        <>
            <div className="box">
                <h2 onClick={() => toggleShow(!show)} >{title}<b>{show ? '-' : '+'}</b></h2>
                <Collapse in={show}>
                    <div className="children">
                        {children}
                    </div>
                </Collapse>
            </div>
        </>
    );
}

export default Box;