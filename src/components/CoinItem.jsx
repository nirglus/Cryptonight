function CoinItem(props){
    return(
        <div className="coinItem">
            <h3>{props.item.name}</h3>
            <p>{props.item.symbol}</p>
            <p>${props.item.priceUsd}</p>
            <p><b>Change %:</b>{props.item.changePercent24Hr}</p>
        </div>
    )
}

export default CoinItem;