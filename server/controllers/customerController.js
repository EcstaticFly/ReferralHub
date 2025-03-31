import Customer from "../models/customer.js";
import csv from "fast-csv";
import fs from "fs";
import crypto from "crypto";

const generateUniqueReferralCode = async () => {
  let referralCode;
  let exists = true;

  while (exists) {
    referralCode = crypto.randomBytes(4).toString("hex");
    const existingCustomer = await Customer.findOne({ referralCode });
    exists = !!existingCustomer;
  }

  return referralCode;
};

export const importCustomers = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const existingCustomers = await Customer.find({ businessId: req.user.id }).select("email");
    const existingEmails = new Set(existingCustomers.map((customer) => customer.email));

    let rows = [];
    const bufferString = req.file.buffer.toString('utf-8');
    const stream = csv.parse({ headers: true });
    
    stream.on('data', (row) => {
      rows.push(row);
    });

    stream.on('end', async () => {
      let newCustomers = [];

      for (const row of rows) {
        if (!existingEmails.has(row.email)) {
          const referralCode = await generateUniqueReferralCode(); 
          newCustomers.push({
            businessId: req.user.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            referralCode,
          });
        }
      }
      if (newCustomers.length > 0) {
        await Customer.insertMany(newCustomers);
      }
      res.status(201).json({
        message: "Customers imported successfully",
        importedCount: newCustomers.length,
      });
    });

    stream.write(bufferString);
    stream.end();

  } catch (error) {
    console.error("Error importing customers:", error);
    res.status(500).json({ message: "Error importing customers" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ businessId: req.user.id });
    const totalRewards = customers.reduce(
      (acc, customer) => acc + (customer.rewardsEarned || 0),
      0
    );
    res.json({ customers, totalRewards });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
