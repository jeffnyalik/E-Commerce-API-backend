const verifyAuth = require('../../middleware/verifyToken/verifyToken');
const Product = require('../../models/products/Product');
const router = require('express').Router();


//GET PRODUCTS
router.post('/', [verifyAuth.verifyToken], async (req,res) =>{
    const product = new Product(req.body);

    try {
        const saveProduct = await product.save();
        res.status(201).json(saveProduct);
        console.log(saveProduct);
    } catch (error) {
        res.status(500).json(error);
        console.oog(error);
    }
});

//UPDATE PRODUCT
router.put('/:id', [verifyAuth.verifyToken], async (req, res) =>{
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, 
            {new: true},
        )

        res.status(201).json(updateProduct)
        console.log(updateProduct)
    } catch (error) {
        res.status(500).json(updateProduct);
        console.log(updateProduct)
    }
});

//DELETE PRODUCT
router.delete('/:id', [verifyAuth.verifyToken], async (req, res) =>{
    try {
        await Product.findByIdAndDelete();
        res.status(200).send({message: 'product has been deleted'});
        console.log("Product has been deleted")

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

//GET SINGLE PRODUCT
router.get('/:id', async(req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
        console.log(product);
        
    } catch (error) {
        res.status(400).send({message: 'Product ID does not exist'});
        console.log(error);
    }

});


//GET ALL PRODUCTS;
router.get('/', async (req, res) =>{
  const qNew = req.query.new;
  const qCategory = req.query.category;
  
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;