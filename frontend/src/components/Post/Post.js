import React from "react";
import {Card} from "react-bootstrap";
import { Link } from 'react-router-dom';

function Post({ post }) {
    return(
        <div>
            <Card className="my-3 p-3 rounded">
                <Link to={`/post/${post.id}`}>
                    <Card.Img src={post.image} />
                </Link>

                <Card.Body>
                    <Link to={`/post/${post.id}`}>
                       <Card.Title as="div">
                           <strong>{post.title}</strong>
                       </Card.Title>
                    </Link>
                </Card.Body>

            </Card>
        </div>
    );
}

export default Post;