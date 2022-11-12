import { Response, NextFunction } from 'express'
import { JwtPayload, Secret, verify } from 'jsonwebtoken'
import { IUser } from '../modules/User'
import { IGetUserAuthInfoRequest } from '../type'

/**
 *
 * Verify Token
 * @param req Request
 * @param res Response
 * @param next Next Function
 * @returns HTTP Response
 */
export const verifyToken = (
	req: IGetUserAuthInfoRequest<any>,
	res: Response,
	next: NextFunction
) => {
	// "Bearer access Token"
	const authHeader = req.header('Authorization')
	const accessToken = authHeader && authHeader.split(' ')[1]

	if (!accessToken)
		return res.status(401).json({
			success: false,
			message: process.env.MSG_HTTP_TOKEN_NOT_FOUND,
		})
	try {
		const decoded = verify(
			accessToken,
			process.env.ACCESS_TOKEN as Secret
		) as JwtPayload & IUser
		req.userId = decoded._id
		req.userRole = decoded.role
		next()
	} catch (error) {
		return res
			.status(403)
			.json({ success: false, message: process.env.MSG_INVALID_TOKEN })
	}
}
