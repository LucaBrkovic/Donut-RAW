import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    Sauce: { type: String, required: true },
    category: { type: String, required: true },
    Topping: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, default: 0.0, required: true },
    count: { type: Number, default: 0, required: true },
    Roling: { type: String, required: true },
    Filling: { type: String,  required: true },
    Glaze: { type: String,  required: true },
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
export default Product;