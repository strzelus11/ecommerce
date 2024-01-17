"use client";

import React, { useState } from "react";
import { useUser } from "../hooks/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import Link from "next/link";

const LoginPage = () => {
	const { user, login, logout } = useUser();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

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
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="w-full flex flex-col justify-center">
						<motion.button
							whileHover={{ scale: 1.1, color: "hsl(157, 17%, 44%)" }}
							whileTap={{ scale: 0.9 }}
							className="bg-accent w-full transition text-white font-bold py-2 px-4 rounded-lg"
							onClick={() => login(username, password)}
						>
							Login
						</motion.button>
						<p className="mt-3 text-center">
							Don't have an account yet? Register
							<Link href={"/register"}>
								<span className="underline ml-1">here</span>
							</Link>
						</p>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default LoginPage;
