import { Bid } from "@sre-frontend-layout/types";
import { api } from "../axios";
import { APIResponse } from "@sre-frontend-layout/types/Api";


export const apiGetBids = async <T>(): Promise<APIResponse<Bid[]>> => {
  try {
    const response = await api.get(`/bids`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get bids`);
  }
}

export const apiGetBidByID = async <T>(id: string): Promise<APIResponse<Bid>> => {
  try {
    const response = await api.get(`/bids/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get bid by id: ${id}`);
  }
}

export const apiUpdateBid = async <T>(bid: Bid): Promise<APIResponse<T>> => {
  try {
    const response = await api.patch(`/bids/${bid.id}`, bid)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create bid");
  }
}

export const apiDeleteBid = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await api.delete(`/bids/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete bid");
  }
}