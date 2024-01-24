import Coins from "../components/Coins";
import Search from "../components/Search";
import CoinItem from "../components/CoinItem";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useState, useEffect } from "react";
function Home(props){
    const [searchResult, setSearchResult] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (item) =>{
      if(isFav(item.id)){
        const newFavorites = favorites.filter(coinID => coinID!=item.id);
        setFavorites(newFavorites);
      }
      else{
        setFavorites([...favorites, item.id])
      }
    }

    const isFav = (coinID) =>{
      return favorites.includes(coinID);
    }

    const handleSearchResult = (result) => {
        setSearchResult(result);
    };

    const handleResetSearch = () => {
        setSearchResult(null);
    };
    useEffect(() =>{
      const addFavoritesToDB = async (user, favorites) =>{
        try {
            const newFavoritesRef = doc(db, "favorites", user.id);
            await setDoc(newFavoritesRef, {favoritesID: favorites, id: user.id});
            console.log("User's favorites added to the db succesfully!");
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    }
      addFavoritesToDB(props.user, favorites);
      console.log(favorites);
    }, [favorites]);

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
            <CoinItem item={searchResult} addToFavorites={addToFavorites} isFav={isFav}/>
          </>
        ) : (
          <Coins addToFavorites={addToFavorites} isFav={isFav}/>
        )}
      </div>
    )}
    </>
    )
}

export default Home;