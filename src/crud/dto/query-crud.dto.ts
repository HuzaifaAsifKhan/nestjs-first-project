import { IsNotEmpty, IsString } from "class-validator";
export class QueryCrudDto {
    // @Prop({ default: 10 })
    @IsNotEmpty()
    limit: number = 10;
  
    // @Prop({ default: 0 }) //set as default
    @IsNotEmpty()
    skip: number = 0;
}