export interface Group {
  id: string;
  name: string;
}

export interface GroupsResponse {
  success: boolean;
  message?: string;
  data?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

export interface RoomCountUpdateData {
  groupId: string;
  count: number;
}
