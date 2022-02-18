import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../Helpers/Loader/Loader";
import { postsListAction, updatePostAction, postDetailsAction} from "../../actions/actions";
import Message from "../Helpers/Message/Message";
import FormsContainer from "../../container/FormsContainer/FormsContainer";
import { UPDATE_POST_RESET } from "../../constants/constants";
import axios from "axios";


function AddEditPost({ match, history }) {

    const postId = match.params.id

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [uploadPostImage, setUploadPostImage] = useState(false)

    const dispatch = useDispatch()

    const postDetails = useSelector(state => state.postDetails)
    const { error, loading, post } = postDetails

    const updatePost = useSelector(state => state.updatePost)
    const { error: updatePostError, loading: updatePostLoading, success: updatePostSuccess } = updatePost


    useEffect(() => {

        if(updatePostSuccess){
            dispatch({type: UPDATE_POST_RESET})
            history.push('/admin/posts/')
        }else{
            if (!post.title || post.id !== postId){
                dispatch(postDetailsAction(postId))
            }else {
                setTitle(post.title)
                setSlug(post.slug)
                setContent(post.content)
                setImage(post.image)
            }
        }
    }, [dispatch, postId, post, history, updatePostSuccess])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePostAction({
            id: postId,
            title,
            slug,
            image,
            content,
        }))
    }

    const uploadPostImageHandler =  async (e) => {
        const file = e.target.files[0]
        const formData  = new FormData()

        formData.append('image', file)
        formData.append('post_id', postId)

        setUploadPostImage(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }

            const { data } = await axios.post(`/api/post/upload/`, formData, config)

            setImage(data)
            setUploadPostImage(false)

        }catch (e) {
            setUploadPostImage(false)
        }
    }

    return (
        <div>
            <Link to='/admin/posts/'>
                Go Back
            </Link>

            <FormsContainer>
                <h3>Posts</h3>
                <br/>

                {updatePostLoading && <Loader />}
                {updatePostError && <Message variant='danger'>{updatePostError}</Message> }

                {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='title'>
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Post Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <br/>

                            <Form.Group controlId='slug'>
                                <Form.Label>Post slug</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Post slug'
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId='image'>
                                <Form.Label>Post image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Upload image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}>
                                </Form.Control>
                                <Form.Group controlId='image-file'>
                                    <Form.Control
                                        type='file'
                                        size='sm'
                                        custom='true'
                                        onChange={uploadPostImageHandler} />
                                </Form.Group>
                                {uploadPostImage && <Loader />}

                            </Form.Group>
                            <br/>

                            <Form.Group controlId='textarea'>
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea" rows={3}
                                    type='textarea'
                                    placeholder='Post Content'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <br/>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    )}
            </FormsContainer >
        </div>
    )}

export default AddEditPost