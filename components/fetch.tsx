const server = 'http://127.0.0.0:3000'; //서버주소

// export interface apiType {
//     url: string;
//     method: string;
//     body: object;
// }
export default function fetchAPI(url: string, method: string, body?: object) {
    return fetch(`${server}/${url}`, {
        method,
        mode: 'cors',
        headers: {
            'Contents-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    });
}
