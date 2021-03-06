export const toHome = (navigation) => {
	navigation.reset({
		index: 0,
		routes: [{ name: 'Landing' }],
	});
};

export const toStationDetails = (navigation) => {
	navigation.navigate('Create Order');
};

export const toCancelOrder = (navigation) => {
	navigation.navigate('Cancel Order');
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
};

export const toPayments = (navigation) => {
	navigation.navigate('Payments')
};

export const toAddCard = (navigation) => {
	navigation.navigate('Add Card')
};

export const toGasOrderType = (navigation) => {
	navigation.navigate('GasOrderType')
};

export const toCreateOrder = (navigation) => {
	navigation.navigate('Create Order');
};

export const toOTP = (navigation) => {
	navigation.reset({
		index: 0,
		routes: [{ name: 'otp' }]
	})
}

export const toNotification = (navigation) => {
	navigation.navigate('Notifications')
}

export const toOrders = (navigation) => {
	navigation.navigate('Orders')
}

export const toLogin = (navigation) => {
	navigation.reset({
		index: 0,
		routes: [{ name: 'Login' }]
	})
}