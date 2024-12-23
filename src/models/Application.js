import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    jobId: {type: String, required: true},
    name: { type: String, required: true },
    contact: { type: String, required: true },
    // jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);