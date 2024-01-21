"use client";

import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoMale } from "react-icons/io5";
import { IoFemale } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const ProductDiv = ({ product }) => {
    const [liked, setLiked] = useState(false);
    
    const likeProduct = async (productId) => {
  const response = await fetch(`/api/products/${productId}/like/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`, // Include the user's access token
    },
  });

  if (response.ok) {
    // Handle success, e.g., update UI
    console.log('Product liked successfully');
  } else {
    // Handle error, e.g., show an error message
    console.error('Failed to like the product');
  }
};

	const image =
		product.product_images && product.product_images.length > 0
			? product.product_images[0].image
			: null;

	return (
		<div className="div-color h-[150px] rounded-md p-2 flex gap-x-5 hover:scale-105 transition">
			<div className="max-h-full aspect-square">
				<Link href={`/products/${product.id}`}>
					<img
						className="rounded-md aspect-square object-cover cursor-pointer"
						src={image}
						alt=""
					/>
				</Link>
			</div>
			<div className="flex justify-between w-full">
				<div className="flex flex-col items-start mt-2">
					<Link href={`/products/${product.id}`}>
						<h1 className="transition hover:underline cursor-pointer">{product.title}</h1>
					</Link>
					<div className="text-lg font-semibold">${product.price}</div>
					{/* <div className="text-[12px] rounded-full header text-white py-1 px-2">
						Free delivery
					</div> */}
					{product.gender === "M" ? (
						<div className="mt-1 p-1 rounded-full bg-white border-2 border-blue-700">
							<IoMale className="w-5 h-5 text-blue-700" />
						</div>
					) : (
						<div className="mt-1 p-1 rounded-full bg-white border-2 border-pink-400">
							<IoFemale className="w-5 h-5 text-pink-400" />
						</div>
					)}
				</div>
				<div className="flex items-end m-3 gap-x-1">
					{product.colors.map((color, index) => (
						<div
							key={index}
							className={`rounded-full w-5 h-5 cursor-pointer border-2 border-primary transition hover:scale-110`}
							style={{ backgroundColor: color.value }}
						></div>
					))}
				</div>
				<div className="flex flex-col justify-between items-end">
					<div
						className="rounded-full hover:text-red-900 hover:scale-110 p-2 transition text-red-700"
						onClick={() => setLiked(!liked)}
					>
						{liked ? (
							<FaHeart className="w-6 h-6 cursor-pointer" />
						) : (
							<FaRegHeart className="w-6 h-6 cursor-pointer" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDiv;
