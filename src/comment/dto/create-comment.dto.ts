import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    
    @ApiProperty( { description: 'The name of the comment', example:  'This is a comment' } ) 
    @IsString()
    comment: string;

    @ApiProperty( { description: 'The Pokemon Unique ID', example:  1 } )
    @IsNumber()
    pokemonId: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

}
