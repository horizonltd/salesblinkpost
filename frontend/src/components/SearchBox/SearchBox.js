import React, { useState } from 'react'
import {Button, Form, FormControl, InputGroup} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitSearchHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <Form onSubmit={submitSearchHandler} inline>

            <InputGroup>
                <FormControl
                    placeholder="Search post"
                    aria-label="Search post"
                    aria-describedby="basic-addon2"
                    type='text'
                    name='q'
                    style={{
                        height: '100px%',
                        margin: '10px',
                        backgroundColor: 'dark',
                        background: 'dark',
                        color: 'black',
                    }}
                    onChange={(e) => setKeyword(e.target.value)}
                    className='mr-sm-2 m1-sm-5' />

                <Button variant="outline-secondary" id="button-addon2"
                        style={{
                            height: '46px',
                            margin: '9px',
                            backgroundColor: 'dark',
                            background: 'dark',
                            color: 'black',
                        }}
                        onClick={submitSearchHandler}>
                    Search
                </Button>
            </InputGroup>

        </Form>
    )
}






export default SearchBox