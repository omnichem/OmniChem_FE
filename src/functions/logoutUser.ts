import { http } from "../const/http"

export const logoutUser = async () => {  
  console.log(localStorage.getItem('token'))
  try {
    await http
    .post('/API/v1/commerce/auth/token/logout/', {}, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    .then(()=> {
      localStorage.removeItem('token');
      console.log(localStorage.getItem('token'))
    })
    .catch(function (error) {
      console.log(error);
    });
  } catch (error) {
    return error
  }
}