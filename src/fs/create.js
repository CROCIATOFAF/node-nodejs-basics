import path from 'path';
import fs from 'fs/promises';

const create = async () => {
    const filePath = path.join(path.resolve(), 'files', 'fresh.txt');
    console.log(filePath);
    try {
        await fs.access(filePath);
        throw new Error('FS operation failed: File already exists');
    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                await fs.writeFile(filePath, 'I am fresh and young');
                console.log('File created successfully');
            } catch (writeError) {
                throw new Error(`Error while creating file: ${writeError.message}`);
            }
        } else {
            throw new Error(`Error checking file existence: ${error.message}`);
        }
    }
};

await create();
