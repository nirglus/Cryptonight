import Coins from "../../components/Coins";
import Search from "../../components/Search";
import CoinItem from "../../components/CoinItem";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { getAuth } from "@firebase/auth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home(){
    const [searchResult, setSearchResult] = useState(null);
    const [favorites, setFavorites] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;

    const addToFavorites = (item) =>{
      if(isFav(item.id)){
        const newFavorites = favorites.filter(coinID => coinID != item.id);
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
    const newFavoritesRef = user ? doc(db, "favorites", user.uid) : null;
    
    useEffect(() =>{
      const getFavoritesFromDB = async () =>{
        try{
          const docData = await getDoc(newFavoritesRef);
          if(docData.data()){

            setFavorites(docData.data().favoritesID)
          } else{
            setFavorites([]);
          }
        }catch (error){
          console.log(error);
        }
      }
      if(newFavoritesRef){
        getFavoritesFromDB();
      }
    },[user]);

    useEffect(() =>{
      const addFavoritesToDB = async (user, favorites) =>{
        try {
            await setDoc(newFavoritesRef, {favoritesID: favorites, id: user.uid});
            console.log("User's favorites added to the db succesfully!");
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    }
      if(favorites){
        addFavoritesToDB(user, favorites);
        console.log(favorites);
      }
    }, [favorites]);
    

    return(
    <>
    {!user ? (
      <h1>Please <Link className="homeRegis" to="/login">login</Link> or <Link className="homeRegis" to="/login">register</Link></h1>
    ) : (
      <div className="home">
        <Search handleSearchResult={handleSearchResult} handleResetSearch={handleResetSearch} />
        {searchResult ? (
          <>
            <h2>Search Result</h2>
            <CoinItem item={searchResult} addToFavorites={addToFavorites} isFav={isFav} favorites={favorites}/>
          </>
        ) : (
          <Coins addToFavorites={addToFavorites} isFav={isFav} favorites={favorites}/>
        )}
      </div>
    )}
    </>
    )
}

export default Home;