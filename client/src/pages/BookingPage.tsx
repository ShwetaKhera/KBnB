import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../components/AddressLink";
import BookingDate from "../components/BookingDate";
import PlaceGallery from "../components/PlaceGallery";

type Booking = {
    _id: string;
    userId: Object,
    checkIn: Date,
    checkOut: Date,
    name: String,
    phoneNumber: String,
    pricePerNight: Number
    place : {
        owner: Object,
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
    }
};

export default function BookingPlace() {
    const {id} = useParams();
    const [booking, setBooking] = useState<Booking | null>(null);
    function getNoOfDays() {
        const {checkIn, checkOut} : any  = booking || {};
        if(checkIn && checkOut && checkIn.length > 0 && checkOut.length > 0) {
            return differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
        }

        return 0
    }
    useEffect(() => {
        if(id) {
            axios.get(`/bookings/${id}`).then((res) => {
                const {data} = res;
                setBooking(data)
            })
        }
    }, [id])

    if(!booking) {
        return (
            <></>
        )
    }
    return (
        <div className="my-8">
            <h1 className="text-3xl mb-4">{booking?.place?.title}</h1>
            <div className="flex shadow shadow-gray-400 p-6 mb-6 rounded-2xl justify-between items-center">
                <div>
                    <h2 className="text-2xl mb-2">Booking Information: </h2>
                    <BookingDate booking={booking} className="" />
                </div>
                <div className="bg-primary p-4 text-white rounded-2xl text-center">
                    <div>Total Price</div>
                    <div className="text-3xl">${getNoOfDays() * Number(booking.place?.pricePerNight)}</div>
                </div>
            </div>
            <AddressLink place={booking.place}/>
            <PlaceGallery place={booking.place}/>
        </div>
    )
}