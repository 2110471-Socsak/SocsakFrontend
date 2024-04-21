export interface UsersResponse {
  success: boolean;
  message?: string;
  data?: {
    users: Array<{
      username: string;
      online: boolean;
    }>;
  };
}
