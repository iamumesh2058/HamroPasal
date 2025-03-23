// get categoriy details
export const getAllCategoryDetail = (id) => {
    return fetch(`/api/getCategoryDetails/${id}`)
        .then((res) => res.json());
}