import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  transactionType: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now, required: true }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
