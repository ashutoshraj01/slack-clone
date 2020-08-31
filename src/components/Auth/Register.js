import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/Firebase.js';

class Register extends React.Component {
    state ={
        username:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        errors: [],
        loading:false
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    isFormEmpty = ({username,
    email,
    password,
    passwordConfirmation}) => {
       return !username.length || !email.length || !password.length || !passwordConfirmation 
    }

    isFormValid = () => {
        let errors = [];
        let error;
        if(this.isFormEmpty(this.state)){
           error = { message: 'Fill in all Fields'};
           this.setState({ errors: errors.concat(error) })
           return false;
        }else if(!this.isPasswordValid(this.state)){
           error = { message: 'Password is invalid'}
          this.setState({ errors: errors.concat(error)})
          return false;
        }else{
            return true;
        }
    }

     displayErrors = errors => errors.map((err,i)=>
            <p key={i}>{err.message}</p>
         );
    

     isPasswordValid = ({password, passwordConfirmation}) => {
       if(password.length < 6 || passwordConfirmation < 6){
        return false;
       }
        else if(password !== passwordConfirmation)
         { 
        return false;
         }
        else {
           return true;  
     }
    }

    handleInputError = (error, inputName) =>{
        return error.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    handleSubmit = (e) => {
       e.preventDefault();
       if(this.isFormValid()){
           this.setState({errors:[],loading:true});
       firebase
       .auth()
       .createUserWithEmailAndPassword(this.state.email,this.state.password)
       .then((createUser) =>{
           console.log(createUser);
           this.setState({loading:false});
       })
       .catch(err => {
           console.log(err);
           this.setState({loading:false, errors: this.state.errors.concat(err)});
        });
       }
    }

    render(){
       const { username, email, password, passwordConfirmation } = this.state; 
        return (
            <Grid textAlign="center" verticalAlign="middle">
              <Grid.Column style={{ maxwidth:450 }}>
                 <Header as="h2" icon color="orange" textAlign="center">
                     <Icon name="puzzle piece" color="orange" />
                     Register for DevChat
                 </Header>
                 <Form size="large" onSubmit={this.handleSubmit}>
                     <Segment stacked>
                     
                     <Form.Input fluid name="username" icon="user" iconPosition="left" placeholder="Username" type="text" onChange={this.handleChange} value={username}
                     />

                     <Form.Input fluid name="email" icon="mail" 
                     iconPosition="left" placeholder="Email Address" 
                     type="text" onChange={this.handleChange} value={email}
                      className = {this.handleInputError(this.state.errors,'email')}   
                     />
                     
                     <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="Password" type="password" onChange={this.handleChange} value={password}
                          className = {this.handleInputError(this.state.errors,'password')}   
                     />
                     
                     <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Confirm Password" type="password" onChange={this.handleChange} value={passwordConfirmation}
                          className = {this.handleInputError(this.state.errors,'password')}   
                     /> 
                     
                     <Button 
                     disabled ={this.state.loading}
                      className = { this.state.loading ? 'loading' : ''}
                     color="orange" fluid size="large">Submit</Button>  

                     </Segment>
                 </Form>
                 {this.state.errors.length > 0  && (
                     <Message className="error">
                       <h3>Error</h3>
                       {this.displayErrors(this.state.errors)}
                     </Message> 
                 )}
                 <Message>
                     Already a user? <Link to="/login">Login</Link> 
                 </Message>
              </Grid.Column>
            </Grid>
        );
    }
}

export default Register;