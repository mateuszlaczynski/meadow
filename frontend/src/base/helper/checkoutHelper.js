import { url } from "../../backend";

export const generateOrder = (order) => {
    return fetch(`${url}/orders/new/generate-bank-transfer-order/`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify(order)
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};

export const clearCart = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
    }
};

export const clearUsersProducts = (userId) => {
    return fetch(`${url}/clear-cart/${userId}/`, {method:"GET"})
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
};