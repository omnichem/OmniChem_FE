import { http } from "../const/http"

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await http
    .post('/API/v1/commerce/auth/users/', {
      password: password,
      email: email,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  } catch (error) {
    return console.log(error)
  }
}