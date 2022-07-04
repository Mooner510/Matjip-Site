import React from "react";
import './Login_icon.css'

function Login_icon() {
    return (
        <div id="container">
            <button className="learn-more">
        <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
        </span>
                <span className="button-text">Login</span>
            </button>
        </div>
    );
}

export default Login_icon;