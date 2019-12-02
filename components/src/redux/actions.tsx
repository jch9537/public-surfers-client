//action.type
export const addRoomInfo = "ADDROOMINFO" as const;
export const JoinChatingRoom = "JOIN" as const;
export const GettingPostId = "GETPOSTID" as const;
//antion 생성 함수에서 받는 인자
export interface RoomData {
  id: number;
  host_id: number;
  host_name: string;
  location_name: string;
  date: string;
  text: string;
  pay: number;
  participants: string[];
}
// room 의 데이터

//join 의 타입 결정
export interface RoomInfomation {
  room?: RoomData;
  Join?: boolean;
  post_id?: number;
}
//액션 생성 함수의 타입
export interface RoomInfo {
  type: typeof addRoomInfo;
  Room: RoomData;
}
export interface JoinChatRoom {
  type: typeof JoinChatingRoom;
}
export interface GetPostId {
  type: typeof GettingPostId;
}

//액션 생성 함수 선언
export function roominfo(room: RoomData): RoomInfo {
  return {
    type: addRoomInfo,
    Room: room
  };
}
export const joinChat = (): JoinChatRoom => ({ type: JoinChatingRoom });
export const getPostId = (): GetPostId => ({
  type: GettingPostId
});
export type addRoom = RoomInfo | JoinChatRoom | GetPostId;
