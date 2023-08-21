import Jwt  from "jsonwebtoken";
import { createError } from "./Error.js";

export const verfyToken = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) return next(createError(401, "You Are Not authontecaited!"));

	Jwt.verify(token, process.env.JWT, (err, user)=> {
		if (err) return next(createError(403, "Token it'sNot Valide!"));

		req.user = user;
		next();
	});
}
