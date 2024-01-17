"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "@/utils/motion";
import { FaShoppingCart } from "react-icons/fa";
import Footer from "@/app/components/Footer";
// import { useCart } from "@/app/hooks/cart";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart.slice";

const Cart = ({ params }) => {
	const { productId } = params;

	const [product, setProduct] = useState({});
	const [selectedImage, setSelectedImage] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

	const fetchProduct = () => {
		axios
			.get(`http://127.0.0.1:8000/products/${productId}/`)
			.then((response) => {
				setProduct(response.data);
				console.log("Product loaded:", response.data);
				if (
					response.data.product_images &&
					response.data.product_images.length > 0
				) {
					setSelectedImage(response.data.product_images[0].image);
				}
			})
			.catch((error) => {
				console.error("Error fetching product:", error);
			});
	};

	useEffect(() => {
		fetchProduct();
	}, [productId]);

	const handleImageClick = (image) => {
		setSelectedImage(image.image);
	};

	const isSelectedImage = (image) => {
		return image.image === selectedImage;
	};

	// const { cart, total, dispatch } = useCart();

	// const addToCart = (item) => {
	// 	dispatch({ type: "ADD", payload: item });
	// 	router.push("/cart");
	// };

	return (
		<AnimatePresence>
			<div>
				<div className="flex justify-center">
					<motion.div
						variants={fadeIn("down", "spring", 0, 1)}
						initial="hidden"
						whileInView="show"
						className="div-color rounded-md p-3 w-[75%]"
					>
						<div className="flex gap-x-[100px]">
							<div className="flex flex-col w-[300px] gap-y-5">
								<div className="aspect-square">
									<img
										className="rounded-md aspect-square object-cover"
										src={selectedImage}
										alt=""
									/>
								</div>
								<div className="grid grid-cols-3 gap-y-1 gap-x-1">
									{product.product_images?.length > 1 &&
										product.product_images?.map((image, index) => (
											<div
												key={index}
												className={`w-full aspect-square border-4 rounded-xl ${
													isSelectedImage(image) ? "border-secondary" : ""
												}`}
												onClick={() => handleImageClick(image)}
											>
												<img
													className="rounded-md aspect-square object-cover cursor-pointer"
													src={image.image}
													alt=""
												/>
											</div>
										))}
								</div>
							</div>
							<div className="flex flex-col items-start">
								<h1 className="font-bold text-3xl mb-5">{product.title}</h1>
								<p>{product.description}</p>
								<p className="font-bold text-5xl py-3">${product.price}</p>
								<div className="flex m-1 gap-x-1">
									{product.colors?.map((color, index) => (
										<div
											key={index}
											className={`rounded-full w-5 h-5 cursor-pointer border-2 border-secondary transition hover:scale-110`}
											style={{ backgroundColor: color.value }}
										></div>
									))}
								</div>
								<motion.button
									variants={slideIn("left", "spring", 0.5, 1)}
									initial="hidden"
									whileInView="show"
									whileHover={{ scale: 1.1, color: "hsl(157, 17%, 44%)" }}
									whileTap={{ scale: 0.9 }}
									className="bg-primary text-lg font-semibold text-white px-5 py-2 rounded-xl my-5 flex gap-x-3 items-center"
									onClick={() => dispatch(addToCart(product))}
								>
									<FaShoppingCart />
									Add to Cart
								</motion.button>
							</div>
						</div>
					</motion.div>
				</div>
				<Footer />
			</div>
		</AnimatePresence>
	);
};

export default Cart;
