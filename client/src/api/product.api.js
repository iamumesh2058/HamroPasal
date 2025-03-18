export const productDetails = (id) => {
    return fetch(`/api/product/getProductDetails/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}