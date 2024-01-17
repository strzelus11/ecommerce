"use client";

import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const ProductDiv = ({ product }) => {
	const [liked, setLiked] = useState(false);

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
						<h1 className="hover:underline cursor-pointer">{product.title}</h1>
					</Link>
					<div className="text-lg font-semibold">${product.price}</div>
					<div className="text-[12px] rounded-full header text-white py-1 px-2">
						Free delivery
					</div>
				</div>
				<div className="flex items-end m-1 gap-x-1">
					{product.colors.map((color, index) => (
						<div
							key={index}
							className={`rounded-full w-5 h-5 cursor-pointer border-2 border-secondary transition hover:scale-110`}
							style={{ backgroundColor: color.value }}
						></div>
					))}
				</div>
				<div className="flex flex-col justify-between items-end">
					<div
						className="rounded-full p-1 hover:bg-secondary hover:scale-110 transition"
						onClick={() => setLiked(!liked)}
					>
						{liked ? (
							<FaHeart className="w-5 h-5 cursor-pointer" />
						) : (
							<FaRegHeart className="w-5 h-5 cursor-pointer" />
						)}
					</div>
					<p className="text-sm">470 people bought this</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDiv;
