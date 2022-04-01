import { url } from "../../backend";
import { isAuthenticated } from "../../user/helper/userAPICalls";

export const addToCart = (amount, item, user, next) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (!isAuthenticated()){
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem("cart"))
                const itemExist = cart.find(product => product.id === item.id)
                if (itemExist) {
                    for (let i in cart) {
                        if (cart[i].id === item.id) {
                            cart[i].amount += amount;
                            if (cart[i].amount > cart[i].stock) {
                                cart[i].amount = cart[i].stock;
                            }
                            break;
                        }
                    }
                }
                if (!itemExist) {
                    item.amount = amount
                    cart.push({
                        ...item,
                    })
                }
            } else {
                item.amount = amount
                cart.push({
                    ...item,
                })
            }
            localStorage.setItem('cart',JSON.stringify(cart));
        } else {
            return fetch(`${url}/add-to-cart/${user.user.id}/${user.token}/${item.id}/${amount}`,
             {method:"GET"})
            .then((response) => {
                return response.json();
            })
            .catch((error) => console.log(error))
        }


        next();
    }
};

export const removeFromBackendCart = (userId, token, product_id) => {
    return fetch(`${url}/remove/${userId}/${token}/${product_id}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const removeFromCart = (product) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((item, index) => {
            if (item.id === product.id) {
                cart.splice(index, 1)
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart))
    };
};

export const incrementLocalCart = (product) => {
    let cart = []
    if (typeof window !== undefined) {
        cart = JSON.parse(localStorage.getItem("cart"))
        cart.map((item) => {
            if (item.id === product.id) {
                if (item.amount < product.stock) {
                    item.amount++;
                };
            };
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    };
};

export const decrementLocalCart = (product) => {
    let cart = []
    if (typeof window !== undefined) {
        cart = JSON.parse(localStorage.getItem("cart"))
        cart.map((item) => {
            if (item.id === product.id) {
                if (item.amount > 1) {
                    item.amount--;
                };
            };
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    };
};

export const plusOneFromCart = (user, productId) => {
    return fetch(`${url}/add-one/${user.user.id}/${user.token}/${productId}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const minusOneFromCart = (user, productId) => {
    return fetch(`${url}/remove-one/${user.user.id}/${user.token}/${productId}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const checkBackendCart = (userId) => {
    return fetch(`${url}/check-cart/${userId}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const loadCartContent = (userId) => {
    return fetch(`${url}/cart/${userId}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const showCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        } else {
            const cart = [];
            localStorage.setItem("cart", JSON.stringify(cart))
        };
    };
};

export const checkCode = (code) => {
    return fetch(`${url}/check-code/${code}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};