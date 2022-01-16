import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Main from "./Main";
import Private from "./Private";
import Register from "./Register";



class Router extends React.Component<{children?: never[]}, {isLogged: boolean | null}> {

    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="Register" element={<Register />} />
                    <Route path="Login" element={<Login/>}/>

                    <Route path="Main" element={
                        <Private>
                            <Main/>
                        </Private>
                    }/>

                    <Route path="*" element={<main style={{ padding: "1rem" }}>
                                            <p>There's nothing here!</p>
                                            </main>}/>
                </Routes>
          </BrowserRouter>
        )
    }

}

export default Router;