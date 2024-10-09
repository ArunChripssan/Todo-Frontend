import api from "../api/posts";

export const getTodos = async () => {
    return await api.get("/getAllTasks")
}

// export const postTodo = async (payload) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     };
//     return await fetch(baseUrl + "/add", options);
// }