export interface User {
  success: boolean;
  message: string;
  data: {
    users: [
      {
        username: string;
        online: boolean;
      }
    ]
  };
}
