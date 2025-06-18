import { createSlice,current } from '@reduxjs/toolkit'
const cartslice=createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
       addItem: (state,action)=>{
       const newItem = action.payload;
       const existingItem = state.items.find(item => item.card.info.id === newItem.card.info.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.items.push({ ...newItem, quantity: 1 });
    }

 
        },
       removeItem: (state, action) => {
  const itemToRemove = action.payload;
  const existingItemIndex = state.items.findIndex(
    (item) => item.card.info.id === itemToRemove.card.info.id
  );

  if (existingItemIndex !== -1) {
    const existingItem = state.items[existingItemIndex];

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      // Remove the item entirely
      state.items.splice(existingItemIndex, 1);
    }
  }
},

        clearCart:(state,action)=>{
            return { items: [] }; 
                },
        },
    }
);
export const {addItem,removeItem,clearCart}=cartslice.actions;
export default cartslice.reducer;