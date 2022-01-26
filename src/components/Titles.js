import React from "react";
import app_logo from '../images/app_logo.png';

// const logo = '../images/app_logo.png';

function Titles(props) {
    return(
        <header role="banner" className="titles-Wrapper">
            <div className="logo-img">
                <img className="logo-app" src={app_logo} alt="get weather app logo"/>
            </div>
            <h1>Get temperature, expections and more...</h1>
        </header>
    );
}

export default Titles;