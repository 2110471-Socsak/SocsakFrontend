export interface CurrentRoom {
  group: boolean;
  room: string;
}

export interface Message {
  id: string;
  sender: string;
  sentAt: string;
  message: string;
}

export interface GetAllMessageResponse {
  success: boolean;
  message: string;
  data: Message[];
}

export function validateMessage(m: any): Message | undefined {
  if (typeof m !== "object") {
    return;
  }
  const id = m.id;
  const sender = m.sender;
  const sentAt = m.sentAt;
  const message = m.message;

  if (
    typeof message !== "string" ||
    typeof id !== "string" ||
    typeof sender !== "string" ||
    typeof sentAt !== "string"
  ) {
    return;
  }

  return {
    id,
    sender,
    sentAt,
    message
  };
}