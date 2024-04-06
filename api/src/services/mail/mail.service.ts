import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Global()
@Injectable()
export class MailService implements OnModuleInit {
    private logger = new Logger(MailService.name)

    transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    async onModuleInit() {
        try {
            const user = process.env.OAUTH_CLIENT_MAIL
            const clientId = process.env.OAUTH_CLIENTID
            const clientSecret = process.env.OAUTH_CLIENT_SECRET
            const refreshToken = process.env.OAUTH_REFRESH_TOKEN

            if(!user || !clientId || !refreshToken || !clientSecret){
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
}
