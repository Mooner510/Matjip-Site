import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import NotFound from './404';
import Login from "./Login";

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/Matjip-Site" element={<Main />} />
                    <Route path="/Matjip-Site/Login" elemenet={<Login />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;