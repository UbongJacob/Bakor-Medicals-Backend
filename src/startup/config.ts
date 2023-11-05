import config from "config";

export default function () {
  if (!config.get(JWT_PRIVATE_KEY)) {
    throw new Error(`FATAL: ${JWT_PRIVATE_KEY} is not defined.`);
  }
}

export const JWT_PRIVATE_KEY: Readonly<string> = "jwtPrivateKey";
export const APP_HEADER_TOKEN: Readonly<string> = "x-auth-token";
