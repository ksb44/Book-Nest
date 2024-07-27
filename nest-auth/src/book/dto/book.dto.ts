import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Category } from "../schema/book.schema";
import { User } from "src/auth/schema/user.schema";



export class bookDTO{

@IsString()
@MaxLength(30)
title:string;

@IsString()
@MaxLength(30)
description:string;

@IsString()
@MaxLength(30)
author:string;

@IsNumber()
price:number;

@IsNotEmpty()
@IsEnum(Category,{message:'please enter correct category'})
category:Category

@IsEmpty({message:"You cannot pass user"})
user:User
}