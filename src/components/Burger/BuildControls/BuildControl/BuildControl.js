import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div> {/*Qui risiederà il label per l'ingredient*/}
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button> {/*il disabled (in questo caso) è una proprietà di default di HTML*/}
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
);

export default buildControl;