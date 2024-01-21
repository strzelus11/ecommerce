"use client";

import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import ProductDiv from "@/components/ProductDiv";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import Footer from "@/components/Footer";
import Filters from "@/components/Filters";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filters, setFilters] = useState({
		gender: "",
		minPrice: 0,
		maxPrice: 10000,
	});

	const fetchProducts = async () => {
		try {
			const response = await axios.get(`http://127.0.0.1:8000/products/`);
			setProducts(response.data.results);
			// console.log("Products loaded:", response.data.results);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const searchProducts = async () => {
		try {
			const response = await axios.get(
				`http://127.0.0.1:8000/products/?search=${searchQuery}`
			);
			setProducts(response.data.results);
			// console.log("Search results:", response.data.results);
		} catch (error) {
			console.error("Error searching products:", error);
		}
	};

    const filterProducts = async (filters) => {
        try {
			const response = await axios.get(
				`http://127.0.0.1:8000/products/?gender=${filters.gender}&min_price=${filters.minPrice}&max_price=${filters.maxPrice}`
			);
			setProducts(response.data.results);
			console.log("Filter results:", response.data.results);
		} catch (error) {
			console.error("Error filtering products:", error);
		}
	};

	const handleFilterChange = (filters) => {
        setFilters(filters);
        filterProducts(filters);
    };
    

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleSearch = async (value) => {
		// Check if value is defined and is a string
		if (typeof value === "string") {
			setSearchQuery(value);

			if (value.trim() !== "") {
				await new Promise((resolve) => setTimeout(resolve, 300));
				searchProducts();
			} else {
				fetchProducts();
			}
		} else {
			// Handle the case where value is not a string
			console.error("Invalid search value:", value);
		}
	};

	return (
		<AnimatePresence>
			<div>
				<div className="mx-[150px]">
					<div className="flex justify-center items-start gap-x-[50px]">
						<motion.div
							variants={fadeIn("down", "spring", 0, 1)}
							initial="hidden"
							whileInView="show"
							className="div-color w-[400px] rounded-md p-4"
						>
							<FaFilter className="text-[#092635]" />
							<Filters onFilterChange={handleFilterChange} />
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
							<div className="flex flex-col gap-y-3 text-center">
								{products && products.length > 0 ? (
									products.map((product, index) => (
										<motion.div
											key={index}
											variants={fadeIn("down", "spring", 0.25 + 0.2 * index, 1)}
											initial="hidden"
											whileInView="show"
										>
											<ProductDiv product={product} />
										</motion.div>
									))
								) : (
									<div className="text-white text-lg font-semibold">
										No products available
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</AnimatePresence>
	);
}
