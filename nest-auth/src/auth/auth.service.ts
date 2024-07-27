import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import  * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { signUpDTO } from './dto/signUpDTO';
import { loginDTO } from './dto/loginDTO';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel:Model<User>,private jwtService:JwtService){}

    async signUp(signUpDTO:signUpDTO):Promise<{token:string}>{

        const {name,email,password} =signUpDTO
        const hashed=await bcrypt.hash(password,10)
        const user = await this.userModel.create({name,email,password:hashed})

        const token= this.jwtService.sign({id:user._id})
        return {token}
    }
    async login(loginDTO:loginDTO):Promise<{token:string}>{

        const {email,password}=loginDTO;
        const user = await this.userModel.findOne({email})
        if(!user){
            throw new UnauthorizedException('User not found')
        }

        const matchedPassword=await bcrypt.compare(password,user.password)
        if(!matchedPassword){
            throw new UnauthorizedException('Password is incorrect')
            }
        const token= this.jwtService.sign({id:user._id})
        return {token}    
    }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({username});
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
}
