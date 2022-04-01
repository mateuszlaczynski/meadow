import { url } from "../../backend";

export const signup = (user) => {
    return fetch(`${url}/users/`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => console.log(error))
}

export const signin = (user) => {
    const formData = new FormData();

    for (const name in user) {
        formData.append(name, user[name]);
    }

    return fetch(`${url}/users/login/`, {
        method:"POST",
        body: formData,
    })
    .then((response) => {
        return response.json()
    })
    .catch((error) => console.log(error))
}

//aka login in localStorage
export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };

export const isAuthenticated = () => {
    if (typeof window == undefined) {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"))
    } else {
      return false;
    };
};

export const signout = () => {
  const userId = isAuthenticated().user.id;

  localStorage.removeItem("jwt");
  localStorage.removeItem("cart");

  return fetch(`${url}/users/logout/${userId}/`, {
    method:"GET",
  })
  .catch((error) => console.log(error))
};

export const changeNewsletter = (user_id, token) => {
  return fetch(`${url}/users/newsletter/${user_id}/${token}/`, {method:"POST"})
  .then((response) => {
    return response.json();
  })
  .catch((error) => console.log(error))
};

export const terminateAccount = (user_id, token) => {
  localStorage.removeItem("jwt");
  return fetch(`${url}/users/delete/${user_id}/${token}/`, {method:"POST"})
  .then((response) => {
    return response.json();
  })
  .catch((error) => console.log(error))
};


export const newsletterSignUp = (email) => {
  return fetch(`${url}/users/newsletter/signup/`, {
    method:"POST",
    body: email
  })
  .then((response) => {
    return response.json();
  })
  .catch((error) => console.log(error))
};

export const getQuestions = () => {
  return fetch(`${url}/users/faq/`, {method:"GET"})
  .then((response) => {
    return response.json();
  })
  .catch((error) => console.log(error)) 
};