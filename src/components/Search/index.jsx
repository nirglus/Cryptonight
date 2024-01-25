import { requestOptions } from "../../config/coincapConfig";
import { useState } from "react";
import "./Search.css"

function Search(props){
    const [searchInput, setSearchInput] = useState('');

    const findCoinById = (coinID) =>{
        fetch(`https://api.coincap.io/v2/assets/${coinID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
            props.handleSearchResult(result.data);

        })
        .catch(error => console.log('error', error));
    }
    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchInput(input);
    
        if (input.trim() !== '') {
          findCoinById(input);
        } else {
          props.handleResetSearch();
        }
      }
    const handleReset = () => {
        setSearchInput('');
        props.handleResetSearch();
    }
    
    return(
        <div className="searchBar">
        <input
          type="text"
          placeholder="Enter a coin name:"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleReset}>Reset</button>
      </div>
    )
}

export default Search;