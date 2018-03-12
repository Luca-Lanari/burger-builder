import React from 'react';

import classes from './BuildControls.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

/*Creo un array per la gestione dei controlli di BuildControl.js, per questo creo le key label e type
  che conterranno gli ingredienti dell'hamburger. Poichè sono solo meat, cheese, bacon e salad, posso 
  crearli direttamente in una const che non cambia nel tempo. */
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];


const buildControls = (props) =>  (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p> {/*toFixed(2) visualizza il numero decimale con due numeri dopo la virgola*/}
     {/*Faccio lo scan di tutto l'array di object controls per passare le key, value a BuildControl.js.
        IMPORTANTE: La key va passata al BuildControl tag, in questo caso posso passare la label perchè
        non ci saranno MAI due label con lo stesso nome.*/}
        {
            controls.map(ctrl => {
                return <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)} /*RICORDA: per passare un valore ad un props
                                                                 a cui è associato un metodo, devo usare 
                                                                 l'arrow function*/
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} /> /*IMPORTANTE: POSSO PASSARE L'INDICE DELLA KEY (ctrl.type)
                                                          POICHÈ LA STRUTTURA DI disabledInfo DI BurgerBuilder.js
                                                          È DI TIPO: {salad: true, meat: false, ...}.
                                                          STO USANDO UN JAVASCRIPT OBJECT CLASSICO E PER QUESTO 
                                                          POSSO ACCEDERE ALLE VARIE KEY (che in questo caso sono i
                                                         type) USANDO [] */
            })
        }
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;