import Customer from "../models/Customer.js";
import csv from "fast-csv";
import fs from "fs";

export const importCustomers = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  let customers = [];
  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("data", (row) => {
      customers.push({
        businessId: req.business.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        referralCode: Math.random().toString(36).substr(2, 8),
      });
    })
    .on("end", async () => {
      await Customer.insertMany(customers);
      fs.unlinkSync(req.file.path);
      res.status(201).json({ message: "Customers imported successfully" });
    });
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ businessId: req.business.id });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
