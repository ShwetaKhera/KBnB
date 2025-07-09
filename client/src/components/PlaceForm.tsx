import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotoUploader from "./PhotoUploader";

export default function PlaceForm() {
    const [title, setTitle] = useState('');
    const [photos, setPhotos] = useState([]);
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [pricePerNight, setPricePerNight] = useState(1);
    const [redirect, setRedirect] = useState<string>();
    const { id } = useParams();

    useEffect(() => {
        if(id && id!=='new'){
            axios.get('/places/' + id).then(({data}) => {
                setPlaceData(data);
            })
        }
    }, [id])

    function setPlaceData(place: any) {
        if(!place) return;

        setTitle(place.title);
        setPhotos(place.photos);
        setAddress(place.address);
        setDescription(place.description);
        setPerks(place.perks);
        setExtraInfo(place.extraInfo);
        setCheckInTime(place.checkInTime);
        setCheckOutTime(place.checkOutTime);
        setMaxGuests(place.maxGuests);
        setPricePerNight(place.pricePerNight);
    }
    function inputHeader(headerText: string, headerDesc: string) {
        return (
            <>
                <h2 className="text-xl mt-4">{headerText}</h2>
                <p className="text-gray-500 text-sm">{headerDesc}</p>
            </>
        )
    }

    async function savePlace(ev: any) {
        ev.preventDefault();
        const data: any = {
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkInTime,
            checkOutTime,
            maxGuests,
            pricePerNight
        }
        if(id && id !== 'new') {
            await axios.put('/updatePlace', {...data, id});
        } else {
            await axios.post('/addPlace', data);
        }   
        setRedirect('/account/places');
    }


    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <>
            <form onSubmit={savePlace}>
                {inputHeader('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My apartment"></input>

                {inputHeader('Address', 'Address to your place')}
                <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"></input>

                {inputHeader('Photos', 'more = better')}
                <PhotoUploader photos={photos} onChange={setPhotos} />

                {inputHeader('Description', 'description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                {inputHeader('Perks', 'select all the perks of your place')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {inputHeader('Extra Info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {inputHeader('Check-in & Check-out times', 'add check-in and check-out times, remember to have some time window for cleaning the room between guests')}
                <div className="grid gap-2 sm:grid-cols-2 ">
                    <div>
                        <h3 className="mt-2 -mb-1">Check-in time</h3>
                        <input type="text" value={checkInTime} onChange={ev => setCheckInTime(ev.target.value)} placeholder="14:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check-out time</h3>
                        <input type="text" value={checkOutTime} onChange={ev => setCheckOutTime(ev.target.value)} placeholder="14:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price Per Night</h3>
                        <input type='number' value={pricePerNight} onChange={ev => setPricePerNight(ev.target.value)} placeholder="1" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max no. of guests</h3>
                        <input type='number' value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="1" />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </>
    )
}