import { Response, NextFunction } from 'express'
// import { role } from '../resources/role'
import { IGetUserAuthInfoRequest } from '../type'

/**
 * Check Auth Admin
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @returns HTTP Response
 */
export const authAdmin = (
	req: IGetUserAuthInfoRequest<any>,
	res: Response,
	next: NextFunction
) => {
	if (!req.userRole)
		return res.status(401).json({
			success: false,
			message: process.env.MSG_HTTP_UNAUTHORIZED,
		})

	next()
}
