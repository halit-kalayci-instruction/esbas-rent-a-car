//functional
//class
//react hook

import React from "react";
import {Menubar} from "primereact/menubar";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const menuItems = [
		{
			label: "Ana Sayfa",
			icon: "pi pi-home",
			command: () => {
				navigate("/homepage");
			},
		},
		{
			label: "Giriş Yap",
			icon: "pi pi-sign-in",
			command: () => {
				navigate("/");
			},
		},
		{
			label: "Kayıt Ol",
			icon: "pi pi-user-plus",
			command: () => {},
		},
	];
	return (
		<div>
			<Menubar model={menuItems} />
		</div>
	);
}
