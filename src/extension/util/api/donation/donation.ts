import { Donation } from "@sre-frontend-layout/types";
import { api } from "../axios";
import { APIResponse } from "@sre-frontend-layout/types/Api";


export const apiGetBids = async <T>(): Promise<APIResponse<Donation[]>> => {
  try {
    const response = await api.get(`/bids`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get bids`);
  }
}

export const apiGetBidByID = async <T>(id: string): Promise<APIResponse<Donation>> => {
  try {
    const response = await api.get(`/bids/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get donation by id: ${id}`);
  }
}

export const apiUpdateBid = async <T>(donation: Donation): Promise<APIResponse<T>> => {
  try {
    const response = await api.patch(`/bids/${donation.id}`, donation)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create donation");
  }
}

export const apiDeleteBid = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await api.delete(`/bids/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete donation");
  }
}

export const apiGetTotalDonatedByEventID = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await api.get(`/donations/event/total/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete donation");
  }
}