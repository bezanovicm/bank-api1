import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  jmbg: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  accountNumber: { type: String, required: true, unique: true },
  accountType: { type: String, required: true },
  currency: { type: String, required: true },
  bankName: { type: String, required: true },
  balance: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Account', accountSchema);
