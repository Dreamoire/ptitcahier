export type {};

declare global {
  namespace Express {
    export interface Request {
      auth: MyPayload;
    }
  }
}
