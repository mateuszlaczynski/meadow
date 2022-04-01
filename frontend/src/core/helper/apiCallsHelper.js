import { url } from "../../backend";

export const getAllProducts = () => {
    return fetch(`${url}/products/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const getFullStock = () => {
    return fetch(`${url}/products-stock/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))   
};

export const getCarouselImages = () => {
    return fetch(`${url}/carousel-images/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))    
};

export const getProductDetail = (slug) => {
    return fetch(`${url}/products/${slug}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const getProductStock = (id) => {
    return fetch(`${url}/products/stock/${id}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const getRecommendedProducts = (id) => {
    return fetch(`${url}/recommended-products/${id}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const getProductImages = (id) => {
    return fetch(`${url}/products/images/${id}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const sendMail = (data) => {
    return fetch(`${url}/contact-us/`, {
        method:"POST",
        body: data
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};