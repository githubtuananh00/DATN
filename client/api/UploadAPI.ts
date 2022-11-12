import axios from 'axios'
import { apiUrl } from '../constants'
import { IFile, IResponse, IResponseFile } from '../type'

/**
 * Uploaded File 
 * @param data IFile
 * @returns Promise<IPayLoad<IResponseFile> | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const UploadedFileAPI = async (data: IFile) => {
	try {
		// Call API to upload File
		const response: IResponse<IResponseFile> = await axios.post(
			`${apiUrl}/upload`,
			data
		)
		// Return data if there is data
		if (response.data.success) return response.data.payload
	} catch (error) {
		// Return data if the data is not found
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Destroy File
 * @param data Data delete File
 * @returns Promise<{
    success: boolean;
    message: string;
    payload: IPayLoad<IResponseFile>;
} | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const DestroyFileAPI = async (data: string) => {
	try {
		// Call API to delete File
		const response: IResponse<IResponseFile> = await axios.post(
			`${apiUrl}/delete`,
			{ public_id: data }
		)
		// Return data if there is data
		if (response.data.success) return response.data
	} catch (error) {
		// Return data if the data is not found
		return {
			success: false,
			message: error,
		}
	}
}
