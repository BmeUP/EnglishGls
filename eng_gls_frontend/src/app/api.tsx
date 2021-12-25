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

export default ax