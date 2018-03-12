import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        /*Local UI state, quindi si può lasciare qui senza doverlo riscrivere con redux */
        orderForm: { /*Di seguito viene realizzato un tipico javascript object per i form, ovviamente potevo anche creare un metodo helper e richiamarlo in ogni key creata nel javascript object */
                name: { /*Definisco come dovranno essere gli input da inserire nel form */
                    elementType: 'input', //input rappresenta il tag HTML, quindi va chiamato proprio come il tag stesso
                    elementConfig: { /*Utile per gestire gli html tag. Il nome a mia discrezione, come sempre */
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: '',
                    validation: { //in React non ci sono package di terze parti per la validazione dei form, bisogna implemetarseli da soli
                        required: true
                    },
                    valid: false, //Utilizzato per il controllo sulla validità, quando la validation sarà tutta true allora questo diventa true
                    touched: false //Utilizzato per il controllo sul form input cliccato
                },
                street: {
                    elementType: 'input', 
                    elementConfig: { 
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: { 
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input', 
                    elementConfig: { 
                        type: 'text',
                        placeholder: 'ZIP'
                    },
                    value: '',
                    validation: { 
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false 
                },
                 country: {
                    elementType: 'input', 
                    elementConfig: { 
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: { 
                        required: true
                    },
                    valid: false,
                    touched: false
                 },
                email: {
                    elementType: 'input', 
                    elementConfig: { 
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    value: '',
                    validation: { 
                        required: true
                    },
                    valid: false,
                    touched: false 
                },
                deliveryMethod: { /*Voglio che sia un dropdown */
                    elementType: 'select', 
                    elementConfig: { 
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    /*value va per forza settato a qualcosa, non può essere '', altrimenti il dropdown sarà vuoto se lascio il valore di default*/
                    value: 'fastest', //IMPORTANTE: Se nel dropdown non inserisco nessun valore, anche se graficamente vedo le opzioni, se lascio l'opzione di default verrà selezionato il value '', cioè il value empty. Altrimenti c'è un altra opzione che si può usare
                    validation: {}, //IMPORTANTE: Cioè questa, inserire un validation anche qui ma che a differenza di quelli sopra è un javascript object vuoto, così abbiamo i validation in tutte le key in modo eguale 
                    valid: true //IMPORTANTE: Questo valid va inserito nel dropdown perchè altrimenti nel controllo formIsValid darà sempre false e quindi formIsValid darà sempre undefined, non disabilitando mai il button 'order'
                }
        },
        formIsValid: false, //Questo serve per il controllo sul disable button order se il form non è valido
    }

    /*Metodo per il controllo del validation, torna true se il value è valido o no */
    checkValidity(value, rules) { /*IMPORTANTE: QUESTO METODO CONTROLLA SE NELL'INPUT E' INSERITA UNA STRINGA  
                                                VUOTA. */
        let isValid = true; /*Se inserisco diversi controlli di validation, il metodo andrà in Flow, per evitare questo
                              conviene settare isValid = true e fare un ulteriore controllo negli if (&& isValid), così
                              facendo tutti gli if devono essere true per risolvere la rules*/ 
        
        if (!rules) { //Alternativa al controllo del validation: {} del dropdown. Si possono implementare tutti e due per sicurezza
            return true;
        }
        
        if (rules.required) { //Se la rules.required è true allora (cioè se il required in state è true allora vuol dire che c'è un controllo su stringa vuota)
            isValid = value.trim() !== '' && isValid; //setto isValid al value (trim toglie eventuali spazi) se != da '' 
        }

        /*Altri esempi di regole per il validation che posso creare */
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault(); //Questo serve perchè voglio prevenire l'invio della request perchè mi fa la reload della pagina
                /*Creo un javascript object dove passo i dati dello state e più altri dati (per ora dummy data) */
        
        const formData = {}; //in questo javascript object (inizialmente vuoto) voglio salvarci il key, value dello state orderForm
        for (let formElementIdentifier in this.state.orderForm) { //formElementIdentifier è name, street, ecc
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; //Creo coppia key value (name: value), (street: value) value è un valore inserito dallo user
        }
        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData //setto il javascript object orderData (creato appositamente qui per passarlo come request get) a formData
        }
        this.props.onOrderBurger(order); //IMPORTANTE: QUI PASSO L'ACTION DI actions/order.js 
    }

    /*Questo metodo viene passato all'Input di Input.js per gestire gli eventi su onChange, cioè, gestire i form in cui viene inserito un testo o qualcosa.
     */
    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);
        /*Creo una copia di orderForm usando lo spread operator, putroppo questo creerà solo la copia di
          name, street, ecc. che però essi hanno al loro interno altro javascript object, allora per creare 
          la copia del javascript object di ogni key (name, street, ecc) creo una const che contiene al suo
          interno crea la copia di elementType, elementConfig per ogni key (name, street, ecc.), utilizzando 
          sempre lo spread operator. Nella const updatedFromElement passo inputIdentifier che è l'id dell'array 
          formElementsArray e contiene name, street, ecc. Cioè se ci sono sempre più javascript object nested
          allora devo creare altre const che a loro volta prendono il valore di updatedFormElement e fanno la stessa
          cosa con lo spread operator. RICORDA, questi sono cloni di state.*/
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value; /*Ora setto il value di update updatedFormElement (che è il value di ogni javascript object) a event.target.value, 
                                                         cioè il valore di quello che scrivo nell'input tag in html*/
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation); //Controllo required, cioè se la stringa inserita è vuota, controllo il value con la rules del metodo
        updatedFormElement.touched = true; /*IMPORTANTE: Il settaggio a true di touched lo faccio qui perchè so che in questo metodo c'è il momento in cui inserisco qualcosa nell'input, e quindi il touched deve diventare true */
        updatedOrderForm[inputIdentifier] = updatedFormElement; /*Infine setto al javascript object orderForm con inputIdentifier (che può essere
                                                                  name, street, ecc.) il valore passato nell'input del form*/
        
        let formIsValid = true; //Devo settarlo a true per lo stesso motivo di checkValidity in isValid
        for (let inputIdentifier in updatedOrderForm) { //Faccio il for di tutte le key di state ed estraggo il valore di valid di ogni key per inserirlo in formIsValid 
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; //se tutti i valid sono true alla fine in formIsValid avrò true, che significa che il form è valido e quindi posso settarlo con setState
        }                                                          
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid}); /*Ovviamente questo passaggio è il solito ed importante passaggio che viene fatto
                                                        per settare definitivamente lo state, se non faccio questo passaggio non viene aggionato mai lo state.*/
        }


    render () {
        /*Per passare lo state, che è un javascript object, come props in <Input /> bisogna salvarlo in un array.
         Nel seguente modo c'è la logica per farlo, le key nel for sono (name, street, zipCode, ecc) e quindi creo dentro un array
         un javascript object che conterrà l'id che sarà la key e un config che conterrà quello dentro alla key (di state).*/
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}> {/*IMPORTANTE: Per fare la submit di un form si usa l'attributo 
                                                    onSubmit in form, dove viene passato poi il metodo handler
                                                    per il submit dei dati.*/}
                {/*Ovviamente una volta creato l'array andrà mappato e per ogni elemento passo i valori ad <Input />*/}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} /*.config perchè nell'array è salvata la key config che contiene tutto quello che c'è in nam, street, ecc*/
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valueType={formElement.id}
                        invalid={!formElement.config.valid} /*! perchè voglio il contrario */
                        shouldValidate={formElement.config.validation} /*IMPORTANTE: Questo controllo torna true se il validation è presente nella key di uno state,
                                                                                     si usa perchè passandolo ad Input.js lì posso fare il controllo solo sugli input che hanno validation e
                                                                                     non su, ad esempio il dropdown, che non ha validation e non serve sia rosso  */
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button> {/*Il disabled di button va gestito nel component Button, perchè è un props del component*/}
        </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
      onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))  
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));