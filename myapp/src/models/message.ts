export interface CurrentRoom {
  isGroup: boolean;
  room: string;
  name?: string;
  count?: number;
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

export function validateMessage(content: any): Message | undefined {
  if (typeof content !== "object") {
    return;
  }
  const id = content.id;
  const sender = content.sender;
  const sendAt = content.sendAt;
  const message = content.message;

  if (
    typeof message !== "string" ||
    typeof id !== "string" ||
    typeof sender !== "string" ||
    typeof sendAt !== "string"
  ) {
    return {
      id: content.id,
      sender: content.sender,
      sentAt: content.sentAt,
      message: content.message
    };
  }
}
