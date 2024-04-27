import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class OrmService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(OrmService.name)
  async onModuleInit() {
    try{
      await this.$connect();
    
      this.logger.verbose('instantiated connector')

    }catch(err){
      this.logger.error('error in Orm connector:',err)
    }
   
  }
}
