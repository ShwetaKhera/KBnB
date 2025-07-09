import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pricePerNight: Number
})

export const BookingModel = mongoose.model('Booking', bookingSchema)