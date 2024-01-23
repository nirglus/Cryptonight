function CoinItem(props){
    const addToFavorites = () => {
        props.addToFavorites(props.item);
      };
    return(
        <div className="coinItem">
            <h3>{props.item.name}</h3>
            <p>{props.item.symbol}</p>
            <p>${props.item.priceUsd}</p>
            <p><b>Change %:</b>{props.item.changePercent24Hr}</p>
            <button onClick={addToFavorites}>Add to favorites</button>
        </div>
    )
}

export default CoinItem;