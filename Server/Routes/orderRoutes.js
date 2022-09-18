import express from "express";
import asyncHandler from "express-async-handler";
import protect from "./../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";

const orderRouter = express.Router();

//CREATE ORDER
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      // user :  req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No items in cart");
      return;
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  })
);

//USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.status(200).json(order);
  })
);

// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
    // res.status(200).json(order);
  })
);

// UPDATE ORDER TO PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);
export default orderRouter;
