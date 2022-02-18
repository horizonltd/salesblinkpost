import React, { useEffect }from "react";
import {Row, Col, Card} from "react-bootstrap";
import Post from "../../components/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Helpers/Loader/Loader";
import Message from "../../components/Helpers/Message/Message";
import { postsListAction } from "../../actions/actions";
import Paginate from "../Paginate/Paginate";
import SearchBox from "../../components/SearchBox/SearchBox";

function Home({ history }) {
    const dispatch = useDispatch()
    const postsListStore = useSelector(state => state.postsListStore)
    const { error, loading, posts, page, pages} = postsListStore

    let keyword = history.location.search

    console.log(posts)

    useEffect(() =>{
        dispatch(postsListAction(keyword))
    }, [dispatch, keyword])


    return(
        <div className="home-content-wrapper">

            <div>
                <SearchBox />
            </div>

            <br/>

            {loading ? <Loader />
                : error ?
                    <Message variant='danger'>
                        {error}
                    </Message>

                    : <div>
                        <Row>
                            {posts.map(post => (
                                <Col key={post.id} sm={12} md={6} lg={4} xl={3}>
                                    <Post post={post} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }

        </div>
    )
}

export default Home;