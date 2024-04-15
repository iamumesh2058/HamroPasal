export const getProductDetails = (id) => {
    return fetch(`/api/product/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}