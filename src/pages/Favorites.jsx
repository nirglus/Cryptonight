import { db } from "../config/firebaseConfig";
import { getDoc, doc , arrayRemove, updateDoc} from "firebase/firestore";
import { useState ,useEffect } from "react";
import { requestOptions } from "../config/coincapConfig";
import CoinItem from "../components/CoinItem";

function Favorites({user}){
    const [dbFavorites, setDbFavorites] = useState([]);
    const [apiFavorites, setApiFavorites] = useState([]);

    const removeCoin = async(coinID) =>{
        const updatedApiFavorites = apiFavorites.filter((coin) => coin.id !== coinID);
        setApiFavorites(updatedApiFavorites);
        try {
            const favoritesRef = doc(db, 'favorites', user.id);
      
            await updateDoc(favoritesRef, {
              favoritesID: arrayRemove(coinID),
            });
      
            console.log('Coin removed from favorites successfully!');
          } catch (error) {
            console.error('Error removing coin from favorites:', error);
          }
        };
    
    useEffect(() => {
      const fetchFavoritesFromDB = async () => {
        try {
          if (user) {
            const favoritesRef = doc(db, "favorites", user.id);
            const favoritesDoc = await getDoc(favoritesRef);
  
            if (favoritesDoc.exists()) {
              const favoritesData = favoritesDoc.data().favoritesID || [];
              setDbFavorites(favoritesData);
            }
          }
        } catch (error) {
          console.error("Error fetching favorites from the database:", error);
        }
      };
  
      fetchFavoritesFromDB();
    }, [user]);
  
    useEffect(() => {
      const fetchFavoritesDataFromAPI = async () => {
        try {
          const response = await fetch(`https://api.coincap.io/v2/assets?ids=${dbFavorites.join(',')}`, requestOptions);
          const result = await response.json();
          console.log(result.data);
          setApiFavorites(result.data);
        } catch (error) {
          console.error("Error fetching data from the Coinbase API:", error);
        }
      };
  
      if (dbFavorites.length > 0) {
        fetchFavoritesDataFromAPI();
      }
    }, [dbFavorites]);
    
      return (
        <div className="favorites">
          <h1>Favorites</h1>
          <ul>
            {apiFavorites.map((favorite, index) => (
              <CoinItem item={favorite} key={index} removeCoin={() => removeCoin(favorite.id)} />
            ))}
          </ul>
        </div>
      );
    }

export default Favorites;