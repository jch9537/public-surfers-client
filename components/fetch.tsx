const server = 'http://127.0.0.0:3000/user'; //서버주소

export function fetchAPI(url: string, method?: string, body?: object) {
    return fetch(url, {
        method: method,
        mode: 'cors',
        headers: {
            'Contents-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });
}
