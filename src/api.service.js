
const url = "https://todo-api-arvind.herokuapp.com/v1";
const common = (data, method, token) => {
    if (method === "GET") {
        return {
            method,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    }
    if (token) {
        return {
            method,
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }
    }


    return {
        method,
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    }
}

export const _auth = () => {
    const token = localStorage.getItem("token")
    return token ? true : false
}

const getToken = () => {
    return localStorage.getItem("token")
}

export const _login = async (mobile, password) => {
    try {
        const res = await fetch(url + "/auth/login", common({ mobile, password }, "POST", ""))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}
export const _signup = async (name, mobile, password) => {
    try {
        const res = await fetch(url + "/auth/signup", common({ name, mobile, password }, "POST", ""))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}
export const _getPendingTasks = async () => {
    try {
        const token = getToken()
        const res = await fetch(url + "/todo/pending-todo", common("", "GET", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}
export const _getDoneTasks = async () => {
    try {
        const token = getToken()
        const res = await fetch(url + "/todo/completed-todo", common("", "GET", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}

export const _addTask = async (task) => {
    try {
        const token = getToken()
        const res = await fetch(url + "/todo/add", common({ task }, "POST", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}

export const _deleteTask = async (todoid) => {
    try {
        const token = getToken()
        const res = await fetch(url + "/todo/delete-todo", common({ todoid }, "DELETE", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}
export const _toggleTaskStatus = async (todoid, done) => {
    try {
        const token = getToken()
        const res = await fetch(url + "/todo/change-done-status", common({ todoid, done }, "PATCH", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}
export const _getProfile = async () => {
    try {
        const token = getToken()
        const res = await fetch(url + "/user/loggedin", common("", "GET", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}
export const _changeName = async (name) => {
    try {
        const token = getToken()
        const res = await fetch(url + "/user/change-name", common({ name }, "PATCH", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}
export const _changePassword = async (password, newpass) => {
    try {
        const token = getToken()
        const res = await fetch(url + "/user/change-password", common({ password, newpass }, "PATCH", token))
        return res.json()
    } catch (error) {
        return { sucess: false, error: "fetch error" }
    }
}

export const formatDate = (d) => {
    const pd = new Date(d)
    const nd = new Date(Date.now())
    let t = Math.floor(Number(nd.getTime() - pd.getTime()) / 60000)
    let dd = nd.getDate() - pd.getDate()
    if (t === 0) {
        return "Just Now";
    }
    if (t < 60) {
        return t + " min ago";
    }
    if (t >= 60 && t < 1440) {
        return (t / 60).toString().split(".")[0] + " hour ago"
    }
    if (t >= 1440 && t < 39200) {
        return (t / 1440).toString().split(".")[0] + " days ago"
    }
    if (t > 39200 && t < 470400) {
        return (t / 39200).toString().split(".")[0] + " month ago"
    }
    if (t > 470400) {
        return (t / 470400).toString().split(".")[0] + " year ago"
    }
    return "a long ago"
}