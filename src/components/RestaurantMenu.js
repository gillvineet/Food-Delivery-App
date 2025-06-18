import Shimmer from "./Shimmer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resID } = useParams();
  const resinfo = useRestaurantMenu(resID);
  const [showIndex,setShowIndex]=useState(null);
 
  function handleShowItems(index)
  {
    showIndex==index?setShowIndex(null):setShowIndex(index);
  }
  if (resinfo === null) return <Shimmer />;
  console.log("Data received is",resinfo);
  const { name, cuisines, costForTwoMessage } =
    resinfo?.cards[2]?.card?.card?.info;
  const categories =
    resinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name} </h1>
      <p className="font-bold text-lg">
        {cuisines.join(",")}- {costForTwoMessage}
      </p>
      {categories.map((category,index) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index===showIndex && true}
          setShowIndex={()=>handleShowItems(index)}
        
        />
      ))}
    </div>
  );
};
export default RestaurantMenu;
