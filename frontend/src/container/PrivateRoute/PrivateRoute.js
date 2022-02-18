import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {

    // Add your own authentication on the below line.
    // const isLoggedIn = AuthService.isLoggedIn()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Route
            {...rest}
            render={props =>
                userInfo ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

                )
            }
        />
    )
}

export default PrivateRoute