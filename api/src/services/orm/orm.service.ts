import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class OrmService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(OrmService.name)
  async onModuleInit() {
    try{
      await this.$connect();
      this.logger.verbose('Orm connection successful')

    }catch(err){
      this.logger.error('error in Orm connection:',err)
    }
   
  }
}
