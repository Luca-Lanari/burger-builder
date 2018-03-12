import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}> {/*In questo div del checkout summary voglio renderizzare di nuovo il burger, così posso vedere da cosa è composto. Scelta prettamente grafica*/}
                {/*Importante: <Burger /> ha bisogno che gli passi gli ingredients */}
                <Burger ingredients={props.ingredients} /> 
            </div>
            {/*importo il component Button così ho già un UI formato. Hanno bisogno di un props di tipo stringa (btnType), è stato creato in questo modo. (Vedi Button.js)*/}
            <Button 
                btnType="Danger" 
                clicked={props.checkoutCancelled}>CANCEL</Button> 
            <Button 
                btnType="Success" 
                clicked={props.checkoutContinued}>CONTINUE</Button>         
        </div>
    );
}

export default checkoutSummary;