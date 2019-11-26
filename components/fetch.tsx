let server = "http://server.url";
export const user = (method: string, endPoint?: string, body?: object) => {
    server += "/user";
    if (method === "GET" || method === "DELETE" || endPoint === "signout") {
        if (endPoint) {
            server += "/" + endPoint
        } else {
            return new Error("잘 찾아봐라")
        }
        return fetch(server, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
    } else {
        if (endPoint) {
            server += "/" + endPoint;
        } else {
            return new Error("endPoint를잘 찾아봐라")
        }
        return fetch(server, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include",
        })
    }
}
export const post = (method: string, body?: object, postId?: number, userId?: number) => {
    server += "/post";
    if (method === "GET") {
        if (postId || userId) {
            server += "/" + (userId || postId);
        } else {
            return new Error("잘 찾아봐라")
        }
        return fetch(server, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
    } else {
        if (postId && userId) {
            server += `?user_id=${userId}$post_id=${postId}`
        } else {
            return new Error("잘 찾아봐라")
        }
        return fetch(server, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include",
        })
    }

}