import { Response, NextFunction } from 'express'
import { role } from '../resources/role'
import { IGetUserAuthInfoRequest } from '../type'

export const authAdmin = (
	req: IGetUserAuthInfoRequest<any>,
	res: Response,
	next: NextFunction
) => {
	if (req.userRole !== role.ADMIN)
		return res.status(401).json({
			success: false,
			message: 'Admin resources access denied',
		})

	next()
}
