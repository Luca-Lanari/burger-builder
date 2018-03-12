import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder</NavigationItem> {/*In questo caso passo exact come props a NavigationItem.js.
                                                                          Va bene metterlo solo in / e non in /orders, non serve*/} 
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;