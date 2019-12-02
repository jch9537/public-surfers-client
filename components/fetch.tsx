let server = "http://15.164.218.247:3000";

let fetchOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include"
};
export const user = function(
  method: string,
  endPoint?: string | null,
  body?: object | null
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
  body?: object | null,
  postId?: number | null,
  endPoint?: string | null
) {
  server += "/posts";
  if (endPoint) {
    server += `/${endPoint}`;
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
  body?: object | null,
  postId?: number | null
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
export const LocationData = function(
  endPoint: string,
  location_name?: string | null
) {
  server += `/${endPoint}`;
  if (location_name) {
    server += `?location_name=${location_name}`;
  }
  fetchOptions["method"] = "GET";
  return fetch(server, fetchOptions);
};

export const weatherAPI = function(url: string, method: string) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
