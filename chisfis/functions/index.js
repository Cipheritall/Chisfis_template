const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51Jn1M5D6QVbbUe2SekLTax2e73HRPLvgooIAI0KCK2i9wbQ7SwrkLfs2jBULxLMJyvb1kMV3IfVk7u5Vq3cjAefC00o7d4uK1n"
);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Api routes
app.get("/test", (request, response) =>
  response.status(200).send("hello world")
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request recieved");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  console.log(paymentIntent);

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
    statusType: "success",
  });

  response.status(402).send({
    // errorMessage: paymentIntent.error.message,
    errorMessage: "Something went Wrong!",
    statusType: "failure",
  });
});

//Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/testandtrip/us-central1/api
