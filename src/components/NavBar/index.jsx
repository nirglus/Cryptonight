import { Link } from "react-router-dom";
import ethereumIcon from "../../assets/icon-ethereum.svg";
import "./NavBar.css"

function NavBar(props){
    return(
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <h1><img src={ethereumIcon} alt="cryptonight-logo" /> CryptoNight</h1>
                </div>
                <div className="nav-elements">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            {!props.user ? <Link to="/login">Login</Link> : <Link to="/favorites">Favorites</Link>}
                        </li>
                        <li>
                        {props.user ? <button className="button" onClick={props.userSignOut}>Sign out</button> : null}
                        </li>
                    </ul>
                </div>      
            </div>  
        </nav>
    )
}

export default NavBar;