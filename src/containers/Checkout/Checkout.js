import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack(); //goBack è un metodo legato al Route che ci permette di tornare alla pagina precedente
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); //Fa il replace della pagina corrente con la pagina del path passato
    }
    render () {
        let summary = <Redirect to="/" /> /*Questo controllo con summary viene fatto perchè se vado direttamente
                                            nel path '/contact-data' prima di aver caricato vengo reindirizzato al path root, altrimenti
                                            se this.props.ings è true (cioè ci sono gli ingredienti) allora passo al checkout.
                                            Questo ha a che fare con le actions. */
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} /> {/*ATTENZIONE: Non serve più il trucco fatto precedentemente, poichè sto usando le actions. Vedi progetto precedente*/}
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return { /*.burgerBuilder. per il combineReducer */
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

/*mapDispatchToProps non serve in questo component, perchè come si può vedere non ci sono action su cui fare il dispatch */

export default connect(mapStateToProps)(Checkout); //RICORDA: Se avessi avuto solo mapDispatchToProps allora il primo argomento di connect() doveva essere null (connect(null, mapDispatchToProps))