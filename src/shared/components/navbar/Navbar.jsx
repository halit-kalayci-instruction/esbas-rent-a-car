//functional
//class
//react hook

import React, {useContext, useEffect, useState} from "react";
import {Menubar} from "primereact/menubar";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeItem} from "../../../core/utils/localStorage";
import {Logout} from "../../../store/actions/authActions";
import {AuthContext} from "../../contexts/AuthContext";
import {useTranslation} from "react-i18next";
import {ROLES} from "../../constants/claimConstants";
import {userHasRole} from "../../utils/auth-status/AuthStatus";
import {NAVBAR_TYPES} from "../../../enviroment";

export default function Navbar() {
	const authContext = useContext(AuthContext);
	const dispatch = useDispatch();
	const {t, i18n} = useTranslation();

	// const menuItems = [
	// 	{
	// 		label: t("Homepage"),
	// 		icon: "pi pi-home",
	// 		command: () => {
	// 			navigate("/homepage");
	// 		},
	// 	},
	// 	{
	// 		label: t("login"),
	// 		icon: "pi pi-sign-in",
	// 		visible: !authContext.authInformation.authenticated,
	// 		command: () => {
	// 			navigate("/login");
	// 		},
	// 	},
	// 	{
	// 		label: t("register"),
	// 		icon: "pi pi-user-plus",
	// 		visible: !authContext.authInformation.authenticated,
	// 		command: () => {},
	// 	},
	// 	{
	// 		label: t("admin.dashboard"),
	// 		icon: "pi pi-shield",
	// 		visible: userHasRole(["Admin", "Cars.Create", "Cars.Update"]),
	// 		items: [
	// 			{
	// 				label: t("car.panel"),
	// 				visible: userHasRole([
	// 					"Admin",
	// 					"Cars.Create",
	// 					"Cars.Update",
	// 					"Cars.Delete",
	// 				]),
	// 				icon: "pi pi-car",
	// 				command: () => {
	// 					navigate("/car/list");
	// 				},
	// 			},
	// {
	// 	label: t("brand.panel"),
	// 	visible: userHasRole([
	// 		"Admin",
	// 		"Brands.Create",
	// 		"Brands.Update",
	// 		"Brands.Delete",
	// 	]),
	// 	icon: "pi pi-bookmark",
	// 	command: () => {
	// 		navigate("/brand/list");
	// 	},
	// },
	// 		],
	// 	},
	// 	{
	// 		label: t("logout"),
	// 		icon: "pi pi-user-minus",
	// 		visible: authContext.authInformation.authenticated,
	// 		command: () => {
	// 			// localstorage temizlemek
	// 			// reduxdaki state'i düzenlemek
	// 			// login page redirect UX
	// 			handleLogout();
	// 		},
	// 	},
	// {
	// 	label: i18n.resolvedLanguage == "en" ? "English" : "Türkçe",
	// 	icon: "pi pi-language",
	// 	items: [
	// 		{
	// 			label: "Türkçe",
	// 			icon: "",
	// 			command: () => {
	// 				i18n.changeLanguage("tr");
	// 			},
	// 		},
	// 		{
	// 			label: "English",
	// 			icon: "",
	// 			command: () => {
	// 				i18n.changeLanguage("en");
	// 			},
	// 		},
	// 	],
	// },
	// ];
	const [menu, setMenu] = useState([]);

	const handleLogout = () => {
		removeItem("token");
		dispatch(Logout());
		navigate("/login");
	};
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
		console.log(authContext);
	}, [pathname]);

	useEffect(() => {
		fetchMenuItems();
	}, [authContext]);

	useEffect(() => {
		if (menu.length > 0 && menu.find(m => m.translator == true) == null) {
			setMenu([
				...menu,
				{
					label: i18n.resolvedLanguage == "en" ? "English" : "Türkçe",
					icon: "pi pi-language",
					translator: true,
					items: [
						{
							label: "Türkçe",
							icon: "",
							command: () => {
								i18n.changeLanguage("tr");
							},
						},
						{
							label: "English",
							icon: "",
							command: () => {
								i18n.changeLanguage("en");
							},
						},
					],
				},
			]);
		}
	}, [menu]);

	useEffect(() => {
		fetchMenuItems();
	}, [i18n.resolvedLanguage]);

	const getVisibleStatus = item => {
		let isAuthenticated = authContext.authInformation.authenticated;
		if (isAuthenticated && !item.showAuth) return false;
		if (item.authOnly && !isAuthenticated) return false;
		if (
			item.authOnly &&
			item.roles.length > 0 &&
			!authContext.hasPermission(item.roles)
		)
			return false;
		return true;
	};

	const mapMenuItem = menuItem => {
		return {
			...menuItem,
			label: t(menuItem.label),
			command: () => {
				if (menuItem.type == NAVBAR_TYPES.URL) navigate(menuItem.navigateTo);
				if (menuItem.type == NAVBAR_TYPES.LOGOUT) handleLogout();
			},
			visible: getVisibleStatus(menuItem),
			items: menuItem.items?.map(subItem => {
				return mapMenuItem(subItem);
			}),
		};
	};

	const fetchMenuItems = () => {
		// Menüyü dinamikleştirme
		// AXIOS
		// FETCH

		// Front-side cache
		//TODO: Backend service
		fetch("data/menu.json")
			.then(response => response.json())
			.then(json => {
				setMenu(
					json.map(menuItem => {
						return mapMenuItem(menuItem);
					}),
				);
			});
	};

	return <div>{showNavbar && <Menubar model={menu} />}</div>;
}
