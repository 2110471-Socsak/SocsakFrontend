export interface Message {
  id: string;
  sender: string;
  sendAt: string;
  message: string;
}

export function validateMessage(m: any): Message | undefined {
  if (typeof m !== "object") {
    return;
  }
  const id = m.id;
  const sender = m.sender;
  const sendAt = m.sendAt;
  const message = m.message;

  if (
    typeof message !== "string" ||
    typeof id !== "string" ||
    typeof sender !== "string" ||
    typeof sendAt !== "string"
  ) {
    return;
  }

  return {
    id,
    sender,
    sendAt,
    message
  };
}