import fs from 'fs/promises';
import path from 'path';

const remove = async () => {
    const filePath = path.join('files', 'fileToRemove.txt');
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log('File successfully deleted');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed: File does not exist');
        } else {
            throw new Error(`FS operation failed: ${error.message}`);
        }
    }
};

await remove();
