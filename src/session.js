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

export const toSuccess = (navigation) => {
	navigation.navigate('Success');
};

export const toOrderScreen = (navigation) => {
	navigation.navigate('Place_Order');
};

export const toBecomeVendor = (navigation) => {
	navigation.navigate('Become a Vendor')
}