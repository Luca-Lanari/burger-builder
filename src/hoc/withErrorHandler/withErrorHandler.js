/*Sto utilizzando uno dei due metodi with... per avvolgere i tag di cui ho necessità di controllo 
 sugli errori, facendo questo non serve ripetere codice per controllo errori  */
import React, {Component} from 'react'

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component { //Setto una classe anonima (perchè non richiamerò mai questa classe), perchè mi serve per passare l'axios
        state = {
            error: null
        }
        /*Qui va usato componentWillMount poichè componentDidMount viene chiamato dopo il 
          render child component, cioè dopo che viene chiamato in <WrappedComponent />, e visto che
          raggiungiamo il web dopo aver chiamato il <WrappedComponent />, componentDidMount non
          verrà mai chiamato. Per questo usiamo componentWillMount che viene chiamato prima del
          render child component, cioè prima del <WrappedComponent /> .  */
        componentWllMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        /*Questo component lifecycle viene eseguito nel momento in cui il component (withErrorHandler)
          non è più richiesto. Lo sto usando perchè quando riuserò in altre parti del codice questo 
          component, al suo interno ci saranno gli interceptor che verranno sempre eseguiti, anche
          se non necessari per quello specifico caso. Poichè questa è una classe ed ogni sua istanza
          ripeterà il codice contenuto al suo interno, bisognerà fare l'unmount degli interceptor.
          Per fare l'unmount bisogna salvarsi in una variabile axios.intercerptor.request e 
          axios.interceptor.reponse e poi fare l'eject. */
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
                
            );
        }
    }
}

export default withErrorHandler;