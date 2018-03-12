/*Questo component è utilizzato per sostituire la toolbar quando uso i dispositivi mobile */
import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop'; //Anche nella SideDrawer ho bisogno del backdrop
import Aux from '../../../hoc/Aux/Aux'; //Come al solito, visto che devo usare il tag <Backdrop /> non posso usarlo nel <div></div>, allora utilizzo l'Aux per avvolgere il div ed usare <Backdrop />

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]; //di default il SideDrawer è chiuso
    if (props.open) { /*Se props.open è true allora il SideDrawer è aperto */
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/> 
            <div className={attachedClasses.join(' ')}> {/*IMPORTANTE: QUANDO SI HANNO ARRAY DI STRINGHE PER PASSARLE AL className DEVONO ESSERE TRAFORMATE IN ARRAY DI STRINGHE CON IN MEZZO LO SPAZIO TRAMITE join(' ')*/}
                <div className={classes.Logo}> {/*Questo è un altro modo per cambiare l'altezza del logo.
                                                Avvolgo il tag logo con un div e poi, creando una classe
                                                Logo nel CSS di SideDrawer.css (chiamata .Logo), cambio
                                                l'altezza e così facendo posso richiamare la classe Logo
                                                di SideDrawer.css */}
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}; 

export default sideDrawer;