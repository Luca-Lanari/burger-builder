/*Questo component conterrà gli ingredienti per l'hamburger. */
/* IMPORTANTE: Questo stateless component è stato trasformato in uno stateful component perchè l'insegnante
               del corso preferisce utilizzare i PropTypes (controlli sui tipi di props) soltanto negli
               stateful component. Di solito negli stateless components l'insegnante preferisce non 
               aggiungere proprietà alle funzioni (cosa che viene fatta se aggiungo i PropTypes in uno
               stateless component). Quindi questa trasformazione è fatto solo e soltanto per una preferenza
               personale, i PropTypes SI POSSONO usare tranquillamente sugli stateless component.
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types'; /*Importo il package per il controllo sui type di props */

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null; /* In base al props passato dovrò fare il render dell'ingrediente selezionato. Per ora settato a null */
            
        /*Qui uso lo switch-case per gestire il valore passato dal props.type. in base al valore passato
        assegno ad ingredient un JSX con la classe CSS che rappresenta quel dato props.type.
        Ad esempio, se props.type è una stringa di tipo bread-bottom (la base bassa del panino), assegno
        ad ingrendient il JSX che farà il render grafico della base del panino. */
        switch (this.props.type) { //per accedere al props in uno stateful component bisogna usare this
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>    
                );
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
            case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
                break;
            case ('salad'):
            ingredient = <div className={classes.Salad}></div>;
                break;
            default: 
                ingredient = null;
        }
        return ingredient;
    };
}


BurgerIngredient.propTypes = { /*oneOf indica che che il props di nome type deve essere di uno dei seguenti tipi.
                                isRequired, indica che è richiesto uno dei tipi.*/
    type: PropTypes.oneOf([
        "bread-bottom",
        "bread-top",
        "meat",
        "cheese",
        "salad",
        "bacon"
      ]).isRequired
};

export default BurgerIngredient;