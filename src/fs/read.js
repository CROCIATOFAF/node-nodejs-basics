import fs from 'fs/promises';
import path from 'path';

const read = async () => {
    const filePath = path.join('files', 'fileToRead.txt');
    try {
        await fs.access(filePath);
        const content = await fs.readFile(filePath, 'utf8');
        console.log(content);
    } catch (error) {
        throw new Error(`FS operation failed: ${error.message}`);
    }
};

await read();
