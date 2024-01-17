"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@/app/hooks/auth";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { motion } from "framer-motion";

const Header = () => {
	const [categories, setCategories] = useState([]);
	const router = useRouter();

	const { user, logout } = useUser();

	const fetchCategories = async () => {
		try {
			const response = await axios.get(`http://127.0.0.1:8000/categories/`);
			setCategories(response.data.results);
			console.log("Categories loaded:", response.data.results);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);
	return (
		<div className="relative w-full">
			<div className="w-full h-[4rem] z-10 header fixed top-0 flex items-center justify-around text-white">
				<div className="flex justify-center gap-x-[100px]">
					<Link href={"/"}>
						<div className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px]">
							Products
						</div>
					</Link>
					<div className="group">
						<div className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px]">
							Categories
						</div>
						<div className="absolute header h-[100px] left-0 top-[65px] w-full p-5 rounded-b-lg hidden group-hover:block">
							<div className="flex justify-center gap-x-10 gap-y-5">
								{categories?.map((category, index) => (
									<Link key={index} href={`/categories/${category.name}`}>
										<div className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition">
											{category.name}
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px]">
						Contact
					</div>
				</div>
				<div className="flex justify-center gap-x-[100px]">
					{user ? (
						<>
							<div
								onClick={logout}
								className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px]"
							>
								Logout
							</div>
							<div className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px] relative group">
								<IoPersonCircle className="w-8 h-8" />
								<div className="header rounded-lg absolute top-[60px] hidden group-hover:flex flex-col justify-between items-center px-4 py-5 transition gap-y-5">
									<div className="text-white">{user.username}</div>
									<Link href={"/profile"}>
										<motion.button
											whileHover={{ scale: 1.1, color: "#092635" }}
											whileTap={{ scale: 0.9 }}
											className="bg-background w-full transition font-semibold text-white py-1 px-2 rounded-lg whitespace-nowrap"
										>
											Edit your profile
										</motion.button>
									</Link>
								</div>
							</div>
						</>
					) : (
						<>
							<div
								onClick={() => router.push("/login")}
								className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px]"
							>
								Login
							</div>
							<div
								onClick={() => router.push("/register")}
								className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px]"
							>
								Register
							</div>
						</>
					)}
					<div className="decoration-background underline-offset-4 cursor-pointer hover:scale-110 hover:underline hover:text-background transition flex items-center h-[60px] relative group">
						<FaShoppingCart className="w-6 h-6" />
						<div className="header rounded-lg absolute top-[60px] hidden group-hover:flex flex-col justify-between items-center px-4 py-5 transition gap-y-5">
							<div className="text-white whitespace-nowrap">
								The cart is empty
							</div>
							<Link href={"/cart"}>
								<motion.button
									whileHover={{ scale: 1.1, color: "#092635" }}
									whileTap={{ scale: 0.9 }}
									className="bg-background w-full transition font-semibold text-white py-1 px-2 rounded-lg whitespace-nowrap"
								>
									Show my cart
								</motion.button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
