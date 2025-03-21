// Product Details
export const productDetails = (id) => {
    return fetch(`/api/product/getProductDetails/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}


// Get Category Products
export const getCategoryProducts = (id) => {
    return fetch(`/api/product/getCategoryProducts/${id}`)
        .then((res) => res.json());
}