import {
  addRoomInfo,
  JoinChatingRoom,
  addRoom,
  RoomInfomation,
  GettingPostId
} from "./actions";

export const Room: RoomInfomation = {
  room: {
    id: 0,
    host_id: 0,
    host_name: "",
    location_name: "",
    date: "",
    text: "",
    pay: 0,
    spot_name: "",
    participants: []
  }
};
export function RoomInfo(
  state: RoomInfomation = Room,
  action: addRoom
): RoomInfomation {
  switch (action.type) {
    case addRoomInfo:
      return {
        room: action.Room,
      };
    case GettingPostId:
      return {
        room: state.room
      };
    default:
      return state;
  }
}
