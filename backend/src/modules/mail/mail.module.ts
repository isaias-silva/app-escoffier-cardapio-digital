import { Module } from '@nestjs/common';
import { MailService } from '../../services/mail/mail.service';
import { FileModule } from '../file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [FileModule, ConfigModule],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule { }
