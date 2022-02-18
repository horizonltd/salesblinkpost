import React, { useState, useEffect } from "react";
import {Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Helpers/Loader/Loader";
import Message from "../../components/Helpers/Message/Message";
import { createPostCommentAction, postDetailsAction} from "../../actions/actions";
import {CREATE_POST_COMMENT_RESET} from "../../constants/constants";


function SinglePost({ match, history, location }) {

    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const postDetails = useSelector(state => state.postDetails)
    const { loading, error, post } = postDetails

    const createPostComment = useSelector(state => state.createPostComment)
    const { loading: createPostCommentLoading, error: createPostCommentError, success: createPostCommentSuccess } = createPostComment

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : `/post/${match.params.id}`


    useEffect(() =>{
        if (createPostCommentSuccess){
            setComment('')
            dispatch({type: CREATE_POST_COMMENT_RESET})
        }
        dispatch(postDetailsAction(match.params.id))

    }, [dispatch, match, location, history, createPostCommentSuccess])



    const submitPostCommentHandler = (e) => {
        e.preventDefault()
        dispatch(createPostCommentAction(
            match.params.id,
            {
                // userId,
                comment
            }
        ))
    }

    return(
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>

            { loading ?
                <Loader />
                : error
                ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={post.image} alt={post.title} fluid />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">

                                        <ListGroup.Item>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <Card.Title><h3>Advertisement</h3></Card.Title>
                                                    <Card.Text>
                                                        Some quick example text to build on the card title and make up the bulk of
                                                        the card's content.
                                                    </Card.Text>
                                                    <Button variant="primary" style={{ width: '100%' }}>Click to view more</Button>
                                                </Card.Body>
                                            </Card>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                            </Row>
                            <br />
                          <Row>

                              <Col md={6}>
                                  <Card>
                                      <Card.Body>
                                          <Card.Title><h3>{post.title}</h3></Card.Title>
                                          <Card.Text>
                                              {post.content}
                                          </Card.Text>
                                      </Card.Body>
                                  </Card>
                              </Col>

                              <Col md={3}>
                                  <ListGroup variant="flush">

                                      <ListGroup.Item>
                                          <Card style={{ width: '18rem' }}>
                                              <Card.Body>
                                                  <Card.Title><h3>Recent Posts</h3></Card.Title>
                                                  <Card.Text>
                                                      Some quick example text to build on the card title and make up the bulk of
                                                      the card's content.
                                                  </Card.Text>

                                              </Card.Body>
                                          </Card>
                                      </ListGroup.Item>
                                  </ListGroup>
                              </Col>

                          </Row>

                            <Row>
                                <Col md={6}>
                                    <h4>Comment</h4>
                                    {post.comments.length === 0 && <Message variant='info'>   There is no comment yet for this post.</Message> }

                                    <ListGroup variant='flush'>
                                        {post.comments.map((com) => (
                                            <ListGroup.Item key={com.id}>
                                                <strong><h3>{com.name}</h3></strong>
                                                <p>{com.created_on.substring(0,10)}</p>
                                                <p>{com.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Comment on the Post</h4>

                                            {createPostCommentLoading && <Loader />}
                                            {createPostCommentSuccess && <Message variant='success'>{createPostCommentSuccess}</Message> }
                                            {createPostCommentError && <Message variant='danger'>{createPostCommentError}</Message> }


                                            {userInfo ? (
                                                <Form onSubmit={submitPostCommentHandler}>
                                                        <Form.Group controlId='comment'>
                                                            <label>Comment</label>
                                                            <Form.Control
                                                                required
                                                                as='textarea'
                                                                value={comment}
                                                                style={{ height: '120px'}}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                row='5'>
                                                            </Form.Control>
                                                        </Form.Group>

                                                    <br />
                                                    <Button disabled={createPostCommentLoading} type='submit' variant='primary'>Submit</Button>

                                                </Form>
                                            ) : (
                                                <Message variant='info' >Please  {'  '}
                                                    <Link
                                                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>   login to submit a comment</Link>
                                                </Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )
            }

        </div>
    )
}

export default SinglePost;