import { Global, HttpServer, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';
import * as fs from 'fs'
import { Readable, Transform, pipeline } from 'stream';
import { promisify } from 'util';

@Global()
@Injectable()
export class FileService implements OnModuleInit {
    private promissedPipeline = promisify(pipeline)

    constructor() {
    }
    onModuleInit() {
        this.logger.verbose(`temp files directory: ${this.pathTemp} `)
        this.logger.verbose(`mail files directory: ${this.pathMail} `)

    }

    private pathTemp = resolve('public', 'temp')
    private pathMail = resolve('assets', 'mails')
    private logger = new Logger(FileService.name)

    async writeImage(name: string, buff: Buffer) {

        this.logger.debug(`write file ${name} (${(buff.length / (1024 * 1024)).toFixed(2)} mb)`)

        const stream = new Readable({ read: () => { } })

        const parts = await this.splitBuffer(buff, 10)
        parts.forEach((chunks) => {
            stream.push(chunks)
        })
        this.promissedPipeline(
            stream,
            new Transform({
                transform(chunk, encoding, callback) {
                    console.log(`[!] ${(chunk.length / 1024).toFixed(1)} kb's received`)
                    callback(null, chunk);
                }
            }),
            fs.createWriteStream(resolve(this.pathTemp, name))
        )



    }

    async unlinkImage(name: string) {
        this.logger.debug(`delete file ${name}`)

        fs.unlink(resolve(this.pathTemp, name), (err) => {
            if (err) {
                this.logger.error(err)
            }
        })

    }

    async getImage(name: string, host: string) {

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
    async splitBuffer(buffer: Buffer, numParts: number) {
        const partSize = Math.ceil(buffer.length / numParts);
        const parts = [];
        for (let i = 0; i < numParts; i++) {
            const start = i * partSize;
            const end = Math.min(start + partSize, buffer.length);
            parts.push(buffer.slice(start, end));
        }
        return parts;
    }
}
