import { IsEmail, IsNotEmpty, isNotEmpty, IsString, MinLength } from "class-validator";

export class signUpDTO{

@IsString()
@IsNotEmpty()
name: string;


@IsString()
@IsNotEmpty()
@IsEmail()
email: string;


@IsString()
@IsNotEmpty()
@MinLength(6)
password: string;

}