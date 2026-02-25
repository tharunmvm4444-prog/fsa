const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, currency, listingId, businessId } = req.body;

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: currency || 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const rzpOrder = await razorpay.orders.create(options);

        const newOrder = new Order({
            userId: req.user._id,
            businessId,
            listingId,
            amount,
            razorpayOrderId: rzpOrder.id
        });

        await newOrder.save();
        res.send(rzpOrder);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    paymentStatus: 'paid',
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature
                }
            );
            res.send({ status: 'payment verified successfully' });
        } else {
            res.status(400).send({ error: 'invalid signature' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
