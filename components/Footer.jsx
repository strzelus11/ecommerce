import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="mt-[230px] w-full h-[150px] header flex flex-col justify-center items-center gap-y-5 text-white">
			<div className="flex gap-x-5">
				<div>
					<FaFacebookSquare className="w-10 h-10 transition cursor-pointer hover:text-background hover:scale-110" />
				</div>
				<div>
					<FaInstagram className="w-10 h-10 transition cursor-pointer hover:text-background hover:scale-110" />
				</div>
				<div>
					<FaSquareXTwitter className="w-10 h-10 transition cursor-pointer hover:text-background hover:scale-110" />
				</div>
				<div>
					<FaYoutube className="w-10 h-10 transition cursor-pointer hover:text-background hover:scale-110" />
				</div>
            </div>
            <div>
                Designed and developed by Jakub Strzelecki, 2024
            </div>
		</div>
	);
};

export default Footer;
