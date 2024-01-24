function CoinItem(props){
    const coin = props.item;
    const addToFavorites = () => {
        props.addToFavorites(coin);
      };
    return(
        <div className="coinItem">
            <h3>{coin.name}</h3>
            <p>{coin.symbol}</p>
            <p>${coin.priceUsd}</p>
            <p><b>Change %:</b>{coin.changePercent24Hr}</p>
            <button onClick={addToFavorites}>{props.isFav(coin.id) ? "Remove" : "Add to favorites" }</button>
        </div>
    )
}

export default CoinItem;