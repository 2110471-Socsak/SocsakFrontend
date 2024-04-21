import type { UsersResponse } from "@/models/user";

export const getAllUser = async (): Promise<UsersResponse> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user) {
      return {
        success: false,
      };
    }

    const response = await fetch(`${import.meta.env.VITE_BACK_URI}/users`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
      };
    }

    const data = response.json();
    return data;
  } catch (error) {
    return {
      success: false,
    };
  }
};
