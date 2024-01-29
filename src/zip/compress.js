import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const compress = async () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
        const compressedDirPath = path.join(__dirname, 'files', 'compressed');
        const destinationFilePath = path.join(compressedDirPath, 'archive.gz');

        fs.mkdirSync(compressedDirPath, { recursive: true });

        const gzip = zlib.createGzip();
        const source = fs.createReadStream(sourceFilePath);
        const destination = fs.createWriteStream(destinationFilePath);

        await pipelineAsync(
            source,
            gzip,
            destination
        );
        console.log('File compressed successfully.');
    } catch (error) {
        throw new Error(`Error during compression: ${error.message}`);
    }
};

await compress();
