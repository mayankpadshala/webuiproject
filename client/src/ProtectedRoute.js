import React from "react";
import { Route, Redirect } from "react-router-dom";
import {isuserloggedin} from "./UserStatus";

export const ProtectedRoute = ({ component: RouteComponent, ...rest}) => {
    return(
        <Route
            {...rest}
            render = {props => {
                console.log('login',isuserloggedin());
                if(isuserloggedin()){
                    console.log('login',isuserloggedin());
                    return <RouteComponent {...props} />;
                } else {
                    console.log('in else');
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};