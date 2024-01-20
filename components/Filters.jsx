import React, { useState } from "react";
import { motion } from "framer-motion";

const Filters = ({ onFilterChange }) => {
	const [gender, setGender] = useState("");
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(10000);

	const handleFilterChange = () => {
		onFilterChange({ gender, minPrice, maxPrice });
	};

	return (
		<div className="flex flex-col justify-between gap-y-3">
			<div className="divide-y-2 divide-secondary py-2">
				<div className="py-3">
					<label className="font-semibold">Gender</label>
					<div className="w-full flex justify-between">
						<label className="flex gap-x-2">
							<input
								className="cursor-pointer"
								type="radio"
								value=""
								checked={gender === ""}
								onChange={() => setGender("")}
							/>
							All
						</label>
						<label className="flex gap-x-2">
							<input
								className="cursor-pointer"
								type="radio"
								value="male"
								checked={gender === "male"}
								onChange={() => setGender("male")}
							/>
							Male
						</label>
						<label className="flex gap-x-2">
							<input
								className="cursor-pointer"
								type="radio"
								value="female"
								checked={gender === "female"}
								onChange={() => setGender("female")}
							/>
							Female
						</label>
					</div>
				</div>
				<div className="py-3">
					<label className="font-semibold">Price Range</label>
					<div className="price-range-input">
						<input
							className="range"
							type="range"
							min="0"
							max="10000"
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.value)}
						/>
						<input
							className="range"
							type="range"
							min="0"
							max="10000"
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-x-1 w-full border-2 border-accent bg-primary text-white rounded-xl px-2 py-1 mt-2">
						$
						<input
							className="flex-grow bg-inherit w-[50%] border-none focus:outline-none"
							type="number"
							value={minPrice}
							min={0}
							max={9999}
							onChange={(e) => setMinPrice(e.target.value)}
						/>
						$
						<input
							className="flex-grow bg-inherit w-[50%] border-none focus:outline-none"
							type="number"
							value={maxPrice}
							min={1}
							max={1000}
							onChange={(e) => setMaxPrice(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.9 }}
				className="w-full py-2 text-center border-2 border-accent bg-secondary text-white rounded-full"
				onClick={handleFilterChange}
			>
				Apply Filters
			</motion.button>
		</div>
	);
};

export default Filters;
