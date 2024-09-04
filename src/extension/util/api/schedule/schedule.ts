
import { Schedule } from "@sre-frontend-layout/types";
import { api } from "../axios";
import { APIResponse } from "@sre-frontend-layout/types/Api";


export const apiGetSchedules = async <T>(): Promise<APIResponse<Schedule[]>> => {
  try {
    const response = await api.get(`/schedules`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error(`Failed to get schedules`);
  }
}

export const apiGetScheduleByID = async <T>(id: string): Promise<APIResponse<Schedule>> => {
  try {
    const response = await api.get(`/schedules/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to get schedule by id: ${id}`);
  }
}

export const apiUpdateSchedule = async <T>(schedule: Schedule): Promise<APIResponse<T>> => {
  try {
    const response = await api.patch(`/schedules/${schedule.id}`, schedule)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to create schedule");
  }
}

export const apiDeleteSchedule = async <T>(id: string): Promise<APIResponse<T>> => {
  try {
    const response = await api.delete(`/schedules/${id}`)
    const apiResponse: APIResponse = response.data
    return apiResponse
  } catch (error) {
    throw new Error("Failed to delete schedule");
  }
}