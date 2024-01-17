"use client";

import { UserProvider } from "./hooks/auth";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import RootLayout from "./layout";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				toastOptions={{
					duration: 5000,
					style: {
						background: "#deede8",
						color: "#092635",
						border: "5px solid #1b4242",
						borderRadius: "15px",
						fontSize: "20px",
						padding: "8px 32px",
					},
				}}
			/>
			<UserProvider>
				<div className="mb-[7rem]">
					<Header />
				</div>
				<Component {...pageProps} />
			</UserProvider>
		</Provider>
	);
}

export default MyApp;
