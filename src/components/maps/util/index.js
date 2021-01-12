export const CALL_GET_API = async (userToken, apiURL) => {
  console.log(userToken)
  const response = await fetch(apiURL, {
    method: 'GET', 
    headers: {
      'source': 'mobile', 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + userToken, 
    }
  });

  const myJSON = await response.json(); 
  console.log(myJSON.data.features)
  let responseFeatures = myJSON.data.features
  if (Array.isArray(responseFeatures)) {
    responseFeatures.forEach(resp => {
      resp
    });
  }
  // console.log(myJSON)
}