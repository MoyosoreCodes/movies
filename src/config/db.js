const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Moyosore:Moyosore12@cluster0.ky9jk.mongodb.net/movies?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
    return connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

