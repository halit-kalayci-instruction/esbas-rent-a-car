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
import {useOverlay} from "../../contexts/OverlayContext";
import {GroupTreeContentService} from "../../../features/groupTreeContent/services/groupTreeContentService";

//TODO: Search menu items
export default function Navbar() {
	const authContext = useContext(AuthContext);
	const overlayContext = useOverlay();
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
		if (item.hideOnAuth && isAuthenticated) return false;
		if (!item.roles || item.roles.length <= 0)
			return !item.showOnAuth || isAuthenticated;
		if (!isAuthenticated) return false;
		return authContext.hasPermission(item.roles);
	};

	const mapMenuItem = (allMenu, menuItem) => {
		let newMenuItem = {
			label: t(menuItem.title),
			command: () => {
				if (menuItem.type == NAVBAR_TYPES.URL) navigate(menuItem.target);
				if (menuItem.type == NAVBAR_TYPES.REDIRECT)
					window.open(menuItem.navigateUrl);
				if (menuItem.type == NAVBAR_TYPES.LOGOUT) handleLogout();
			},
			icon: menuItem.imgUrl,
			visible: getVisibleStatus(menuItem),
			items: allMenu
				.sort((a, b) => a.rowOrder - b.rowOrder)
				.filter(i => i.parentId == menuItem.id)
				.map(subItem => {
					return mapMenuItem(allMenu, subItem);
				}),
		};
		if (newMenuItem.items?.length <= 0) {
			newMenuItem = {...newMenuItem, items: undefined};
		}
		return newMenuItem;
	};

	const fetchMenuItems = () => {
		let groupTreeContentService = new GroupTreeContentService();
		groupTreeContentService.getAll().then(response => {
			console.log(response.data);
			setMenu(
				response.data
					.sort((a, b) => a.rowOrder - b.rowOrder)
					.filter(i => i.parentId == 0)
					.map(menuItem => mapMenuItem(response.data, menuItem)),
			);
		});
	};

	return <div>{showNavbar && <Menubar model={menu} />}</div>;
}
