import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link} 
            activeClassName={classes.active} //classes.active è riferito alla classe in NavigationItem.css
            exact={props.exact} /*Se non aggiunto exact nel NavLink con activeClassName i vari link saranno tutti active.
                                  Posso passare come bind exact passato da NavigationItems.js */
            /*className={props.active ? classes.active : null}*/>{props.children
            }</NavLink> {/*classes.active è dichiarata nel css di NavigationItem.css.
                           La parte di className non serve in più in quanto verrà determinata 
                           automaticamente*/}
    </li>
);

export default navigationItem;