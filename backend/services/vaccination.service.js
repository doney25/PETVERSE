import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Pet from "../models/pets.model.js";

dotenv.config(); // Load environment variables

// Configure email sender using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use email from .env
    pass: process.env.EMAIL_PASS, // Use App Password from .env
  },
});

// Function to send vaccination reminder email
const sendReminderEmail = async (pet, vaccine) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: pet.buyerEmail,
    subject: `Vaccination Reminder for ${pet.name}`,
    text: `Dear Pet Owner,

This is a reminder that your pet, ${pet.name}, is due for the ${
      vaccine.vaccineName
    } vaccine on ${new Date(vaccine.dueDate).toDateString()}.

Please ensure timely vaccination for your pet's health.

Best regards,
Petverse Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Reminder sent to ${pet.buyerEmail} for ${pet.name}`);
  } catch (error) {
    console.error(`Error sending email to ${pet.buyerEmail}:`, error.message);
  }
};

cron.schedule("* * * * *", async () => {
  console.log("Running vaccination reminder check...");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize start of today

  const upcomingDate = new Date();
  upcomingDate.setDate(today.getDate() + 7); // 7 days ahead

  try {
    const pets = await Pet.find({
      category: { $in: ["dog", "cat"] },
      buyerEmail: { $ne: "", $nin: [null, undefined] },
      vaccinations: {
        $elemMatch: {
          dueDate: { $gte: today, $lte: upcomingDate }, // Between today and next 7 days
          completed: false, // Not completed
        },
      },
    });

    if (pets.length === 0) {
      console.log("No upcoming vaccinations in the next 7 days.");
      return;
    }

    for (const pet of pets) {
      for (const vaccine of pet.vaccinations) {
        const dueDate = new Date(vaccine.dueDate);
        if (!vaccine.completed && dueDate >= today && dueDate <= upcomingDate) {
          await sendReminderEmail(pet, vaccine);
          await Pet.updateOne(
            { _id: pet._id, "vaccinations._id": vaccine._id },
            { $set: { "vaccinations.$.completed": true } }
          );
        }
      }
    }

    console.log(`✅ Processed ${pets.length} pets for vaccination reminders.`);
  } catch (error) {
    console.error("Error fetching pets for reminders:", error.message);
  }
});

console.log("Vaccination reminder service started...");
