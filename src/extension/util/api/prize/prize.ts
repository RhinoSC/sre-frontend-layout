import { Prize } from "@sre-frontend-layout/types";
import { api } from "../axios";
import { APIResponse } from "@sre-frontend-layout/types/Api";


export const apiGetPrizes = async <T>(): Promise<APIResponse<Prize[]>> => {
  try {
    const response = await api.get(`/prizes`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get prizes`);
  }
}

export const apiGetPrizeByID = async <T>(id: string): Promise<APIResponse<Prize>> => {
  try {
    const response = await api.get(`/prizes/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get prize by id: ${id}`);
  }
}

export const apiUpdatePrize = async <T>(prize: Prize): Promise<APIResponse<T>> => {
  try {
    const response = await api.patch(`/prizes/${prize.id}`, prize)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create prize");
  }
}

export const apiDeletePrize = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await api.delete(`/prizes/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete prize");
  }
}