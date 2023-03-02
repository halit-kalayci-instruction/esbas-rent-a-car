//functional
//class
//react hook

import React, {useEffect, useState} from "react";
import {Menubar} from "primereact/menubar";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Navbar() {
	const authState = useSelector(state => state.auth);

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
			visible: !authState.authenticated,
			command: () => {
				navigate("/login");
			},
		},
		{
			label: "Kayıt Ol",
			icon: "pi pi-user-plus",
			visible: !authState.authenticated,
			command: () => {},
		},
		{
			label: "Çıkış Yap",
			icon: "pi pi-user-minus",
			visible: authState.authenticated,
			command: () => {},
		},
	];
	const navigate = useNavigate();
	const {pathname} = useLocation();
	const hideNavbarRoutes = ["/login", "/register"];
	const [showNavbar, setShowNavbar] = useState(true);
	// SINGLE PAGE APPLICATION

	// 1. Bu component render edildiğinde
	// 2. dependency listesindeki değişkenler izleniyo.
	useEffect(() => {
		let showNavbar = !hideNavbarRoutes.includes(pathname);
		setShowNavbar(showNavbar);
	}, [pathname]);

	return <div>{showNavbar && <Menubar model={menuItems} />}</div>;
}
