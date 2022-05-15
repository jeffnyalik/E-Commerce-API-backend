const verifyAuth = require('../../middleware/verifyToken/verifyToken');
const Order = require('../../models/orders/Order');
const router = require('express').Router();


//SAVE ORDER
router.post('/', [verifyAuth.verifyToken], async (req,res) =>{
    const newOrder = new Order(req.body);

    try {
        const order = await newOrder.save();
        res.status(201).json(order);
        console.log(order);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

//UPDATE
router.put('/:id', [verifyAuth.verifyToken], async (req, res) =>{
    try {
        const newOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, 
            {new: true},
        )

        res.status(201).json(newOrder)
        console.log(newOrder)
    } catch (error) {
        res.status(500).json(newOrder);
        console.log(newOrder)
    }
});

//DELETE
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

//GET USER ORDER
router.get('/find/:userId', async(req, res) =>{
    try {
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
        console.log(orders);
        
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


// GET MONTHLY INCOME

router.get("/income", [verifyAuth.verifyToken], async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
      console.log(income)
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;