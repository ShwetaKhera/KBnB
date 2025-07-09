import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(user) {
            setName(user.name)
        }
    }, [user])
    function getNoOfDays() {
        if(checkIn.length > 0 && checkOut.length > 0) {
            return differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
        }
    }
    async function finishBooking(ev: any) {
        ev.preventDefault();
        const data = {
            place: place._id,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            noOfGuests, 
            name,
            phoneNumber,
            pricePerNight: place?.pricePerNight,
        }
        const res = await axios.post('/booking', data);
        const bookingId = res.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect && redirect.length > 0) {
        return (
            <Navigate to={redirect}/>
        )
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <h2 className="text-2xl text-center">
                Price: ${place?.pricePerNight} / per night
            </h2>
            <div className="border rounded-xl flex mt-4">
                <div className="border-r p-4 ">
                    <label>Check in:</label>
                    <input type="date" name="" id="" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                </div>
                <div className="border-l p-4">
                    <label>Check out:</label>
                    <input type="date" name="" id="" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                </div>
            </div>
            <div className="border-t p-2">
                <label>Number of guests:</label>
                <input type="number" name="" id="" value={noOfGuests} onChange={ev => setNoOfGuests(ev.target.value)} />
            </div>
            {
                getNoOfDays() && (
                <div className="border-t p-2">
                        <label>Your Full Name: </label>
                        <input type="text" name="" id="" value={name} onChange={ev => setName(ev.target.value)} />
                        <label>Phone Number: </label>
                        <input type="tel" name="" id="" value={phoneNumber} onChange={ev => setPhoneNumber(ev.target.value)} />
                </div>
                )
            }
            <button onClick={finishBooking} className="primary mt-4">
                Book
                {getNoOfDays() && (
                    <span> for ${getNoOfDays() * place?.pricePerNight}</span>
                ) }
            </button>
        </div>
    )
}