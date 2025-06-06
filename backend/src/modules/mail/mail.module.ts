import { Module } from '@nestjs/common';
import { MailService } from '../../services/mail/mail.service';
import { FileModule } from '../file/file.module';

@Module({
    imports:[FileModule],
    providers:[MailService],
    exports:[MailService]
})
export class MailModule {}
