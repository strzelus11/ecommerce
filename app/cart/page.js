"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "@/utils/motion";
import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from "@/app/hooks/cart";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from "@/redux/cart.slice";

const Cart = () => {
	// const { cart, total, dispatch } = useCart();

	const items = [
		{
			id: 1,
			colors: [
				{
					name: "Black",
					value: "#000000",
				},
				{
					name: "White",
					value: "#FFFFFF",
				},
				{
					name: "Red",
					value: "#FF0000",
				},
			],
			category: "Mobile Phones",
			product_images: [
				{
					image: "http://localhost:8000/media/images/iphone_NpXDRjg.webp",
				},
				{
					image: "http://localhost:8000/media/images/iphones.jpeg",
				},
			],
			title: "Iphone 13",
			description: "This is a nice phone",
			price: "699.00",
			gender: "M",
		},
		{
			id: 2,
			colors: [
				{
					name: "Black",
					value: "#000000",
				},
			],
			category: "Mobile Phones",
			product_images: [
				{
					image: "http://localhost:8000/media/images/macbook.jpeg",
				},
			],
			title: "Macbook",
			description: null,
			price: "1999.00",
			gender: "M",
		},
		{
			id: 3,
			colors: [
				{
					name: "Black",
					value: "#000000",
				},
				{
					name: "White",
					value: "#FFFFFF",
				},
			],
			category: "Headphones",
			product_images: [
				{
					image: "http://localhost:8000/media/images/airpods.jpeg",
				},
			],
			title: "AirPods Pro Max",
			description: "The best headphones out there",
			price: "499.00",
			gender: "F",
		},
		{
			id: 5,
			colors: [
				{
					name: "Black",
					value: "#000000",
				},
				{
					name: "Red",
					value: "#FF0000",
				},
			],
			category: "Watches",
			product_images: [
				{
					image: "http://localhost:8000/media/images/watch.png",
				},
			],
			title: "Apple Watch 9",
			description:
				"The Apple Watch is a smartwatch produced by Apple Inc. It incorporates fitness tracking, health-oriented capabilities, and wireless telecommunication, and integrates with watchOS and other Apple products and services.",
			price: "299.00",
			gender: "F",
		},
	];

	// const addToCart = (product) => {
	// 	dispatch({ type: "ADD", payload: product });
	// };

	// const removeFromCart = (product) => {
	// 	dispatch({ type: "REMOVE", payload: product });
	// };

	const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const getTotalPrice = () => {
			return cart.reduce(
				(accumulator, product) => accumulator + product.quantity * product.price,
				0
			);
		};

	return (
		<AnimatePresence>
			<div className="flex justify-center">
				<motion.div
					variants={fadeIn("down", "spring", 0, 1)}
					initial="hidden"
					whileInView="show"
					className="div-color rounded-md p-3 w-[50%]"
				>
					<h2 className="text-xl text-center">
						{cart.length > 0 ? "Your Cart" : "Your cart is empty"}
					</h2>
					<div className="divide-y-2 divide-secondary">
						{products.map((item) => (
							<div key={item.id} className="py-4">
								<div className="flex items-center justify-between mx-10">
									<div className="w-[80px] aspect-square mr-4">
										<img
											className="rounded-md aspect-square object-cover"
											src={
												item.product_images &&
												item.product_images.length > 0
													? item.product_images[0].image
													: null
											}
											alt=""
										/>
									</div>
									<p className="text-lg font-semibold flex-grow mr-4">
										{item.title}
									</p>
									<div className="bg-accent text-white rounded-lg flex items-center mr-[5rem]">
										<button
											onClick={() => dispatch(decrementQuantity(item.id))}
											className="p-3 transition border-4 border-accent rounded-lg hover:text-background hover:border-secondary group"
										>
											<FaMinus className="group-hover:scale-125 transition" />
										</button>
										<span className="p-3">{item.quantity || 0}</span>
										<button
											onClick={() => dispatch(incrementQuantity(item.id))}
											className="p-3 transition border-4 border-accent rounded-lg hover:text-background hover:border-secondary group"
										>
											<FaPlus className="group-hover:scale-125 transition" />
										</button>
									</div>
									<p className="w-24 mr-10">
										${parseFloat(item.price).toFixed(2)}
									</p>
									<button onClick={() => dispatch(removeFromCart(item.id))}>
										<FaTrashAlt className="w-6 h-6 hover:scale-110 hover:text-red-700 transition" />
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="m-3 px-4 py-3 bg-secondary text-white border-accent rounded-xl flex justify-between items-center">
						<p>Total: ${getTotalPrice()}</p>
						<button className="px-3 py-2 rounded-full bg-primary font-semibold flex gap-x-3 items-center transition hover:scale-110 group">
							<p>Payment</p>
							<FaShoppingCart className="group-hover:translate-x-1  transition delay-300 " />
						</button>
					</div>
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

export default Cart;
