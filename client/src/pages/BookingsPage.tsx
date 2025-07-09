import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import BookingDate from "../components/BookingDate";
import PlaceImg from "../components/PlaceImg";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        axios.get('/bookings').then((res: any) => {
            const {data} = res;
            setBookings(data);
        })
    }, [])

    function getNumberOfDays(booking) {
        const checkOut = new Date(booking.checkOut)
        const checkIn = new Date(booking.checkIn)
        return differenceInCalendarDays(checkOut, checkIn);
    }
    return (
        <>
            <AccountNav subpage={'bookings'}/>
            {
                bookings && bookings.map((booking : any) => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-100 rounded-md overflow-hidden">
                        <div className="w-48">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <BookingDate booking={booking} className="mt-8 text-gray-500"/>  
                          
                           <div className="flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                <span className="text-xl">
                                Total Price: ${booking.pricePerNight * getNumberOfDays(booking)}
                                </span>
                           </div>
                        
                        </div>
                        
                    </Link>
                ))
            }
        </>
    )
}