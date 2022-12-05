import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    
    @IsString()
    comment: string;

    @IsNumber()
    pokemonId: number;

    @IsString()
    username: string;

    @IsEmail()
    email: string;

}
