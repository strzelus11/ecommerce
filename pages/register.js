"use client";

import React, { useState } from "react";
import { useUser } from "../hooks/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../utils/motion";
import Link from "next/link";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
	const { user, loading, error, login, logout } = useUser();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const router = useRouter();

	const handleRegister = async () => {
		try {
			const response = await axios.post("http://localhost:8000/register/", {
				username,
				email,
				password,
				password2,
			});
            router.push("/login");
            toast.success("You've successfully registered!")
		} catch (error) {
			if (error.response) {
				console.error(
					"Registration failed with status code:",
					error.response.status
				);
				const errorMessage = error.response.data;

				if (errorMessage) {
					if (errorMessage.username) {
						toast.error(errorMessage.username[0]);
					} else {
						toast.error(errorMessage.error);
					}
				}
				// toast.error(error.response.data.error);
				console.error("Error response data:", error.response.data);
			} else if (error.request) {
				console.error("No response received from the server");
			} else {
				console.error("Error while setting up the request:", error.message);
			}
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
					{loading && <p>Loading...</p>}
					{error && <p className="text-red-500">Error: {error}</p>}
					{user ? (
						<div className="">
							<p className="text-green-500">Welcome, {user.username}!</p>
							<button onClick={() => logout()}>Logout</button>
						</div>
					) : (
						<>
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
									htmlFor="username"
								>
									Email
								</label>
								<motion.input
									whileTap={{ scale: 0.95 }}
									className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
									id="email"
									type="email"
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
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<label
									className="block text-accent text-sm font-bold mb-2"
									htmlFor="password"
								>
									Confirm password
								</label>
								<motion.input
									whileTap={{ scale: 0.95 }}
									className="appearance-none outline-none border-2 border-secondary rounded-lg w-full py-2 px-3 text-accent leading-tight focus:border-secondary focus:shadow-lg focus:shadow-secondary"
									id="password2"
									type="password"
									value={password2}
									onChange={(e) => setPassword2(e.target.value)}
								/>
							</div>
							<div className="w-full flex flex-col justify-center">
								<motion.button
									whileHover={{ scale: 1.1, color: "hsl(157, 17%, 44%)" }}
									whileTap={{ scale: 0.9 }}
									className="bg-accent w-full transition text-white font-bold py-2 px-4 rounded-lg"
									onClick={handleRegister}
								>
									Register
								</motion.button>
								<p className="mt-3 text-center">
									Already have an account? Login
									<Link href={"/login"}>
										<span className="underline ml-1">here</span>
									</Link>
								</p>
							</div>
						</>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default RegisterPage;
