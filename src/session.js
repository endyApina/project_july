// export const toLogin = (navigation) => {
// 	navigation.closeDrawer();
// 	navigation.reset({
// 		index: 0,
// 		routes: [{ name: 'Login' }],
// 	});
// };

export const toHome = (navigation) => {
	navigation.reset({
		index: 0,
		routes: [{ name: 'Landing' }],
	});
};

export const toStationDetails = (navigation) => {
	navigation.navigate('Station');
};

// export const navigateHome = (navigation) => {
// 	navigation.navigate('Home');
// };