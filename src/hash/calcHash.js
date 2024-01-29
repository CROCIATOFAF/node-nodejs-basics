import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    try {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const filePath = path.join(__dirname, './files/fileToCalculateHashFor.txt');
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);

        for await (const chunk of stream) {
            hash.update(chunk);
        }

        const digest = hash.digest('hex');
        console.log(digest);
    } catch (error) {
        throw new Error(`Error calculating hash: ${error.message}`);
    }
};

await calculateHash();
