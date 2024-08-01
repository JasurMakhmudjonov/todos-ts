import { config } from "../../config";
import { sign, verify, SignOptions, VerifyCallback } from "jsonwebtoken";


interface Payload {
  [key: string]: any; 
}

export const createToken = (payload: Payload): string => {
  if (!config.jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  const options: SignOptions = {
    expiresIn: config.jwtExpiration,
  };

  return sign(payload, config.jwtSecret, options);
};

export const checkToken = (token: string, callback: VerifyCallback): void => {
  if (!config.jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  verify(token, config.jwtSecret, callback);
};
