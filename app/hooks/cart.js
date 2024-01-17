"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

// Create a context
const CartContext = createContext();

// Define the initial state and the reducer function
const initialState = {
	cart: [],
	total: 0,
};

const calculateTotal = (cart) => {
	return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartReducer = (state, action) => {
    console.log("Reducer called with action:", action);
	switch (action.type) {
		case "ADD":
			const existingItemIndex = state.cart.findIndex(
				(item) => item.id === action.payload.id
			);

			if (existingItemIndex !== -1) {
				const updatedCart = state.cart.map((item, index) =>
					index === existingItemIndex
						? { ...item, quantity: Math.max(1, item.quantity + 1) }
						: item
				);

				return {
					...state,
					cart: updatedCart,
					total: calculateTotal(updatedCart),
				};
			} else {
				return {
					...state,
					cart: [...state.cart, { ...action.payload, quantity: 1 }],
					total: state.total + parseFloat(action.payload.price),
				};
			}

		case "REMOVE":
			const updatedCart = state.cart.map((item) =>
				item.id === action.payload.id
					? { ...item, quantity: Math.max(1, item.quantity - 1) }
					: item
			);

			return {
				...state,
				cart: updatedCart.filter((item) => item.quantity > 0),
				total: calculateTotal(updatedCart),
			};

		case "LOAD_CART":
			return {
				...state,
				cart: action.payload,
				total: calculateTotal(action.payload),
			};

		case "DELETE":
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload.id),
				total: calculateTotal(
					state.cart.filter((item) => item.id !== action.payload.id)
				),
			};

		default:
			return state;
	}
};

// Create a provider component
const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// Read from local storage when the component mounts
	useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        console.log(storedCart)
		try {
			const parsedCart = JSON.parse(storedCart);
			dispatch({ type: "LOAD_CART", payload: parsedCart });
		} catch (error) {
			console.error("Error parsing stored cart:", error);
		}
	}, []);

	// Save to local storage whenever the cart state changes
    useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	return (
		<CartContext.Provider value={{ ...state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

// Create a custom hook to use the context
const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export { CartProvider, useCart };
