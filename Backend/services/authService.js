// authService.js
const localStorage = require('local-storage');

const authService = {
    login: (username, password) => {
        const userData = { username, loggedIn: true };
        localStorage.set('user', userData);
        return userData;
    },

    logout: () => {
        localStorage.remove('user');
    },

    getUser: () => {
        return localStorage.get('user');
    }
};

module.exports = authService;
