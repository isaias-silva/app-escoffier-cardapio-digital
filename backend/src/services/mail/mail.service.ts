import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FileService } from '../file/file.service';
import { MessageMailEnum, SubjectMailEnum } from '../../enums/email.templates.enum';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class MailService implements OnModuleInit {
    private logger = new Logger(MailService.name)
    private transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    constructor(private configService: ConfigService, private fileService: FileService) { }
    async onModuleInit() {
        try {
            const user = this.configService.get("OAUTH_CLIENT_MAIL")
            const clientId = this.configService.get("OAUTH_CLIENTID")
            const clientSecret = this.configService.get("OAUTH_CLIENT_SECRET")
            const refreshToken = this.configService.get("OAUTH_REFRESH_TOKEN")

            if (!user || !clientId || !refreshToken || !clientSecret) {
                throw new Error('invalid credentials')
            }
            this.transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAUTH2',
                    user,
                    clientId,
                    refreshToken,
                    clientSecret

                }
            });
            this.logger.verbose(`oauth2 in smtp mail successful`)

        } catch (err) {
            this.logger.error(`error in smtp connection:${err}  `)
        }



    }

    async sendHtmlMail(to: string, subject: string, htmlContent: string) {
        try {
            if (!this.transport) {
                return
            }

            await this.transport.sendMail({ to, subject, html: htmlContent })

        } catch (err) {
            this.logger.error(`error in send htmlContent mail: ${err}`)
        }
    }
    async makeHtmlMailAndSend(type: 'code' | 'default',
        name: string,
        email: string,
        subject: SubjectMailEnum,
        message: MessageMailEnum,
        code?: string,
        pastMail?: string) {


        const content = (await this.fileService.getMailFile(type == 'code' ? 'code.email.html' : 'default.email.html')).toString()
            .replace(/\[NAME]/g, name)
            .replace(/\[SUBJECT]/g, subject)
            .replace(/\[MESSAGE]/g, message)
            .replace(/\[CODE]/g, code)
            .replace(/\[FRONT-LINK]/, this.configService.get('FRONT_LINK') + "verify?email=" + (pastMail || email))

        this.logger.debug(this.configService.get('FRONT_LINK'))
        this.sendHtmlMail(email, subject, content)
    }
}
