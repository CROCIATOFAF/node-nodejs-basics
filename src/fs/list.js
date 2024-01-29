import fs from 'fs/promises';
import path from 'path';

const list = async () => {
    const folderPath = path.join('files');

    try {
        await fs.access(folderPath);
        const fileNames = await fs.readdir(folderPath);
        console.log(fileNames);
    } catch (error) {
        throw new Error(`FS operation failed: ${error.message}`);
    }
};

await list();
