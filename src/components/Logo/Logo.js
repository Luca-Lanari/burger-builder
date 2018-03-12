import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'; /* ricordiamo sempre l'import con il nome
                                                                 sarà una stringa alla fine e quindi ecco perchè
                                                                 posso passare direttamente burgerLogo ad src di
                                                                 <img>*/
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}> {/*Modo per cambiare l'altezza 
                                                                    del logo nella Toolbar,
                                                                    passo un props con l'altezza
                                                                    allo style (style attributo di
                                                                    html) che prende un Javascript
                                                                    object*/}
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;