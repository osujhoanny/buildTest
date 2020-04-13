const TOKEN_KEY = 'jwt';

export const loginApp = () => {
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logoutApp = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}