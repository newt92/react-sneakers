import AppContext from "../context"; 
import React from 'react'
export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);// logic summ of price/ 0 - default

    return {cartItems, setCartItems, totalPrice};
};

