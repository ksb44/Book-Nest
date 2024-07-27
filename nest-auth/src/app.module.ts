import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [BookModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
