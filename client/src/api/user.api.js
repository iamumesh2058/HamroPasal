export const register = (username, email, password) => {
    const user = { username, email, password };
    return fetch("api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


export const login = (email, password) => {
    const user = { email, password };
    console.log(user);
    return fetch("api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

