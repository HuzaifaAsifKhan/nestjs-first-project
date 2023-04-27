import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop(raw({
    firstName: { type: String },
    lastName: { type: String }
  }))
  details: Record<string, any>;

//   For Single Entity
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
//   owner: any;


// For Multiple Entities
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  owner: any[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);





// Alternate way to Create a Schema object

// export const CatSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     breed: String,
//     details: Object,
//     owner: String
// });