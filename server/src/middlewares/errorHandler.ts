import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, _: Request, response: Response, __: NextFunction): void {
    if (err instanceof Error) {
      response.status(400).json({
        error: err.message,
      });
      return ;
    }
  
    response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
    return ;
}

export default errorHandler