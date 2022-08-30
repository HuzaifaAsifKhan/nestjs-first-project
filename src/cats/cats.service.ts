import { Injectable, HttpStatus, Global } from '@nestjs/common';

@Injectable()
export class CatsService {
    findOne(id, response){
        response.status(HttpStatus.OK)
        return `This action returns a #${id} cat`;
    }
}
