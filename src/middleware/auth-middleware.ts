import { Injectable, NestMiddleware, Param, Req } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Req() req: Request, res: Response, next: NextFunction) {
    // console.log('Request...', req);
    console.log('Request...');
    next();
  }
}
