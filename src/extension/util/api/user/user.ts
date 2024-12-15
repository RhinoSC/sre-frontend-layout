import type { User } from "@sre-frontend-layout/types";
import { api } from "../axios";
import { APIResponse } from "@sre-frontend-layout/types/Api";


export const apiGetUsers = async <T>(): Promise<APIResponse<User[]>> => {
  try {
    const response = await api.get(`/users`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get users`);
  }
}

export const apiGetUserByID = async <T>(id: string): Promise<APIResponse<User>> => {
  try {
    const response = await api.get(`/users/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get user by id: ${id}`);
  }
}

export const apiUpdateUser = async <T>(user: User): Promise<APIResponse<T>> => {
  try {
    const response = await api.patch(`/users/${user.id}`, user)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export const apiDeleteUser = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await api.delete(`/users/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}