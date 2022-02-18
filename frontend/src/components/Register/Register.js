import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Helpers/Loader/Loader'
import Message from '../../components/Helpers/Message/Message'
import FormsContainer from '../../container/FormsContainer/FormsContainer'
import { register } from '../../actions/actions'

function Register({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            setMessage("Passwords entered do not match")
        }else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormsContainer>
            <h3>Customer Registration</h3>
            <p>Please, register with your valid information</p>
            {message &&  <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    {/*<Form.Label>Email Address</Form.Label>*/}
                    <Form.Control
                        type='text'
                        placeholder='Enter your full name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <br/>

                <Form.Group controlId='email'>
                    {/*<Form.Label>Email Address</Form.Label>*/}
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <br/>

                <Form.Group controlId='password'>
                    {/*<Form.Label>Password</Form.Label>*/}
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <br />

                <Form.Group controlId='passwordConfirm'>
                    {/*<Form.Label>Password</Form.Label>*/}
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <br />
                <Button type='submit' variant='primary'>
                    Submit
                </Button>
            </Form>

            <Row className='py-4'>
                <Col>
                    Already Customer? <Link
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Sign In
                </Link>
                </Col>
            </Row>

        </FormsContainer>
    )
}

export default Register