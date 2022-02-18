import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Helpers/Loader/Loader'
import Message from '../../components/Helpers/Message/Message'
import {getUserDetails, updateUserProfile} from '../../actions/actions'
import { USER_UPDATE_PROFILE_RESET } from "../../constants/constants";

function Profile({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile



    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            setMessage("Passwords entered do not match")
        }else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }

    }


    return (
        <Row>
            <Col md={3}>
                <h3>User Profile</h3>
                <p className='alert-info' style={{
                    padding: '10px'
                }}>Update your profile by altering any field and then click on "Update"</p>
                {message &&  <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        {/*<Form.Label>Email Address</Form.Label>*/}
                        <Form.Control
                            type='text'
                            placeholder='Full name'
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
                            placeholder='Email'
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <br />
                    <Button type='submit' variant='primary' style={{ width: "100%", }}>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h3>Request for Participation as Editor</h3>

                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Date for Request</th>
                                <th>Status</th>
                                <th>Details</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        <br />
                        <br />
                        <br />
                        <p
                            style={{
                                textAlign: 'center'
                            }}
                        >Coming soon!!!</p>

                        </tbody>

                    </Table>

            </Col>
        </Row>
    )
}

export default Profile