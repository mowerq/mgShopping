const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email!"],
      unique: [true, "Email address already taken!"],
    },
    password: {
      type: String,
      required: [true, "Please enter the password!"],
    },
    cart: {
      products: {
        type: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            productPrice: {
              type: Number,
              required: [true, "Price is required"],
            },
            quantity: {
              type: Number,
              default: 1,
            },
            imgUrl: {
              type: String,
              required: [true, "Url is required"],
            },
            category: {
              type: String,
            },
            name: {
              type: String,
              required: [true, "Enter a product name!"],
            },
          },
        ],
        default: [],
      },
      totalCost: {
        type: Number,
        default: 0,
      },
    },
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order",
          default: [],
        },
      },
    ],
    reviews: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          comment: {
            type: String,
            default: "",
          },
          numStars: {
            type: Number,
            required: [true, "Please select stars"],
          },
        },
      ],
      default: [],
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
