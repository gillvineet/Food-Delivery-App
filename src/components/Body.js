import Restaurantcard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredrestaurants, setfilteredrestaurants] = useState([]);
  const [searchText, setsearchText] = useState("");
  
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6691565&lng=77.45375779999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const cards =
      json.data.cards[1].card.card.gridElements?.infoWithStyle?.restaurants;
    console.log(cards)
    setListOfRestaurant(cards);
    setfilteredrestaurants(cards);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus == false)
    return <h1>Looks like you are offline!! Please check your connection</h1>;
  return listOfRestaurants.length == 0 ? (
    <Shimmer/>
  ) : (
    <div className="body">
      <div className="filter  flex">
        <div className="search m-4 p-4 ">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              console.log("Search query is",searchText);
              console.log("List of resturants is",listOfRestaurants);
              const filteredres = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              console.log("filteredres is",filteredres);
              setfilteredrestaurants(filteredres);
            }}
          >
            Search
          </button>
        </div>
        <div  className="search m-4 p-4 flex item-center mt-7">
        <button
          className="px-4 py-2 bg-gray-200  rounded-lg max-h-[80%]"
          onClick={() => {
            const filteredlist = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );

            setfilteredrestaurants(filteredlist);
          }}
        >
          Top Rated Restaurants
        </button>
        </div>

         
      </div>
      <div className="res-container flex flex-wrap break-words ">
        {filteredrestaurants?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <Restaurantcard resdata={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
