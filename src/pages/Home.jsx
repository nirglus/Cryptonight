import Coins from "../components/Coins";
import Search from "../components/Search";
import CoinItem from "../components/CoinItem";
import { useState } from "react";
function Home(props){
    const [searchResult, setSearchResult] = useState(null);

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
            <CoinItem item={searchResult} />
          </>
        ) : (
          <Coins />
        )}
      </div>
    )}
    </>
    )
}

export default Home;