export const appSettings = {
	defaultColor: 'white',
	mainColor: 'green',
	backgroundColor: 'white',
	subColor: 'black',
	additionalColor: 'grey',
	transparentColor: 'transparent',
	transparentBorder: '1px solid transparent',
	defaultInputMargin: '20px',
	defaultInputWidth: '100%',
	defaultButtonWidth: '99%',
	defaultButtonWeight: 'bold',
	defaultButtonRadius: '5px',
	defaultButtonBackgroundColor: '#0042b5', //
	buttonTextColor: 'white',
	personIcon: 'md-person',
	emailIcon: 'md-mail',
	phoneIcon: 'md-call',
	lockIcon: 'md-lock',
	inputRadius: '10px', 
	inputSpace: '10px',
	defaultInputBgColor: '#f2f2f2', 
	defaultInputPlaceholderColor: '#919090',
	defaultInputTextColor: 'black',
	boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
	sliderOneBackgroundColor: '#0a52f0',
	AppMainColor: '#ed1f27',
	AppMainColorShadow: '#e8565c',
	LoginCustomTextColor: 'black',
};

export const appModes = {
	'default': {
		defaultColor: 'white',
		mainColor: 'purple',
		subColor: 'black',
		additionalColor: 'grey'
	},
	'green': {
		defaultColor: 'white',
		mainColor: 'green',
		subColor: 'black',
		additionalColor: 'grey'
	}
 
};

export const user_role_code="2222"
export const user_role="customer"
export const vendor_role_code="3333"
export const vendor_role="vendor"

export const apiHeaders = (token) => {
	return {
		"Authorization": token, 
		"app_source": user_role
	}
}

// const API_BASE = 'http://167.99.236.194/api/v1/'
const API_BASE = 'http://localhost:8002/'
// const API_BASE = 'http://9454a32dcd81.ngrok.io/'

export const API_STRING = 'http://milky-way-api.us-east-1.elasticbeanstalk.com/api/v1/'
export const REG_API = API_BASE + 'auth/registration'
export const LOGIN_API = API_BASE + 'auth/login'
export const FORGOT_PASSWORD_API = API_BASE + 'auth/reset-password'
export const RESEND_OTP = API_BASE + 'otp/resend'
export const VEIRFY_OTP = API_BASE + 'otp/verification/'
export const GET_ALL_GAS_STATION = API_BASE + 'station/'
export const GET_STATION_BY_ID = API_BASE + 'station/'
export const OTP_PREFIX = 'Bearer '
export const CREATE_ORDER_API = API_BASE + 'order/create'

export const MAP_API_KEY = "AIzaSyC3KU80ldwIeGJaEORVcsjo41f82x5jVMI"

export const StationAsyncData = 'station_data'
export const UserAsyncData = 'user_data'
export const UserGeoDataAsyncData = 'my_geo_data'