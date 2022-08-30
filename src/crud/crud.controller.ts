import { Controller, Get, Post, Patch, Delete, Req, Res, Headers, Ip, HostParam, Body, Param, Query, Inject } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { QueryCrudDto } from './dto/query-crud.dto';
import { Request, Response } from 'express';
import { SharedService } from '../shared/shared.service';

@Controller('crud')
export class CrudController {
  constructor(
    private readonly crudService: CrudService,
    private readonly sharedService: SharedService) {}

  @Post()
  create(@Body() createCrudDto: CreateCrudDto) {
    return this.crudService.create(createCrudDto);
  }

  @Get()
  findAll(@Query() query: QueryCrudDto, @Req() request) {
    return this.crudService.findAll(query, request);
  }

  @Get('shared')
  shared() {
    return this.sharedService.hello();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudDto: UpdateCrudDto) {
    return this.crudService.update(+id, updateCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(+id);
  }
}
