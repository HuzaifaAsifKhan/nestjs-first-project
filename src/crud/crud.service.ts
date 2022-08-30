import { Injectable } from '@nestjs/common';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { QueryCrudDto } from './dto/query-crud.dto';

@Injectable()
export class CrudService {
  create(createCrudDto: CreateCrudDto) {
    return 'This action adds a new crud';
  }

  findAll(query: QueryCrudDto, request) {
    // console.log(request)
    // console.log('working ')
    // request.send(`This action returns all crud (${query.limit})`);
    return `This action returns all crud (${query.limit})`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crud`;
  }

  update(id: number, updateCrudDto: UpdateCrudDto) {
    return `This action updates a #${id} crud`;
  }

  remove(id: number) {
    return `This action removes a #${id} crud`;
  }
}
