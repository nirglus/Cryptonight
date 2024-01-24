import { Link } from "react-router-dom";

function NavBar(props){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/favorites">Favorites</Link>
            {!props.user ? <Link to="/login">Login</Link> : null}
            
        </nav>
    )
}

export default NavBar;