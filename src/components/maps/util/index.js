import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserData = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem('user_data')
		// console.log(jsonValue)
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch(e) {
		// error reading value
	}
}

export const startAPICall = (apiURL) => {
  var myToken = " ";
  getUserData().then(res => {
    myToken = res.accessToken
    // console.log(appToken)
    // return res.accessToken
    CALL_GET_API(apiURL, res.accessToken)
  })
}

export const CALL_GET_API = async (apiURL, myToken) => {
  // var myToken = returnToken();
  var returnArray = [];
  const response = await fetch(apiURL, {
    method: 'GET', 
    headers: {
      'source': 'mobile', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + myToken, 
    }
  });

  const myJSON = await response.json(); 
  console.log(myJSON)
  let responseFeatures = myJSON.data.features
  console.log(responseFeatures)
  if (Array.isArray(responseFeatures)) {
    responseFeatures.forEach(resp => {
      let coordinatesArray = resp.geometry.coordinates 
      returnArray.push(coordinatesArray)
    });
  } else {
    // console.log(responseFeatures)
  }
  // console.log(returnArray)
  return returnArray
}