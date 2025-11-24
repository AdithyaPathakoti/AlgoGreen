/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
  /** ISO timestamp when the response was generated */
  timestamp?: string;
  /** Optional echoed value from a query param */
  echo?: string;
}

export enum ApiStatus {
  OK = "ok",
  ERROR = "error",
}
