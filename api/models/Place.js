import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkInTime: Number,
    checkOutTime: Number,
    maxGuests: Number,
    pricePerNight: Number,
})

export const PlaceModel = mongoose.model('Place', placeSchema);