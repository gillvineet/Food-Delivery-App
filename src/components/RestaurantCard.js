import { CDN_URL } from "../utils/constants";
const Restaurantcard=(props)=>{
    return (
        
        <div className="m-4 p-4 max-w-[220px] h-[92%] bg-gray-100 rounded-lg hover:bg-gray-200 ">
       
        <img  className="res-logo rounded" src={CDN_URL+props.resdata.info.cloudinaryImageId}/>
         <h3 className="font-bold py-4 text-lg">{props.resdata.info.name}</h3>
        <h4>{props.resdata.info.cuisines.join(",")}</h4>
        <h4>{props.resdata.info.avgRatingString}</h4>  
        <h4>{props.resdata.info.sla.slaString}</h4>
        </div>
    )
}
export default Restaurantcard;