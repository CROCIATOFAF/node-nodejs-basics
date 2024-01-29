import fs from 'fs/promises';
import path from 'path';

const copy = async () => {
    const sourceDir = path.join(path.resolve(), 'files');
    const targetDir = path.join(path.resolve(), 'files_copy');

    try {
        await fs.access(sourceDir);
    } catch {
        throw new Error('FS operation failed: Source directory does not exist');
    }

    try {
        await fs.access(targetDir);
        throw new Error('FS operation failed: Target directory already exists');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    const copyContents = async (source, target) => {
        await fs.mkdir(target, { recursive: true });
        const entries = await fs.readdir(source, { withFileTypes: true });
        for (let entry of entries) {
            const srcPath = path.join(source, entry.name);
            const tgtPath = path.join(target, entry.name);
            if (entry.isDirectory()) {
                await copyContents(srcPath, tgtPath);
            } else {
                await fs.copyFile(srcPath, tgtPath);
            }
        }
    };

    try {
        await copyContents(sourceDir, targetDir);
        console.log('Copy completed successfully');
    } catch (error) {
        throw new Error(`Error during copy: ${error.message}`);
    }
};

await copy();
