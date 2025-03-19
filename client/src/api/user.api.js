// register
export const register = (username, email, password) => {
    const user = { username, email, password };
    return fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


// login
export const login = (email, password) => {
    const user = { email, password };
    return fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


// logout
export const logout = () => {
    return fetch("/api/auth/logout")
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


// authenticate
export const authenticate = (userInfo) => {
    return sessionStorage.setItem('jwt', JSON.stringify(userInfo))
}


// isAuthenticated
export const isAuthenticated = () => {
    if (sessionStorage.getItem('jwt')) {
        return JSON.parse(sessionStorage.getItem('jwt'));
    }
    else {
        return false
    }
}


// verify-email
export const verifyEmail = (token) => {
    return fetch(`/api/auth/verifyEmail/${token}`)
        .then((res) => res.json());
}


// forgot password
export const forgotPassword = (email) => {
    const userInfo = { email };
    return fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
        .then((res) => res.json())
}


// reset password
export const resetPassword = (password, token) => {
    const user = { password };
    return fetch(`/api/auth/resetPassword/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())

}