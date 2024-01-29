import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const write = async () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const filePath = path.join(__dirname, './files/fileToWrite.txt');

        const writeStream = fs.createWriteStream(filePath);

        await pipelineAsync(
            process.stdin,
            writeStream
        );
    } catch (error) {
        throw new Error(`Error writing to file: ${error.message}`);
    }
};

await write();
