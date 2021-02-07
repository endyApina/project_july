export function* emailSignUp(signUpData, REG_API) {
    var responseBody;

    yield fetch(REG_API, {
        method: 'POST', 
        headers: {
            'source': 'mobile', 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(signUpData)
    })
    .then((response) => response.json())
    .then(data => {
        responseBody = data
        return data
    }).catch(error => {
        responseBody = error
    })
    return responseBody
}

export function* CALL_POST_API(postData, LOGIN_API) {
    var responseBody;

    yield fetch(LOGIN_API, {
        method: 'POST', 
        headers: {
            'source': 'mobile', 
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(postData)
    })
    .then((response) => {
        response.json()
    })
    .then(data => {
        console.log(data)
        responseBody = data
        return data
    }).catch(error => {
        console.log(error)
        throw error
    })

    return responseBody
}

export const registration = async (payload) => {
    alert(JSON.stringify(payload))
    return 
}

export const getCurrentUser = (tokenString) => {
    console.log("Get User")
    return tokenString
}