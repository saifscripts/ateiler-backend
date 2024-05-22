interface ZodIssue {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}

export interface ICustomError extends Error {
  statusCode?: number;
  issues?: ZodIssue[];
}
