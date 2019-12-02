interface settingInfo {
  name: string;
  password: string;
  newPassword: string;
}
interface joinChatbody {
  post_id: number
}
//login 하는 fetch 
export const userSignin = function (body: any) {
  let server = "http://15.164.218.247:3000/user/singin";
  return fetch(server, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  })
}
//회원가입하는 fetch
export const userSignup = function (body: any) {
  let server = "http://15.164.218.247:3000/user/singup";
  return fetch(server, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(body),
    credentials: "include"
  })
}
//user 정보 수정하는 fetch
export const userSetting = function (method: string, token: string, body?: settingInfo | null) {
  let server = "http://15.164.218.247:3000/user";
  if (method === "PUT") {
    return fetch(server, {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(body),
      credentials: "include"
    })
  }
  else {
    return fetch(server, {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      credentials: "include"
    })
  }
}
//스팟이나 지역 정보 가져오는 fetch
export const GetLocationOrSpot = function (takeInfo: string, token: string) {
  let server;
  if (takeInfo === "location") {
    server = "http://15.164.218.247:3000/location";
    return fetch(server, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      credentials: "include"
    })
  } else {
    server = `http://15.164.218.247:3000/spot?location_name=${takeInfo}`;
    return fetch(server, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      credentials: "include"
    })
  }
}

//방 만드는 fetch
export const makeRoom = function (body: any, token: string) {
  let server = "http://15.164.218.247:3000/posts";
  return fetch(server, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(body),
    credentials: "include"
  })
}

//방 이름들 혹은 방 정보 가져오는 fetch
export const GetRoomlistOrGetRoominfo = function (token: string, post_Id?: number | null) {
  let server = "http://15.164.218.247:3000/posts";
  if (post_Id) {
    server += `?post_id=${post_Id}`
  }
  return fetch(server, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": token
    },
    credentials: "include"
  })
}
export const GetMyRooms = function (token: string) {
  let server = "http://15.164.218.247:3000/posts/my_list";
  return fetch(server, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": token
    },
    credentials: "include"
  })
}
//sideBar에서 chat쪽 참여 하는 fetch 부분
export const JoinChatfromSideBar = function (token: string, post_id?: number, body?: null | joinChatbody) {
  let server = "http://15.164.218.247:3000/post";
  if (body) {
    return fetch(server, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(body),
      credentials: "include"
    })
  } else {
    server += `?post_id=${post_id}`;
    return fetch(server, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      credentials: "include"
    })
  }

}
export const weatherAPI = function (url: string, method: string) {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
