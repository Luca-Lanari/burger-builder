/*Questo component realizza l'hamburger vero e proprio. */

import React from 'react';
//import { withRouter } from 'react-router-dom'; //Hoc di router che ci permette di fare l'injection dei props di history, match ecc di route in un component che non ha una Route

import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = (props) =>  {
    /*Poichè sto passando lo state, che è un oggetto, devo trasformarlo qui in un array, per farlo uso il 
    metodo keys di Object, che prende un oggetto e lo trasforma in Array. 
    N.B. l'array conterrà solo le KEY dell'oggetto.
    Sto mappando l'ggetto in un array di ingredients alla fine.*/
    let transfomedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />; 
            }); /*In questo momento abbiamo un array con due elementi;
                  poichè per ogni key dell'oggetto (ora trasfomato) in
                   array ritorno un altro array per ogni key.
                   In questo modo sto creando un array di Arrays.
                   [ingKey ]. Con .map(_, i) sto ad indicare che non
                   considero il primo elemento.
                   Fai qualche console.log per capire come funziona  */
        })
        .reduce((arr, el) => {
            return arr.concat(el); //questa sintassi concatena l'elemento corrente all'array arr.
        }, []); /*reduce è un metodo di Array che ci permette di trasfomare un array in qualcos'altro.
              Prende in input una function ed essa prende due valori in input, il valore precedente e il 
              valore corrente. Riceve anche un altro valore che in questo caso setto come array vuoto.
              P.S. Questa parte del reduce() viene fatta per settare un array vuoto se tutti gli ingredienti
              sono settati con valore 0 nello state. Questa tecnica viene chiamata fare il Flatten dell'Array. */ 
    console.log(transfomedIngredients);
    if (transfomedIngredients.length === 0) {
        transfomedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfomedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

//export default withRouter(burger);
export default burger;