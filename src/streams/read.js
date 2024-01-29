import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const filePath = path.join(__dirname, './files/fileToRead.txt');

        const stream = fs.createReadStream(filePath);

        stream.on('data', (chunk) => process.stdout.write(chunk));
        stream.on('error', (error) => {
            throw new Error(`Error reading file: ${error.message}`);
        });
    } catch (error) {
        throw error;
    }
};

await read();
