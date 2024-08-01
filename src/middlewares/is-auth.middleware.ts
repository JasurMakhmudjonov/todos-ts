import { NextFunction, Request, Response } from "express";
import { checkToken } from "../utils/jwt";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const isAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  checkToken(token, (err: Error | null, data: any) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }

    req.user = data;
    next();
  });
};

export default isAuth;
