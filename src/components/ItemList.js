import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
const ItemList = ({ items}) => {
const dispatch = useDispatch();
  const handleAddItem = (item) => {
  const { quantity, ...cleanItem } = item;
  dispatch(addItem(cleanItem));
};
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2  border-gray-200   border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="p-2">
              <span className="font-bold">{item.card.info.name} </span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="m-2 p-2 ">{item.card.info.description}</p>
          </div>
          <div className="w-4/12 p-4">
            <div className="absolute mx-10">
              <button
                className="p-4 bg-black text-white shadow-lg  rounded-lg"
                onClick={()=>handleAddItem(item)}
              >
                Add+
              </button>
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-25 rounded-lg"
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
