import { Body,Get,Put,Delete, Controller, HttpStatus, Post, Response, Param, Res, Query, UseGuards, Request } from "@nestjs/common";
import { bookService } from "./book.service";
import { book } from "./schema/book.schema";
import { bookDTO } from "./dto/book.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('book')

export class bookController{

constructor(private bookService:bookService){}

@Post()
@UseGuards(AuthGuard())
async createBook(@Response() res,@Request() req ,@Body() books:bookDTO):Promise<book>{
    
    try {
        const book=await this.bookService.createBook(books,req.user)
        return res.status(HttpStatus.OK).json({
            message:"Book created successfully",
            book
            })
        
    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }


}

@Get()
async getAllBook(@Response() res,@Query() qry){
    try {

        let books= await this.bookService.findAll(qry)
        return res.status(HttpStatus.OK).json({
            message:"Books fetched successfully",
            books
            })
        
    } catch (error) {
        return res.status(HttpStatus.NOT_FOUND).json({
            message: error.message
        })
    }
  
}

@Get(':id')
async getBookById(@Response() res,@Param('id') id:string){
    try {
        let book= await this.bookService.findBook(id)
        return res.status(HttpStatus.OK).json({
            message:"Book fetched successfully",
            book    
            })
        }
        catch(err){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: err.message
                })

        }
    }

@Put(':id')
async updateBook(@Param('id') id:string,@Body() body:any,@Response() res){
    try {
        let book= await this.bookService.updateBook(id,body)
        return res.status(HttpStatus.OK).json({
            message:"Book updated successfully",
            book
            })
        
    } catch (error) {
        return res.status(HttpStatus.NOT_FOUND).json({

            message:error.message
        })
    }

}

@Delete(':id')
async deleteBook(@Param('id') id:string,@Response() res){

    try {
        
        let book= await this.bookService.deleteBook(id)
        return res.status(HttpStatus.OK).json({
                message:"Book deleted successfully",
                book
                })
    } catch (error) {
        return res.status(HttpStatus.NOT_FOUND).json({
            message:error.message
        })
    }
}
}