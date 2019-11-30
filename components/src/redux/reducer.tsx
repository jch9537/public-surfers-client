import { addRoomInfo, JoinChatingRoom, addRoom, RoomInfomation } from "./actions";

// state = {
//     Join: null,
//     User_id: 0
// };
export const Room: RoomInfomation = {
    room: {
        id: 0,
        host_id: 0,
        host_name: "",
        location_name: "",
        date: "",
        text: "",
        pay: 0,
        participants: []
    },
    Join: false
}
export function RoomInfo(state: RoomInfomation = Room, action: addRoom): RoomInfomation {
    switch (action.type) {
        case addRoomInfo:
            return {
                room: action.Room,
                Join: state.Join
            };
        case JoinChatingRoom:
            return {
                room: state.room,
                Join: !state.Join
            };
        default: return state
    }
}
