const verifyAuth = require('../../middleware/verifyToken/verifyToken');
const Cart = require('../../models/carts/Cart');
const router = require('express').Router();


//CREATE CART
router.post('/', [verifyAuth.verifyToken], async (req,res) =>{
    const cart = new Cart(req.body);

    try {
        const saveCart = await cart.save();
        res.status(201).json(saveCart);
        console.log(saveCart);
    } catch (error) {
        res.status(500).json(error);
        console.oog(error);
    }
});

//UPDATE CART
router.put('/:id', [verifyAuth.verifyToken], async (req, res) =>{
    try {
        const newCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, 
            {new: true},
        )

        res.status(201).json(newCart)
        console.log(newCart)
    } catch (error) {
        res.status(500).json(newCart);
        console.log(newCart)
    }
});

//DELETE CART
router.delete('/:id', [verifyAuth.verifyToken], async (req, res) =>{
    try {
        await Cart.findByIdAndDelete();
        res.status(200).send({message: 'cart  has been deleted'});
        console.log("Cart has been deleted")

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

//GET USER CART
router.get('/find/:userId', async(req, res) =>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
        console.log(cart);
        
    } catch (error) {
        res.status(400).send({message: 'Product ID does not exist'});
        console.log(error);
    }

});


//GET ALL ;
router.get('/', async (req, res) =>{
  try {
    
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;