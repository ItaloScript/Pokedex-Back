import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommentDto {
    
    @ApiProperty( { description: 'The name of the comment', example:  'This is a comment' } ) 
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    name: string;

}
