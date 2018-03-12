import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div> {/*Questi tre div servono per creare (grazie al DrawerToggle.css) le tre linee orizzontali classiche dei menu mobile*/}
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;