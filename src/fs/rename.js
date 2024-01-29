import fs from 'fs/promises';
import path from 'path';

const rename = async () => {
    // Write your code here 
    const folderPath = 'files';
    const oldFileName = 'wrongFilename.txt';
    const newFileName = 'properFilename.md';

    const filePath = path.join(folderPath, oldFileName);

    try {
        await fs.access(filePath);
        const newFilePath = path.join(folderPath, newFileName);
        await fs.rename(filePath, newFilePath);
        console.log('File successfully renamed');
    } catch (error) {
        throw new Error(`FS operation failed: ${error.message}`);
    }
};

await rename();