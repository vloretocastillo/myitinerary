import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import  '../css/Signup.css'
import { connect } from 'react-redux'
import { login } from '../actions/usersActions'
import { Link, Redirect } from 'react-router-dom';





class Login extends React.Component {

    state = {
        redirect : false
    }

    handleClick = (e) => {
        e.preventDefault()
        let user = {
            email : e.target.email.value,
            password: e.target.password.value
        }
        // console.log('about to send fetch with info', user)
        this.props.login(user)
            .then(() => { if (localStorage.token) window.location.href = '/' } )
                
    }



    
    render() {
        
            return (
                <div className='login-container'>
                <Form onSubmit={(e) => this.handleClick(e)}>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password"/>
                    </Form.Group>
                    

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    <Form.Text className="text-muted">
                        Don't have an account yet? <Link to='/signup'>Register Here</Link>
                    </Form.Text>
                </Form>
                </div>
            )
       
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    }
}


export default connect(null, mapDispatchToProps)(Login);