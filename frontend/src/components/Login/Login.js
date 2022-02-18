import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Helpers/Loader/Loader'
import Message from '../../components/Helpers/Message/Message'
import FormsContainer from '../../container/FormsContainer/FormsContainer'
import { login } from '../../actions/actions'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormsContainer>
            <h3>Sign In</h3>
            <p>Sign into your Account</p>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

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
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-4'>
                <Col>
                    New Customer? <Link
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>
                </Col>
            </Row>

        </FormsContainer>
    )
}

export default LoginScreen