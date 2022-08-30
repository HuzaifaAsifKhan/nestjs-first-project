import { Controller, Get, Header, HttpCode, Post, Req, Res, Headers, Redirect, Param, HttpStatus, HttpException, UseFilters, ParseIntPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request, Response, NextFunction } from 'express';



import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}




@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {

    constructor(
        private readonly catsService: CatsService
        ) {}

    @Post()
    @HttpCode(200)
    catsPost(){
        return 'Cats Controller Post'
    }

    // @Get('ab*cd')
    @Get()
    // @Header('Cache-Control', 'none')
    // @Redirect('http://localhost:3000/cats/hello', 201)
    catsGet() {
        return 'Cats Controller'
        // return { url: 'http://localhost:3000/cats/profile' };
    }

    @Get('profile')
    catsProfile(){
        return 'Cats Profile';
    }


    // @Get(':id')
    // findOne(@Param() params): string {
    //     console.log(params.id);
    //     return `This action returns a #${params.id} cat`;
    // }
    @Get(':id')
    // @UseFilters(HttpExceptionFilter)
    // findOne(@Req() req, @Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response) {
    findOne(@Req() req, @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Res({ passthrough: true }) response) {
        // response.status(HttpStatus.OK)
        // return `This action returns a #${id} cat`;
        // throw new HttpException({
        //     error:{
        //         status: HttpStatus.FORBIDDEN,
        //         error: 'This is a custom message',
        //     }
        //   }, HttpStatus.FORBIDDEN);
        // throw new ForbiddenHuzaifaException();
        return this.catsService.findOne(id, response)
    }

}



export class ForbiddenHuzaifaException extends HttpException {
    constructor() {
      super({
            error:{
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
            }
          }, HttpStatus.FORBIDDEN);
    }
}




