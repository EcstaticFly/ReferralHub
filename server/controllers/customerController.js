import Customer from "../models/customer.js";
import csv from "fast-csv";
import fs from "fs";
import crypto from "crypto";

const generateUniqueReferralCode = async () => {
  let referralCode;
  let exists = true;

  while (exists) {
    referralCode = crypto.randomBytes(4).toString("hex"); // Generates an 8-character code
    const existingCustomer = await Customer.findOne({ referralCode });
    exists = !!existingCustomer; // If found, keep generating
  }

  return referralCode;
};

export const importCustomers = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });
    
    // Fetch existing customer emails for the business
    const existingCustomers = await Customer.find({ businessId: req.user.id }).select("email");
    const existingEmails = new Set(existingCustomers.map((customer) => customer.email));

    let rows = [];
    fs.createReadStream(req.file.path)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", async () => {
        let newCustomers = [];
        // Process each row sequentially (or you could use Promise.all for parallel processing)
        for (const row of rows) {
          if (!existingEmails.has(row.email)) {
            const referralCode = await generateUniqueReferralCode(); // Ensure uniqueness
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
        fs.unlinkSync(req.file.path);
        res.status(201).json({
          message: "Customers imported successfully",
          importedCount: newCustomers.length,
        });
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server error" });
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
