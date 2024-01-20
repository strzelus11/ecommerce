"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@/hooks/auth";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import Link from "next/link";
import axios from "axios";

const ProfilePage = () => {
	const { user, login, logout } = useUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [username, setUsername] = useState("");
	const [changePassword, setChangePassword] = useState(false);

	useEffect(() => {
		if (user) {
			setEmail(user.email || "");
			setUsername(user.username || "");
		}
	}, [user]);

	const handlePasswordCheck = async () => {
		try {
			const response = await axios.post("http://localhost:8000/token/", {
				username,
				password,
			});

			setChangePassword(true);
			console.log("Success");
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const handleSave = async () => {
		try {
			const response = await axios.post("http://localhost:8000/token/", {
				username,
				password,
			});

			setChangePassword(true);
			console.log("Success");
		} catch (error) {
			console.error("Login failed:", error);
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
							readOnly
							className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight"
							id="username"
							type="text"
							value={user ? user.username : ""}
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
					{!changePassword ? (
						<div className="mb-6">
							<label
								className="block text-accent text-sm font-bold mb-2"
								htmlFor="password"
							>
								Old Password
							</label>
							<motion.input
								whileTap={{ scale: 0.95 }}
								className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
								id="password"
								placeholder="Type your old password"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
					) : (
						<div className="mb-6">
							<label
								className="block text-accent text-sm font-bold mb-2"
								htmlFor="password2"
							>
								Password
							</label>
							<motion.input
								whileTap={{ scale: 0.95 }}
								className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
								id="password2"
								placeholder="Type your new password"
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</div>
					)}
					{changePassword ? (
						<motion.button
							whileHover={{ scale: 1.1, color: "hsl(157, 17%, 44%)" }}
							whileTap={{ scale: 0.9 }}
							className="bg-accent w-full transition text-white font-bold py-2 px-4 rounded-lg"
							onClick={() => login(username, password)}
						>
							Save
						</motion.button>
					) : (
						<motion.button
							whileHover={{ scale: 1.1, color: "hsl(157, 17%, 44%)" }}
							whileTap={{ scale: 0.9 }}
							className="bg-accent w-full transition text-white font-bold py-2 px-4 rounded-lg"
							onClick={handlePasswordCheck}
						>
							Check your password
						</motion.button>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ProfilePage;
