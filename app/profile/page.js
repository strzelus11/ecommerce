"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "../hooks/auth";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import Link from "next/link";

const ProfilePage = () => {
	const { user, login, logout } = useUser();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [changePassword, setChangePassword] = useState(false);

	useEffect(() => {
		if (user) {
			setUsername(user.username || "");
			setEmail(user.email || "");
		}
	}, [user]);

	const handlePassword = async (value) => {
		setPassword(value);
		if (password === user.password) {
			setChangePassword(true);
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				variants={fadeIn("down", "spring", 0, 1)}
				initial="hidden"
				whileInView="show"
				className="flex justify-center items-center full-screen"
			>
				<div className="div-color p-8 rounded-lg shadow-md w-96">
					<div className="mb-4">
						<label
							className="block text-accent text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<motion.input
							whileTap={{ scale: 0.95 }}
							className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-accent text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<motion.input
							whileTap={{ scale: 0.95 }}
							className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
							id="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-accent text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<motion.input
							whileTap={{ scale: 0.95 }}
							className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
							id="password"
							placeholder="Type your old password"
							type="password"
							value={password}
							onChange={(e) => {
								handlePassword(e.target.value);
							}}
						/>
					</div>
					{changePassword && (
						<div className="mb-6">
							<label
								className="block text-accent text-sm font-bold mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<motion.input
								whileTap={{ scale: 0.95 }}
								className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
								id="password"
								placeholder="Type your old password"
								type="password"
								value={password}
								onChange={(e) => handlePassword(e.target.value)}
							/>
						</div>
					)}
					<motion.button
						whileHover={{ scale: 1.1, color: "hsl(157, 17%, 44%)" }}
						whileTap={{ scale: 0.9 }}
						className="bg-accent w-full transition text-white font-bold py-2 px-4 rounded-lg"
						onClick={() => login(username, password)}
					>
						Save
					</motion.button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ProfilePage;
