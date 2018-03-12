import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null //si può tornare tranquillamente un null in un JSX (vuol dire che non renderizzera niente)
);

export default backdrop;