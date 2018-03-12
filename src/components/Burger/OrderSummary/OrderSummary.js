/*Questo component è utilizzato per visualizzare il sommario dell'ordine, sarà utilizzato nel Modal.
  Viene creato nella directory Burger/ poichè fa parte alla fine di un qualcosa che si riferisce al Burger.
  Viene infine creato un component a parte perchè in React è buona norma, quando possibile, suddividere 
  in vari component per rendere riutilizzabili in altre parti del codice i vari component. 
*/
import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux'; //Posso usare l'Aux qui perchè non ho bisogno di fare il wrapping con div perchè non passo nessun css
import Button from '../../UI/Button/Button'; //importo il component per i button per il modal

class OrderSummary extends Component {
    //Questo può essere un functional Component, è stato trasformato in stateful component per fare prove di debugging
    componentWillUpdate() { //Questo metodo non è più richiesto perchè la gestione dell'update ora viene gestita nel LifeCycle del Modal.js
        console.log('[OrderSummary] WillUpdate');
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients) //Qui passo come al solito ingredients che è un oggetto e quindi lo trasformo in un Array e ci faccio poi il map 
        .map(igKey => {
            return (
                <li key={igKey}> {/*igKey contiene il type (Salad, Bacon,...)this.props.ingredients[igKey]) contiene il 
                           value, cioè la quantità (1,2,3,...ecc)*/}
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} 
                </li> ); 
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>           
            </Aux>
        );
    }
}

export default OrderSummary; 