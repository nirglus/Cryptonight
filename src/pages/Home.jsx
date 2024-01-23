import Coins from "../components/Coins";
import Search from "../components/Search";
import CoinItem from "../components/CoinItem";
import { useState } from "react";
function Home(props){
    const [searchResult, setSearchResult] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (item) =>{
      console.log(item);
      if (!favorites.includes(item)) {
        setFavorites(prevFavorites => [...prevFavorites, item]);
      }
      console.log(favorites);
    }

    const handleSearchResult = (result) => {
        setSearchResult(result);
    };

    const handleResetSearch = () => {
        setSearchResult(null);
    };
    return(
    <>
    {!props.user ? (
      <h1>Please login or register</h1>
    ) : (
      <div className="home">
        <Search handleSearchResult={handleSearchResult} handleResetSearch={handleResetSearch} />
        {searchResult ? (
          <>
            <h2>Search Result</h2>
            <CoinItem item={searchResult} addToFavorites={addToFavorites}/>
          </>
        ) : (
          <Coins addToFavorites={addToFavorites}/>
        )}
      </div>
    )}
    </>
    )
}

export default Home;