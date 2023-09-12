import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: { type: string, required: true },
    descript: { type: string, required: true },
    isVeg: { type: Boolean, required: true },
    isContainsEgg: { type: Boolean, required: true },
    category: { type: string, required: true },
    photos: {
        type: mongoose.Types.ObjectId,

        ref: "images",
    },
    price: { type: Number, default: 150, required: true },
    addOns: [
        {
            type: mongoose.Types.ObjectId,

            ref: "foods",
        }
    ],
    restaurant: {
        type: mongoose.Types.ObjectId,

        ref: "restaurants",
        required: true,
    },

}, {
    timestamps: true
})


export const FoodModel = mongoose.model("food", FoodSchema)