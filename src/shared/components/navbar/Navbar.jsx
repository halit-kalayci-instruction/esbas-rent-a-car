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
import {InputText} from "primereact/inputtext";
//TODO: Search menu items
export default function Navbar() {
	const authContext = useContext(AuthContext);
	const overlayContext = useOverlay();
	const dispatch = useDispatch();
	const {t, i18n} = useTranslation();
	const authState = useSelector(i => i.auth);
	const [menu, setMenu] = useState([]);
	const [filteredMenu, setFilteredMenu] = useState([]);
	let filteredMenuItems = [];

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
		return userHasRole(item.roles);
	};

	const mapMenuItem = (allMenu, menuItem) => {
		let newMenuItem = {
			id: menuItem.id,
			parentId: menuItem.parentId,
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

	const searchMenu = searchKey => {
		if (searchKey.length < 3) return;
		filteredMenuItems = [];
		filteredMenuItems.forEach(item => {
			if (item.parentId != 0) {
				let parentMenu = menu.find(i => i.id == item.parentId);
				if (
					parentMenu &&
					filteredMenuItems.find(i => i.id == parentMenu.id) == null
				)
					filteredMenuItems.push(parentMenu);
			}
		});
		setMenu(filteredMenuItems);
	};

	const filterMenu = (menuItem, searchKey) => {
		searchKey = searchKey.toLowerCase();
		let hasAnyItem = false;
		menuItem.items?.forEach(item => {
			hasAnyItem = filterMenu(item, searchKey);
		});
		let canSee =
			menuItem.label.toLowerCase().includes(searchKey) ||
			menuItem.items?.filter(i => i.label.toLowerCase().includes(searchKey))
				.length > 0 ||
			hasAnyItem;
		if (
			canSee &&
			filteredMenuItems.filter(i => i.id == menuItem.id).length <= 0
		) {
			filteredMenuItems.push(menuItem);
		}
		return canSee;
	};

	const searchTemplate = () => {
		return (
			<InputText
				type="text"
				placeholder="Search menu items.."
				onChange={e => searchMenu(e.target.value)}
			/>
		);
	};

	return (
		<div>{showNavbar && <Menubar end={searchTemplate} model={menu} />}</div>
	);
}
