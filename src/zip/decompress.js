import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const decompress = async () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const compressedDir = path.join(__dirname, 'files', 'compressed');
        const decompressedDir = path.join(__dirname, 'files', 'decompressed');
        const sourceFilePath = path.join(compressedDir, 'archive.gz');
        const destinationFilePath = path.join(decompressedDir, 'fileToCompress.txt');

        if (!fs.existsSync(compressedDir)) {
            fs.mkdirSync(compressedDir, { recursive: true });
        }

        if (!fs.existsSync(decompressedDir)) {
            fs.mkdirSync(decompressedDir, { recursive: true });
        }

        const gunzip = zlib.createGunzip();
        const source = fs.createReadStream(sourceFilePath);
        const destination = fs.createWriteStream(destinationFilePath);

        await pipelineAsync(
            source,
            gunzip,
            destination
        );
        console.log('File decompressed successfully.');
    } catch (error) {
        throw new Error(`Error during decompression: ${error.message}`);
    }
};

await decompress();
