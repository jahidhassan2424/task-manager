import { createContext, useState } from "react";

const CartContext = createContext();


// This context will return the button (Add task) 
export function CartProvider({ children }) {
    const [showRightSideBar, setShowRightSideBar] = useState(false);
    return (
        <CartContext.Provider value={{ showRightSideBar, setShowRightSideBar }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;