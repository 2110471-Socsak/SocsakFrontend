import type { GroupsResponse } from "@/models/group";

export const getAllGroup = async (): Promise<GroupsResponse> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user) {
      return {
        success: false,
      };
    }

    const response = await fetch(`${import.meta.env.VITE_BACK_URI}/groups`, {
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
