import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { bookSchema } from "./schema/book.schema";
import { bookController } from "./book.controller";
import { bookService } from "./book.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule,ConfigModule.forRoot(),
        MongooseModule.forRootAsync({

            imports:[ConfigModule],
            useFactory: async (configService:ConfigService) => {

                const user=configService.get('USERNAME');
                const password=configService.get('PASSWORD');
        
                const uri=`mongodb+srv://${user}:${password}@cluster0.yjsjhqe.mongodb.net/auth`
        
                return {
                  uri
                }
            },
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{name:'Book',schema:bookSchema}])
    ],
    controllers:[bookController],
    providers:[bookService]

})
export class BookModule{}