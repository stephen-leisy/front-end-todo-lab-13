import request from 'superagent';

const URL = 'https://quiet-mountain-77600.herokuapp.com';

export async function signUpUser(email, password) {
    const response = await request.post(`${URL}/auth/signup`)
        .send({ email, password })

    return response.body;
}
export async function signInUser(email, password) {
    const response = await request.post(`${URL}/auth/signin`)
        .send({ email, password })

    return response.body;
}
export async function getTodos(token) {
    const response = await request.get(`${URL}/api/todos`).set('Authorization', token)
    return response.body;
}
export async function setTodos(todo, token) {
    const response = await request.post(`${URL}/api/todos`).set('Authorization', token).send({ todo })
    return response.body;
}
export async function completeTodos(todoId, token) {
    const response = await request.put(`${URL}/api/todos/${todoId}`).set('Authorization', token)
    return response.body;
}