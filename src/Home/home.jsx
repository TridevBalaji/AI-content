import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"

function Home () {

const navigate = useNavigate();
const handlePage = () => {
    navigate('/page')
}
const handleGen = () => {
    navigate('/genpageob')
}
const handlestrm = () => {
    navigate('/strmobpage')
}
const handlestrmtxt = () => {
    navigate('/strmtxtpage')
}

    return (
        <div className="home-page">
            <h1>Welcome to the Home Page!</h1>
            <div className="buttons">
            <button onClick={handlePage}>gentext</button>
            <button onClick={handleGen}>genobj</button>
            <button onClick={handlestrm}>streamobj</button>
            <button onClick={handlestrmtxt}>streamtext</button>
            </div>
        </div>
    );
}

export default Home;