const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    unique: true,
  },
  email: String,
  address: {
    street: String,
    locality: String,
    city: String,
    state: String,
    pincode: String,
    coordinatesType: String,
    coordinates: [Number],
  },
});

userSchema.pre("save", function(next) {
  var user = this;

  User.findOne({mobile : user.mobile}, 'mobile', function(err, results) {
      if(err) {
          next(err);
      } else if(results) {
          next(new Error("Mobile Number Must Be Unique"));
      } else {
          next();
      }
  });
});

userSchema.set("timestamps", true);

const User = mongoose.model("User", userSchema);
module.exports = User;
