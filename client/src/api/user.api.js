export const register = (username, email, password) => {
    let user = { username, email, password };
    return fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch((error) => console.log(error))
}


export const verifyEmail = (token) => {
    return fetch(`/api/auth/verifyemail/${token}`)
        .then(res => res.json())
        .catch((err) => console.log(err))
}

export const authenticate = (userInfo) => {
    return localStorage.setItem('jwt', JSON.stringify(userInfo))
}

export const isAuthenticated = () => {
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false
    }
}


export const login = (email, password) => {
    const user = { email, password };
    return fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch((error) => console.log(error))
}


export const forgotPassword = (email) => {
    const user = { email };
    return fetch("/api/auth/forgetpassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch((error) => console.log(error))
}


export const resetPassword = (password, token) => {
    const user = { password };
    return fetch(`/api/auth/resetpassword/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch((error) => console.log(error))
}


export const getAllUser = () => {
    return fetch("/api/user/getalluser")
        .then(res => res.json())
        .catch(err => console.log(err))
}