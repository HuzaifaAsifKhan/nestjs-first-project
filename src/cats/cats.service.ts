import { Injectable, HttpStatus, Global } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Cat, CatDocument } from '../schemas/cat.schema';

import { Connection } from 'mongoose';

@Injectable()
export class CatsService {
    constructor(
        @InjectModel(Cat.name) private catModel: Model<CatDocument>,
        @InjectConnection() private connection: Connection
    ) {
        // If SomeoNe Want to write Native API's then need to use that connection variables
        // this.connection.db.collection('cats').find().toArray()
        // .then(result => {
        //     console.log(result, 'CATS');
        // })
        // .catch(error => console.log(error));
    }

    findOne(id, response){
        const cat = this.catModel.findById(id);
        response.status(HttpStatus.OK);
        return cat;
    }

    async create(createCatDto): Promise<Cat>{
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
    }
}
