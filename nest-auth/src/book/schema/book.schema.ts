import { Schema, SchemaFactory,Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schema/user.schema";



export enum Category {
    ADVENTURE='Adventure',
    CALSSICS='Classics',
    CRIME='Crime',
    FANTASY='Fantasy',
}

@Schema({
    timestamps:true
})
export class book{

@Prop({required:true})
title:string;

@Prop({required:true})
description:string;

@Prop({required:true})
author:string;

@Prop({required:true})
price:number;

@Prop({required:true})
category:Category

@Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
user:User;


}


export const bookSchema=SchemaFactory.createForClass(book)