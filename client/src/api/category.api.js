export const getAllCategories = () => {
    return fetch('/api/category')
        .then(response => response.json())
        .catch(error => console.log(error));
}


export const addCategory = (category) => {
    return fetch(`/api/category`, {
        method: "POST",
        body: category
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}


export const updateCategory = (id, category) => {
    return fetch(`/api/category/${id}`, {
        method: "PUT",
        body: category
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}


export const getCategoryDetails = (id) => {
    return fetch(`/api/category/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}


export const deleteCategory = (id) => {
    return fetch(`/api/category/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}