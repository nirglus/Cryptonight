import Coins from "../components/Coins";
import Search from "../components/Search";
import CoinItem from "../components/CoinItem";
import { useState } from "react";
function Home(){
    const [searchResult, setSearchResult] = useState(null);

    const handleSearchResult = (result) => {
        setSearchResult(result);
    };

    const handleResetSearch = () => {
        setSearchResult(null);
    };
    return(
    <>
      <Search handleSearchResult={handleSearchResult} handleResetSearch={handleResetSearch} />
      {searchResult ? (
        <>
          <h2>Search Result</h2>
          <CoinItem item={searchResult} />
        </>
      ) : (
        <Coins />
      )}
    </>
    )
}

export default Home;