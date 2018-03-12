import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux'; //Qui importo l'Aux perchè devo inserire il Modal affianco al Backdrop
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    /*Utilizzando lo shouldComponentUpdate controllo se è il prossimo valore di show è diverso
      dal precendente e torno true. Così facendo mi assicuro che il Modal viene chiamato 
      soltanto quando c'è l'update di show. Quindi non necessariamente verrà renderizzato 
      l'OrderSummary se non c'è update. (Per ulteriori info Sezione 8, Lezione 138).
      N.B. <OrderSummary></OrderSummary> si trova all'interno del <Modal></Modal> e quindi dipende
      dal Modal.js, per questo se faccio il controllo con questo metodo (metodo di React), 
      posso gestire la renderizzazione di OrderSummary.*/
    shouldComponentUpdate(nextProps, nextState) { /*Voglio controllare che il render viene aggiornato 
                                                    soltanto se this.props.show cambia, perchè è questo
                                                    l'unico caso in cui dovrebbe fare l'update di questo
                                                    render*/
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children; //l'ultimo controllo è per lo spinner, cioè se ha un nuovo children allora fa l'update
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    /*Lo style qui sotto è un Javascript Object che assegna un valore a transform se this.props.show è true
                    translateY(0) o se è false translateY(-100vh) (vh sta per viewport height). */
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children} {/*Qui dentro ci sarà il contenuto del modal, che può essere quello che vogliamo.
                                        Se passo a questo component solo il this.props.children (che renderizza tutto quello
                                        che è contenuto nel tag <Modal></Modal>). Posso rendere questo Modal riutilizzabile
                                        in altre parti del codice. Ad esempio, se passassi qui <OrderSummary ingredients={this.props.ingredients} />
                                        potrei utilizzare questo Modal component solo per il caso di order summary.*/}
                    
                </div>
            </Aux>
        );
    }
} 

export default Modal;