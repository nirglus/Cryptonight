import { Link } from "react-router-dom";

function NavBar(props){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {!props.user ? <Link to="/login">Login</Link> : <Link to="/favorites">Favorites</Link>}
            
        </nav>
    )
}

export default NavBar;