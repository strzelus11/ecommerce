"use client";

import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import ProductDiv from "@/components/ProductDiv";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { useRouter } from "next/router";

const Categories = ({ params }) => {
	const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

	const name = router.query.name;

	const fetchProducts = async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/products/?category=${name}`
			);
			setProducts(response.data.results);
			console.log("Products loaded:", response.data.results);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const searchProducts = async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/products/?category=${name}&search=${searchQuery}`
			);
			setProducts(response.data.results);
			console.log("Search results:", response.data.results);
		} catch (error) {
			console.error("Error searching products:", error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleSearch = async (value) => {
		setSearchQuery(value);

		if (value.trim() !== "") {
			await new Promise((resolve) => setTimeout(resolve, 300));
			searchProducts();
		} else {
			fetchProducts();
		}
	};

	const staggerChild = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	};

	return (
		<AnimatePresence>
			<div className="mx-[150px]">
				<div className="flex justify-center gap-x-[50px]">
					<motion.div
						variants={fadeIn("down", "spring", 0, 1)}
						initial="hidden"
						whileInView="show"
						className="div-color h-[500px] w-[300px] rounded-md"
					>
						<div className="p-3">
							<div className="flex justify-between items-center">
								<FaFilter className="text-[#092635]" />
								Filters
							</div>
						</div>
					</motion.div>
					<div className="flex flex-col gap-y-10 w-full">
						<motion.div
							variants={fadeIn("down", "spring", 0.25, 1)}
							initial="hidden"
							whileInView="show"
							className="relative"
						>
							<input
								className="div-color w-full h-full px-2 py-3 focus:outline-none rounded-md text-[#092635]"
								value={searchQuery}
								onChange={(e) => handleSearch(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSearch();
									}
								}}
							/>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
								<div
									className="rounded-full p-2 hover:bg-secondary hover:scale-110"
									onClick={handleSearch}
								>
									<FaSearch className="text-[#092635]" />
								</div>
							</div>
						</motion.div>
						<div className="flex flex-col gap-y-3">
							{products &&
								products.map((product, index) => (
									<motion.div
										key={index}
										variants={fadeIn("down", "spring", 0.25 + 0.2 * index, 1)}
										initial="hidden"
										whileInView="show"
									>
										<ProductDiv product={product} />
									</motion.div>
								))}
						</div>
					</div>
				</div>
			</div>
		</AnimatePresence>
	);
};

export default Categories;
