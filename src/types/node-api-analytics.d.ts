declare module 'node-api-analytics' {
  import { RequestHandler } from 'express';
  export function expressAnalytics(apiKey: string): RequestHandler;
}