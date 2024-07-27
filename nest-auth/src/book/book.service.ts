import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { bookDTO } from "./dto/book.dto";
import { book } from "./schema/book.schema";
import {Query} from 'express-serve-static-core';
import { User } from "src/auth/schema/user.schema";

@Injectable()

export class bookService{

    constructor(@InjectModel('Book') private bookModel:Model<book>){}

    async findAll(query:Query):Promise<book[]>{

        const resultPerPage=2;
        const currentPage=query.page?Number(query.page):1;
        const skip=resultPerPage *(currentPage-1);
        const keyword = query.keyword ?{
            title:{
                $regex:query.keyword,
                $options:'i'
            }

        } :{}
      
        let book= await this.bookModel.find({...keyword}).limit(resultPerPage).skip(skip)
        if(!book){
            throw new NotFoundException(`data not found`)
        }
        return book
    }

    async createBook(book:bookDTO,user:User):Promise<book>{

        const data = Object.assign(book,{user :user._id})
        let newBook= await  this.bookModel.create(data)
        if(!newBook){
            throw new NotFoundException(`data not found`)
        }
        return await newBook.save()

    }
    async findBook(bookId:string):Promise<book>{
        let find=await this.bookModel.findById(bookId)
        if(!find){
            throw new NotFoundException(`${bookId} not found`)
        }
        return find
    }

    async updateBook(bookId:string,updateBookDTO:bookDTO):Promise<book>{

        let update=await this.bookModel.findByIdAndUpdate(bookId,updateBookDTO,{new:true})
        if(!update){
            throw new NotFoundException(`${bookId} not found`)
        }
        return update;
    }

    async deleteBook(bookId:string):Promise<book>{

        let del=await this.bookModel.findByIdAndDelete(bookId)
        if(!del){
            throw new NotFoundException(`${bookId} not found`)
        }
        return del;
    }

}