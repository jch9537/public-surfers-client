const server = 'http://127.0.0.0:3000'; //서버주소

export function fetchAPI(
    url: string,
    server?: string,
    method?: string,
    body?: object
) {
    // if (!server) {
    //     // 서버에만 보낼 함수일지 아닐지 고민
    //     url = `${server}/${url}`; // 이거 확인해볼 것
    // }
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
