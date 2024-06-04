const accessName = 'user-access'

export function setAccess(access){
  localStorage.setItem(accessName, access)
}

export function getAccess(){
  return localStorage.getItem(accessName)
}

export function removeAccess(){
  localStorage.removeItem(accessName)
}

export function isLoggedIn(){
  const access = getAccess()
  console.log(access)
  if (!access) return false
  // Decode the token, to extract information from the payload
  const payloadStr = access.split('.')[1] // extract this middle string from the token (still base64 encoded)
  const payloadObj = JSON.parse(atob(payloadStr)) // decode the b64 string using atob, then convert the JSON string it returns to an object

  // Check the expiry date is valid (in the future)
  // If exp is bigger than now, it is in the future and valid
  if (payloadObj.exp > Date.now() / 1000) {
    return true
  } else {
    return false
  }

}