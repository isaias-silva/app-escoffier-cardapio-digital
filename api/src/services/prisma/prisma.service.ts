import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(PrismaService.name)
  async onModuleInit() {
    try{
      await this.$connect();
      this.logger.verbose('prisma connection successful')

    }catch(err){
      this.logger.error('error in prisma connection:',err)
    }
   
  }
}
