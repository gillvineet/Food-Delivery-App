 import { MENU_API } from "./constants";
 import { useState,useEffect } from "react"
const useRestaurantMenu=(resID)=>{
    const [resInfo,setresInfo]=useState(null);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData=async ()=>{
        const data= await fetch(MENU_API+resID);
     const json=await data.json();
      setresInfo(json.data);
      console.log("Data fetched is",json);
    };
    return resInfo;

};
export default useRestaurantMenu;