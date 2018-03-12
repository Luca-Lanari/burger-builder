/*Questo component serve per creare input customizzati. */
import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]; //Dichiaro un array con classe css iniziale InputElement

    if (props.invalid && props.shouldValidate && props.touched) { /*Qui avviene un controllo sul props invalid, cioè se è false allora aggiungo all'array della classe css un'altra
                           classe css che crea uno style rosso per identificare che il dato inserito in input è invalid.
                           Per props.shoudValidate controlla ContactData.js in <Input /> */
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please insert a valid {props.valueType}</p>;
    }
    /*inputtype in props, non è scritto come inputType poichè in React 16 non è case sentitive, qui produce un Warning.
      ATTENZIONE: ORA VIENE PASSATO elementType PERCHÈ IN ContactData.js VIENE CREATO UNO STATE CON KEY VALUE PER LA REALIZZAZIONE DI UN INPUT (VEDI ContactData.js) */
    switch (props.elementType) { /*Approccio generico per rendere più flessibile e più dinamico il component Input.js
                                Ad esempio posso aggiungere vari casi allo switch per creare diversi tipi di <input /> a seconda del tipo */
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} /*Con join(' ') ho array di classi css ['InputElement' 'Invalid'] */
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />; /*IMPORTANTE: usando lo spread operator in questo modo sto passando tutti i props di elementConfig che viene passato in ContactData.js. 
                                                                Questo mi permette di passare qualsiasi attributo HTML io voglia settare sull'input.
                                                                Basterà solo settare props.inputType e poi passare i normali attributi da passare a quel tipo.
                                                                Ovviamente lo spread operator su elementConfig importerà qui tutti i props dello state di elementConfig, cioè type, placeholder e così via */
            break;
            case ('textarea'): 
                inputElement = <textarea /*textarea è un self-closing element in React */
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />; /*Devo ovviamente importare anche value che è a parte nello stare di ContactData.js */
                break;
            case ('select'):
                inputElement = (
                    <select
                        className={inputClasses.join(' ')} 
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                    );
                break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />;
    }

    return ( /*Per renderlo più dinamico uso il return così posso passare prima del return della logica per rendere gli input più dinamici */
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    
    );

};


export default input;