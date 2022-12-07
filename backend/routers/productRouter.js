import express from 'express';
import expressAysncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../util.js';
import Product from '../models/productModel';

// replace to get products
const productRouter = express.Router();
productRouter.get("/", expressAysncHandler(async(req,res) => {
const products = await Product.find({})
res.send(products)
}))
// to get products with id we need for example for orders and product screen
productRouter.get("/:id", expressAysncHandler(async(req,res) => {
const product = await Product.findById(req.params.id)
res.send(product)
}))
productRouter.post( '/',isAuth,isAdmin, expressAysncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample product',
      category: 'sample category',
      image: './images/Asset1.png',
      Sauce: "sample product",
      Topping: "sample product",
      Roling: "sample roling",
      Filling: "sample filling",
      Glaze: "sample glase"

    })
    const createdProduct = await product.save()
    if (createdProduct) {
      res
        .status(201)
        .send({ message: 'Product Created', product: createdProduct })
    } else {
      res.status(500).send({ message: 'Error in creating product' })
    }
  })
)

productRouter.put('/:id', isAuth, isAdmin,
  expressAysncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name,
      product.price = req.body.price,
      product.image = req.body.image,
      product.category = req.body.category,
      product.Sauce = req.body.Sauce,
      product.Topping = req.body.Topping,
      product.count = req.body.count,
      product.Roling = req.body.Roling,
      product.Filling = req.body.Filling,
      product.Glaze = req.body.Glaze
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(500).send({ message: 'Error in updaing product' });
      }
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
)

productRouter.delete("/:id", isAuth, isAdmin, expressAysncHandler( async ( req,res ) => {
const product = await Product.findById(req.params.id)
if(product) {
  const deletedProduct = await product.remove()
  res.send({message: "Product Deleted", product: deletedProduct})
} else {
  res.status(404).send({message: "Product not Found"})
}
}))

export default productRouter;