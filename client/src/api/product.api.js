export const getProductDetails = (id) => {
    return fetch(`/api/product/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export const addProduct = (product) => {
    return fetch("/api/product", {
        method: "POST",
        body: product
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export const updateProduct = (id, product) => {
    return fetch(`/api/product/${id}`, {
        method: "PUT",
        body: product
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export const deleteProduct = (id) => {
    return fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}