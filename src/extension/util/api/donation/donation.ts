import { Donation } from "@sre-frontend-layout/types";
import { api } from "../axios";
import { APIResponse } from "@sre-frontend-layout/types/Api";

export const apiGetTotalDonatedByEventID = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await api.get(`/donations/event/total/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete donation");
  }
}