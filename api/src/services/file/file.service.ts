import { Global, HttpServer, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';
import * as fs from 'fs'

@Global()
@Injectable()
export class FileService implements OnModuleInit {
    constructor() {
    }
    onModuleInit() {
        this.logger.verbose(`temp files directory: ${this.pathTemp} `)
        this.logger.verbose(`mail files directory: ${this.pathMail} `)

    }

    private pathTemp = resolve('public', 'temp')
    private pathMail = resolve('assets', 'mails')
    private logger = new Logger(FileService.name)

    async writeImage(name: string, data: Buffer) {
        this.logger.debug(`write file ${name}`)

        fs.writeFile(resolve(this.pathTemp, name), data, (err) => {
            this.logger.error(err)
        })
    }

    async unlinkImage(name: string) {
        this.logger.debug(`delete file ${name}`)

        fs.unlink(resolve(this.pathTemp, name), (err) => {
            this.logger.error(err)
        })

    }

    async getImage(name: string, host: string) {
        this.logger.debug(`get image file ${name}`)
        try {
            fs.readFileSync(resolve(this.pathTemp, name))

            return host + '/static/' + name

        } catch (err) {
            this.logger.error(err)
            return null
        }
    }

    async getMailFile(name: string) {
        this.logger.debug(`get html file ${name}`)

        try {
            const file = fs.readFileSync(resolve(this.pathMail, name))

            return file

        } catch (err) {
            this.logger.error(err)
            return null
        }
    }
}
