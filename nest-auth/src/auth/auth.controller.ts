import { Body, Controller,Response, Post, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './dto/signUpDTO';
import { User } from './schema/user.schema';
import { loginDTO } from './dto/loginDTO';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/signup')
    async signup(@Body() user:signUpDTO,@Response() res:any):Promise<{token:string}>{

        try {
            console.log(user)
            const newUser = await this.authService.signUp(user);

            return res.status(HttpStatus.CREATED).json({
                message:'User created successfully',
                newUser
            })
            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message:error.message
            })
        }
    }

    @Get('/login')
    async login(@Body() user:loginDTO,@Response() res:any):Promise<{token:string}>{

        try {
            const newUser = await this.authService.login(user);

            return res.status(HttpStatus.CREATED).json({
                message:'User loggedin successfully',
                newUser
            })
            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message:error.message
            })
        }
    }

}
