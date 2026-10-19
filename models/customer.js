const mongoose =require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
  });
  const Customer = mongoose.model("Customer", customerSchema);