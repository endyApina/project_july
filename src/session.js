export const toHome = (navigation) => {
	navigation.reset({
		index: 0,
		routes: [{ name: 'Landing' }],
	});
};

export const toStationDetails = (navigation) => {
	navigation.navigate('Create Order');
};

export const toConfirmRequest = (navigation) => {
	navigation.navigate('Confirm Request');
};