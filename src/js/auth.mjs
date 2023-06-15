import { loginRequest } from './externalServices.mjs';
import { alertMessage, getLocalStorage, setLocalStorage } from './utils.mjs';
import jwtDecode from 'jwt-decode';


export async function login(creds, redirect = '/') {
    try {
        const token = await loginRequest(creds);
        setLocalStorage('so-token', token);
        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message)
    }
}

export function checkLogin() {
    const token = getLocalStorage('so-token');
    if (isTokenValid(token)) {
        return token;
    } else {
        localStorage.removeItem('so-token');
        window.location = '/login/index.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
}

function isTokenValid(token) {
    if (token) {
        const decode = jwtDecode(token);
        const currentDate = new Date();
        if (decode.exp * 1000 < currentDate.getTime()) {
            console.log('Token Expired.');
            return false;
        } else {
            console.log('Valid token.');
            return true;
        }
    } else {
        return false;
    }
}