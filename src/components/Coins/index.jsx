import { requestOptions } from "../../config/coincapConfig";
import { useEffect, useState } from "react";
import CoinItem from "../CoinItem";
function Coins(props){
    const [coins, setCoins] = useState([]);
    const getCoins = () =>{
          fetch("https://api.coincap.io/v2/assets", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.data);
                setCoins(result.data);
            })
            .catch(error => console.log('error', error));
    }
    useEffect(getCoins, []);
    return(
        <>
        <h1>Coins</h1>
        <div className="coinsDisplay">
            {coins.map((item, index) => <CoinItem item={item} key={index} addToFavorites={props.addToFavorites} isFav={props.isFav} favorites={props.favorites}/>)}
        </div>
        </>
       
    )
}

export default Coins;