import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'; //importo l'instance axios di axios-orders.js

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
};

/* Metodo di supporto per initIngredients che viene passato nella function più interna dell'action creator
   per evitare di mandare l'action creator in loop*/
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

/*Action Creator per chiamata asincrona. Chiamato init perchè serve per inizializzare gli ingredienti */
export const initIngredients = () => { //Non prende niente in input perchè viene settato tramite richiesta http
    return dispatch => {
        axios.get('https://react-my-burger-14ce7.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed()); //Di questo non serve fare il dispatch in BurgerBuilder/BurgerBuilder.js, perchè viene chiamato solo se c'è un'errore in automatico e non quando facciamo noi un'action.
        });
    };
};