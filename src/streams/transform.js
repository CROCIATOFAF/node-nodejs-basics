import { Transform } from 'stream';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

const reverseTextTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().split('').reverse().join(''));
        callback();
    }
});

const transform = async () => {
    try {
        await pipelineAsync(
            process.stdin,
            reverseTextTransform,
            process.stdout
        );
    } catch (error) {
        throw new Error(`Error in transformation: ${error.message}`);
    }
};

await transform();
