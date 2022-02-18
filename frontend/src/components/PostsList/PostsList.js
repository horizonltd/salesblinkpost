import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../Helpers/Loader/Loader";
import Message from "../Helpers/Message/Message";
import {postsListAction, deletePostAction, createPostAction} from "../../actions/actions";
import Paginate from "../../container/Paginate/Paginate";
import { CREATE_POST_RESET } from "../../constants/constants";

function PostsList({ history, location}) {

    const dispatch = useDispatch()

    const postsListStore = useSelector(state => state.postsListStore)
    const { error, loading, posts, pages, page } = postsListStore

    const deletePost = useSelector(state => state.deletePost)
    const { error: deletePostError, loading: deletePostLoading, success: deletePostSuccess } = deletePost

    const createPost = useSelector(state => state.createPost)
    const { error: createPostError, loading: createPostLoading, success: createPostSuccess, post: createdPost} = createPost


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search



    useEffect(() => {
        dispatch({type: CREATE_POST_RESET})
        if (!userInfo.isAdmin){
            history.push('/login')
        }
        if (createPostSuccess){
            history.push(`/admin/post/${createdPost.id}/edit/`)
        }else{
            dispatch(postsListAction(keyword))
        }

    }, [dispatch, history, location, keyword, userInfo, deletePostSuccess, createPostSuccess, createdPost])

    const deletePostHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this post")){
            dispatch(deletePostAction(id))
        }
    }


    const createPostHandler = () => {
        dispatch(createPostAction())
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h3>Posts</h3>
                </Col>

                <Col className='text-center'>
                    <Button className='my-3' onClick={createPostHandler}>
                        <i className='fas fa-plus'> Add Post</i>
                    </Button>
                </Col>
            </Row>

            {deletePostLoading && <Loader /> }
            {deletePostError && <Message variant='danger'>{deletePostError}</Message> }

            {createPostLoading && <Loader /> }
            {createPostError && <Message variant='danger'>{createPostError}</Message> }

                {loading ? (
                    <Loader />
                ) : error ? (<Message variant='danger'>{error}</Message>
                ) : (
                    <div>
                    <Table striped hover bordered responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>created On</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.created_on.substring(0,10)}</td>
                                <td>
                                    <LinkContainer to={`/admin/post/${post.id}/edit/`}>
                                        <Button className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deletePostHandler(post.id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>

                            </tr>
                        ))}
                        </tbody>

                    </Table>
                        <Paginate page={page} pages={pages} isAdmin={true} />
                    </div>
                )}
        </div>
    )
}

export default PostsList