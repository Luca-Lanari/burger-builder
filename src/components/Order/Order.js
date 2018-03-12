import React from 'react';

import classes from './Order.css';

const order = (props) => {
    /*Sto trasformando ingredients in un array di ingredients, così da poterli stampare a schermo.
    Questo è un metodo alternativo per trasformare, ma si può usare anche il metodo usato in Burger.js in trasformedIngredients */
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={
                {
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }
            }
            key={ig.name}>{ig.name} ({ig.amount})</span>; 
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p> {/*Number.parseFloat converte una stringa in un number*/}
        </div>
    );

}; 

export default order;