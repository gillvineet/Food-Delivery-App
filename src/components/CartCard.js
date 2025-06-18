import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import PayPalCheckoutButton from "../utils/PayPalCheckoutButton.js";
const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      item.card.info.price || item.card.info.defaultPrice || 0;
    return total + (price / 100) * item.quantity;
  }, 0);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
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
            <p className="m-2 p-2">{item.card.info.description}</p>
          </div>

          <div className="w-4/12 p-4 relative">
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-25 h-30 rounded-lg"
              alt={item.card.info.name}
            />
            <div className="absolute flex justify-between w-32 ml-8 bg-gray-400 p-3 bottom-0 rounded-lg">
              <button
                className="font-bold text-lg"
                onClick={() => handleRemoveItem(item)}
              >
                -
              </button>
              <span>{item.quantity || 0}</span>
              <button
                className="font-bold text-lg"
                onClick={() => handleAddItem(item)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

{cartItems.length > 0 && (
  <div className="p-4 border-t mt-4">
    <h2 className="text-lg font-semibold">Total: ₹{totalPrice.toFixed(2)}</h2>
    <p className="text-sm text-gray-600 mb-2">Paying in USD via PayPal</p>
    <PayPalCheckoutButton total={(totalPrice / 83).toFixed(2)} />
  </div>
)}
    </div>
  );
};

export default ItemList;
