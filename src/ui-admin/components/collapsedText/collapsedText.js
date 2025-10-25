import React from 'react';
import { Collapse } from 'react-bootstrap';
import { useState } from 'react';
import Button from "../button/button"
const CollapsedText = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="collapse-text"
                aria-expanded={open}
            >
                {props.heading}
            </Button>
            <Collapse in={open}>
                <div id="collapse-text">
                    {props.content}
                </div>
            </Collapse>
        </>
    );
}

export default CollapsedText;