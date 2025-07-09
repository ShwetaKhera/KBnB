import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../components/AddressLink";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) return;

        axios.get(`/places/${id}`).then(({ data }) => {
            setPlace(data)
        })
    }, [id])

    
    return (
        <>
            <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
                <h1 className="text-3xl ">{place?.title}</h1>
                <AddressLink place={place} />
                <PlaceGallery place={place}/>
                <div className="mt-8 mb-4 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div className="">
                        <div className="my-4">
                            <h2 className="font-semi-bold text-2xl">Description</h2>
                            {place?.description}
                        </div>
                        Check-in: {place?.checkInTime} <br />
                        Check-out: {place?.checkOutTime} <br />
                        Max Number of Guests: {place?.maxGuests}
                    </div>
                    <BookingWidget place={place}/>
                </div>
                <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <h2 className="font-semi-bold text-2xl">Extra Info</h2>
                    <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">NOTE: {place?.extraInfo}</div>
                </div>
            </div>
        </>
    )
}