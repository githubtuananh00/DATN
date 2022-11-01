import axios from 'axios'
import { apiUrl } from '../constants'
import { IFile, IResponse, IResponseFile } from '../type'

export const UploadedFileAPI = async (data: IFile) => {
	try {
		const response: IResponse<IResponseFile> = await axios.post(
			`${apiUrl}/upload`,
			data
		)
		console.log(response)

		if (response.data.success) return response.data.payload
	} catch (error) {
		return {
			success: false,
			message: error,
		}
	}
}

export const DestroyFileAPI = async (data: string) => {
	try {
		const response: IResponse<IResponseFile> = await axios.post(
			`${apiUrl}/delete`,
			{ public_id: data }
		)
		if (response.data.success) return response.data
	} catch (error) {
		return {
			success: false,
			message: error,
		}
	}
}
