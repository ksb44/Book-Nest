import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class loginDTO{



@IsString()
@IsNotEmpty()
email: string;


@IsString()
@IsNotEmpty()
@MinLength(6)
password: string;

}