"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:8000";

const UserContext = createContext();

export const useUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const router = useRouter();

	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;

	const fetchUser = async (token) => {
		try {
			const response = await axios.get(`${API_URL}/user/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			console.error("Failed to fetch user data:", error);
			throw new Error("Failed to fetch user data");
		}
	};

	const login = async (username, password) => {
		try {
			const response = await axios.post(`${API_URL}/token/`, {
				username,
				password,
			});

			const { access, refresh } = response.data;

			localStorage.setItem("token", access);
			localStorage.setItem("refresh", refresh);

			// Fetch user data after successful login
			const userData = await fetchUser(access);
			setUser(userData);
			console.log(user);
			router.push("/");
			toast.success(`Hello ${userData.username}`);
		} catch (error) {
			console.error("Login failed:", error);
			toast.error("Check your credentials");
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		toast.success("Logged out");
	};

	// Fetch user data on component mount
	useEffect(() => {
		if (token) {
			fetchUser(token)
				.then((userData) => {
					setUser(userData);
				})
				.catch((error) => {
					console.error("Failed to fetch user data on mount:", error);
				});
		}
	}, [token]);

	const contextValue = {
		user,
		login,
		logout,
	};

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};
