import * as mongoose from 'mongoose';

export interface Sample {
    name: String
}

const SampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model<Sample & mongoose.Document>('Sample', SampleSchema);
