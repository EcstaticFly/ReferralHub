import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
  campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }],
  createdAt: { type: Date, default: Date.now },
});

const Business = mongoose.model('Business', businessSchema);

 export default Business;
