import axios from 'axios';

function selectURL() {
  if (window.location.origin === "http://127.0.0.1:3000") {
    return "http://127.0.0.1:8000";
  } else {
    return window.location.origin;
  }
}

const ax = axios.create({
  baseURL: selectURL()
});

// ax.interceptors.response.use(function (response) {
//   // Do something with response data
//   console.info(['response elbakidze'])
//   return response;
// }, function (error) {
//   console.info(['elbakidze', error.response.data.code]);
//   if(error.response.data.code){
//     ax.post('api/token/refresh', {refresh: 'abc'}, {withCredentials: true});
//   }
// });

export default ax