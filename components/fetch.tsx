let server = "http://54.180.108.45:3000";

let fetchOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include"
};
export const user = function(
  method: string,
  endPoint: string | null = null,
  body: object | null = null
) {
  server += "/user";
  if (method === "POST" || method === "PUT") {
    if (endPoint) {
      server += `/${endPoint}`;
    }
    fetchOptions["method"] = method;
    fetchOptions["body"] = JSON.stringify(body);
    return fetch(server, fetchOptions);
  } else {
    return fetch(server, fetchOptions);
  }
};
export const posts = function(
  method: string,
  body: object | null = null,
  postId: number | null = null,
  endPoint: string | null = null
) {
  server += "/posts";
  if (endPoint) {
    server += "my_list";
  }
  if (method === "POST") {
    fetchOptions["method"] = method;
    fetchOptions["body"] = JSON.stringify(body);
    return fetch(server, fetchOptions);
  } else {
    if (postId) {
      server += `?post_id=${postId}`;
    }
    return fetch(server, fetchOptions);
  }
};
export const post = function(
  method: string,
  body: object | null = null,
  postId: number | null = null
) {
  server += "/post";
  if (method === "POST") {
    return fetch(server, fetchOptions);
  } else {
    server += `?post_id=${postId}`;
    fetchOptions["method"] = method;
    fetchOptions["body"] = JSON.stringify(body);
    return fetch(server, fetchOptions);
  }
};
