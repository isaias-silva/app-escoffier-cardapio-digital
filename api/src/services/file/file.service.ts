import { Global, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';
import * as fs from 'fs'
import { Readable, Writable, pipeline } from 'stream';
import { promisify } from 'util';
import { createGunzip, createGzip } from 'node:zlib';

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

        const pathCompress = resolve(this.pathTemp, "compact_" + name + ".gz")

        const writeStream = fs.createWriteStream(resolve(pathCompress))

        const parts = await this.splitBuffer(buff, buff.length / (1024 * 1024))

        const readStream = Readable.from(parts)

        await this.compressFile(readStream, writeStream, "compact_" + name + ".gz")






    }



    async compressFile(readStream: Readable, writeStream: Writable, fileName: string) {


        const gzip = createGzip()

        gzip.on('end', () => {
            this.logger.verbose(`file ${fileName} compressed.`)
        })
        gzip.on('data', (chunk) => {
            this.logger.debug(` ${(chunk.length / (1024)).toFixed(2)} kb's compress in ${fileName}`)

        })

        try {

            await this.promissedPipeline(
                readStream,
                gzip,
                writeStream
            );
        } catch (error) {
            this.logger.error('Error in compact file:', error);
        } finally {
            readStream.emit('close')
            writeStream.emit('close');
        }


    }
    async decompressFile(compactFile: Readable, descompactFile: Writable, fileName: string) {
        const gunzip = createGunzip()
        gunzip.on('end', () => {
            this.logger.verbose(`file ${fileName} decompress.`)
        })
        gunzip.on('data', (chunk) => {
            this.logger.debug(` ${(chunk.length / (1024)).toFixed(2)} kb's decompress in ${fileName}`)

        })
        this.promissedPipeline(
            compactFile,
            gunzip,
            descompactFile
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

    async getImage(name?: string, host?: string) {
        if (!name) {
            return null
        }
        try {
            const existImage = fs.readFileSync(resolve(this.pathTemp, name))

            return host + '/static/' + name

        } catch (err) {
            this.logger.warn(err)
            const compactExist = fs.existsSync(resolve(this.pathTemp, "compact_" + name + ".gz"))

            if (compactExist) {
                const compactImage = fs.createReadStream(resolve(this.pathTemp, "compact_" + name + ".gz"))

                const descompactImage = fs.createWriteStream(resolve(this.pathTemp, name));


                this.decompressFile(compactImage, descompactImage, "compact_" + name + ".gz")


                return host + '/static/' + name

            } else {
                return null
            }
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
            parts.push(buffer.subarray(start, end));
        }
        return parts;
    }
}
