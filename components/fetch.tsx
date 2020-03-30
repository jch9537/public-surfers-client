
export interface settingInfo {
  name: string | null;
  currPassword: string | null;
  newPassword: string | null;
}
interface body {
  post_id: number;
  text?: string;
}
//login 하는 fetch
let server = "http://15.164.218.247:3000";

export const userSignin = function(body: any) {
  let server = "http://15.164.218.247:3000/user/signin";
  return fetch(server, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  });
};
//회원가입하는 fetch
export const userSignup = function(body: any) {
  let server = "http://15.164.218.247:3000/user/signup";
  return fetch(server, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  });
};
//user 정보 수정하는 fetch
export const userSetting = function(
  method: string,
  token: string,
  body?: settingInfo | null
) {
  let server = "http://15.164.218.247:3000/user";
  if (method === "PUT") {
    return fetch(server, {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(body),
      credentials: "include"
    });
  } else {
    return fetch(server, {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      credentials: "include"
    });
  }
};
//스팟이나 지역 정보 가져오는 fetch
export const GetLocationOrSpot = function(takeInfo: string, token: string) {
  let server;
  if (takeInfo === "location") {
    server = "http://15.164.218.247:3000/location";
    return fetch(server, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      credentials: "include"
    });
  } else {
    server = `http://15.164.218.247:3000/spot?location_name=${takeInfo}`;
    return fetch(server, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      credentials: "include"
    });
  }
};

//방 만드는 fetch
export const makeRoom = function(body: any, token: string) {
  let server = "http://15.164.218.247:3000/posts";
  return fetch(server, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(body),
    credentials: "include"
  });
};

//방 이름들 혹은 방 정보 가져오는 fetch
export const GetRoomlistOrGetRoominfo = async function(
  token: string,
  post_Id?: number | null
) {
  let server = "http://15.164.218.247:3000/posts";
  // console.log(post_Id);
  if (post_Id) {
    server = `http://15.164.218.247:3000/post?post_id=${post_Id}`;
  }
  // console.log("serverurl", server);
  return fetch(server, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    credentials: "include"
  });
};

export const GetMyRooms = async (token: any) => {
  let data = await fetch(server + "/posts/my_list", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    credentials: "include"
  });
  return data.json();
};

//sideBar에서 chat쪽 참여 하는 fetch 부분
export const JoinChatfromSideBar = function(
  token: string,
  post_id?: number,
  body?: null | body
) {
  if (body) {
    return fetch(server + "/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(body),
      credentials: "include"
    });
  } else {
    console.log("post", post_id)
    return fetch(server + `/post?post_id=${post_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      credentials: "include"
    });
  }
};
export const weatherAPI = function(url: string, method: string) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const identifyUser = async (token: any) => {
  let identifyFetch = await fetch(server + "/identify", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  return await identifyFetch.json();
};

export const participateRoom = async (token: any, post_id: number) => {
  await fetch(server + "/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ post_id: post_id })
  });
};
export const DeleteRoom = async (post_id: number, token: string) => {
  return await fetch(server + `/delete?post_id=${post_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    credentials: "include"
  });
};
export const EditRoom = function(body: body, token: string) {
  return fetch(server + `/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(body),
    credentials: "include"
  });
};
