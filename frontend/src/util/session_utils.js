// export const createUser = (user) => {
//     return $.ajax({
//         url: '/api/users',
//         method: 'POST',
//         data: { user }
//     });
// };

// // const user = {
// //   id: 1,
// //   username: "",
// //   email: "",
// //   password: "password"
// // }

// // const data = {
// //   user: {
// //     id: 1,
// //     username: "",
// //     email: "",
// //     password: "password"
// //   }
// // }

// export const createSession = (user) => {
//     return $.ajax({
//         url: '/api/session',
//         method: 'POST',
//         data: { user }
//     });
// };

// export const deleteSession = () => {
//     return $.ajax({
//         url: '/api/session',
//         method: 'DELETE'
//     });
// };

export const login = user => {
    return $.ajax({
        method: 'POST',
        url: `/api/session`,
        data: { user }
    })
};

export const signup = user => {
    return $.ajax({
        method: 'POST',
        url: '/api/users',
        data: { user }
    })
};

export const deleteSession = () => (
    $.ajax({
        method: 'DELETE',
        url: '/api/session'
    })
);