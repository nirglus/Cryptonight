import ethereumIcon from "../../assets/icon-ethereum.svg";
import { Link } from "react-router-dom";
import "./About.css";
function About(){
    return(
        <div className="about">
        <div className="about-left">
            <h1><img src={ethereumIcon} alt="cryptonight-logo" /> CryptoNight</h1>
            <p>Illuminate your path to financial freedom</p>
            <Link to="/login">Join us</Link>

        </div>
        <div className="about-right">
        </div>
        </div>
    )
}

export default About;