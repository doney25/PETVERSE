import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                // This regular expression ensures that only alphabets are allowed (no numbers)
                return /^[A-Za-z\s]+$/.test(v);  // Allows letters and spaces
            },
            message: props => `${props.value} is not a valid name! It should only contain letters and spaces.`
        }
    },
    email: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ["buyer", "seller", "admin"], 
        required: true 
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
