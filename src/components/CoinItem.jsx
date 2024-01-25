import { Link } from "react-router-dom";
import "./CoinItem.css";


function CoinItem(props){
    const coin = props.item;
    const addToFavorites = () => {
        props.addToFavorites(coin);
      };
    const isFavExist = props.favorites;
    return(
        // <div className="coinItem">
        //     <h3>{coin.name}</h3>
        //     <p>{coin.symbol}</p>
        //     <p>${coin.priceUsd}</p>
        //     <p><b>Change %:</b>{coin.changePercent24Hr}</p>
        //     {isFavExist ? 
        //     <button onClick={addToFavorites}>{props.isFav(coin.id) ? "Remove" : "Add to favorites" }</button>
        //     :
        //     <button onClick={props.removeCoin}>Remove</button>
        //     }
        // </div>
            <div id="card">
            <div className="card-img">
              <div className="eye">
                <img src="./src/assets/icon-view.svg" alt="" />
              </div>
            </div>
      
            <h1>{coin.name}</h1>
            <p>${Number(coin.priceUsd).toFixed(2)}</p>
            <div className="symbolAndChange">
              <span className="symbol">
                {coin.symbol}
              </span>
              <small className={`changePercent ${Number(coin.changePercent24Hr) < 0 ? 'negative' : 'positive'}`}>
                    %{Number(coin.changePercent24Hr).toFixed(2)} 
              </small>

            </div>
            <div className="border-line"></div>
            <div className="card-bottom">
              {isFavExist ? 
                    <button id="cardBtn" className="button" onClick={addToFavorites}>{props.isFav(coin.id) ? "Remove" : "Add to favorites" }</button>
                    :
                    <button id="cardBtn" className="button" onClick={props.removeCoin}>Remove</button>
              }
              <Link to={`coins/${coin.id}`}>Read more</Link> 
            </div>
          </div>
    )
}

export default CoinItem;