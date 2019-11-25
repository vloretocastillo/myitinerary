import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import  '../css/Signup.css'
// import  '../css/Login.css'
import { connect } from 'react-redux'
import { login } from '../actions/usersActions'




class Login extends React.Component {

    handleClick = (e) => {
        e.preventDefault()
        console.log(e.target.email.value, e.target.password.value)
        // this.props.login(id)
        
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
                {/* <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
       
    }
}

// const mapStateToProps = (state) => {
//     return {
//         currentUser: state.auth.currentUser,
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        login: (id) => dispatch(login(id))
    }
}


export default connect(null, mapDispatchToProps)(Login);