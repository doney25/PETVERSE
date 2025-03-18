import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Pet from "../models/pets.model.js"; 

dotenv.config(); // Load environment variables

// Configure email sender using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Use email from .env
    pass: process.env.EMAIL_PASS,  // Use App Password from .env
  },
});

// Function to send vaccination reminder email
const sendReminderEmail = async (pet, vaccine) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Use configured email
    to: pet.buyerEmail,
    subject: `Vaccination Reminder for ${pet.name}`,
    text: `Dear Pet Owner,\n\nThis is a reminder that your pet, ${pet.name}, is due for the ${vaccine.vaccineName} vaccine on ${new Date(vaccine.dueDate).toDateString()}.\n\nPlease ensure timely vaccination for your pet's health.\n\nBest regards,\nPetverse Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to ${pet.buyerEmail} for ${pet.name}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Scheduled job to check vaccinations daily (Only for dogs & cats)
cron.schedule("0 9 * * *", async () => {
  console.log("Running vaccination reminder check...");

  const today = new Date();
  const upcomingDate = new Date();
  upcomingDate.setDate(today.getDate() + 7); // Remind 7 days before

  try {
    const pets = await Pet.find({
      category: { $in: ["dog", "cat"] }, // Only dogs and cats
      vaccinations: { $elemMatch: { dueDate: { $lte: upcomingDate }, completed: false } },
    });

    pets.forEach((pet) => {
      pet.vaccinations.forEach((vaccine) => {
        if (!vaccine.completed && new Date(vaccine.dueDate) <= upcomingDate) {
          sendReminderEmail(pet, vaccine);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching pets for reminders:", error);
  }
});

console.log("Vaccination reminder service started...");
