/*Questo stateful component conterrà tutta la nostra struttura per la costruzione del burger.
  Ovviamente nel render verrano richiamati vari components del progetto che serviranno alla creazione
  del burger.
*/
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; 
import axios from '../../axios-orders'; //importo l'instance axios di axios-orders.js    

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    /*Le key di state devono avere lo stesso nome degli switch case di BurgerIngredient, perchè poi
        si andrà a fare il controllo proprio con quelle stringhe */
    state = {
        /*IMPORTANTE: le seguenti key agiscono solo in questo component, quindi non ha molto senso
                      inserirle in redux, a differenza di ingredients e totalPrice che sono utilizzati
                      da vari components de progetto */
        purchasing: false, //usato per determinare se mi trovo nella "modalità" di acquisto, cioè se il bottone "ORDER NOW" è stato cliccato o no
    }

    /*IMPORTANTE: componentDidMount è un ottimo posto dove fare il fetch dei dati, cioè prendere dati dal backend.
      Per questo ora voglio settare gli ingredients di state prendendo i valori dal backend. Di solito si fa così quando si ha un backend.
      RICORDA: bisogna mettere alla fine .json, perchè firebase torna sempre un json come risposta. */
    componentDidMount () {
        // console.log(this.props); //Fa vedere che usando Route ho accesso ad history e match i metodi del router. Questo ci fa vedere che ho accesso a questi due metodi perchè BurgerBuilder ha una Route (definita in App.js), ma se ad esempio faccio il console.log in Burger.js non avrò accesso ai metodi di Route perchè Burger.js non ha route (per ora)
        this.props.onInitIngredients(); /*IMPORTANTE: QUI DEVO FARE IL DISPATCH DELL'ACTION CREATOR, PERCHÈ È QUI CHE VENIVA FATTA IN PRECEDENZA LA RICHIESTA HTTP */
    }
    /*Al metodo sottostante devo passare l'ingredients, al quale i metodi che lo richiameranno passeranno
      l'updatedIngredients poichè devo fare la somma e la sottrazione sempre sul dato aggiornato */
    updatePurchase (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]; //sum =  array di values (i values sono quelli associati alle key del javascript object)
            })
            .reduce((sum, el) => {
                return sum + el /*somma il valore corrente el (in questo caso è un number, è il valore tornato
                                  da return ingredients[igKey];) al valore precendente sum */
            }, 0); /* Ho inserito 0 perchè al reduce di solito 
                    come secondo parametro si passa un parametro di inizio.
                    In questo caso visto che sto facendo la somma di tutti i values
                    al parametro iniziale do un valore di 0.
                    N.B. ALLA FINE NEL sum CI SARÀ LA SOMMA TOTALE DEGLI INGREDIENTI AGGIUNTI AL PANINO.*/
        return sum > 0; //IMPORTANTE: Tornando sum > 0 gestisco in questo component lo state purchasable (senza ovviamente dichiarare lo state perchè non serve più, vedi la sintassi). Torna true se sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        //push() ci permette di fare lo switch delle pagine. Messo qui ci permette di cliccare sul Continue del Modal ed essere reindirizzati nella route /checkout che contiene il component Checkout.js 
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { /*Torno lo state di ingredients in disabledInfo */
            ...this.props.ings //IMPORTANTE: USO props.ings PERCHÈ STO USANDO LE ACTIONS
        };
        for (let key in disabledInfo) { /*Faccio lo scan di tutte le key (salad, bacon, cheese, meat) di disabledInfo */
            disabledInfo[key] = disabledInfo[key] <= 0; /*Associo true (se il value di key è <= 0) o false (contrario)
                                                          per ogni value con chiave key */
        }

        /*Il controllo seguente viene aggiunto per orderSummary ha al suo interno this.state.ingredients
          che se non arriva il fetch dal backend risulta null (perchè settato così di default) e 
          quindi si avrà un errore. */
        let orderSummary = null; /*orderSummary = null il resto del controllo avviene 
                                   nell'if (this.state.ingredients) */

        /*Qui va fatto questo controllo perchè adesso sto facendo il fetch dei dati da backend e
          quindi in alcune parti del codice che controllano i dati prima del fetching 
          si avranno degli errori.   */
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner /> //mostro lo spinner se i dati di ingredients sono null

        if (this.props.ings) { //se ingredients non è null allora
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} /> {/* Passo lo state (chè è un oggetto) al component Burger */}
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} /*IMPORTANTE: IN QUESTI DUE DISPATCH NON PASSO ingName POICHÈ ANDANDO A VEDERE BuildControls.js SI NOTA CHE GIÀ LÌ PASSO I VALORI ctrl.type CHE SONO PROPRIO GLI INGREDIENTS*/
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchase(this.props.ings)} /*Qui ora viene passato il mapStateToProps e viene gestito tutto senza usare lo state purchasable */
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            /*Nel modal o visualizzo <OrderSummary /> oppure lo <Spinner /> */
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                totalPrice={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> {/*a show passo lo state di purchasing che mi serve nel Modal component per mostrare (quando è true) il modal*/}
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return { /* .burgerBuilder. perchè ho combinato due diversi reducers, qui va usato il key del combineReducer di src/index.js*/
       ings: state.burgerBuilder.ingredients,  
       price: state.burgerBuilder.totalPrice,
       error: state.burgerBuilder.error
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

/*Al wrapping withErrorHandler devo passare anche il parametro axios per usare al suo interno 
gli interceptors di axios */
/*Si possono passare annidare diversi hoc tra di loro, basta che ad esempio il custom withErrorHandler abbia al suo interno, nel tag <WrappingComponent></WrappingComponent> il ...this.props */
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));