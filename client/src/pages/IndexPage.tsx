import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/all-places').then(({data}) => {
            setPlaces(data);
        })
    }, []);
    function formatAddress(address: string){
        const splitAddress : string[] = address.split(',');
        const countryPos : number = splitAddress.length - 1;
        const cityPos : number = splitAddress.length - 2;
        let newAddress : string = '';
        if(cityPos >= 0){
            newAddress += splitAddress[cityPos];
        } 
        if(countryPos >= 0){
            newAddress += newAddress.length > 0 ? ', ':''; 
            newAddress += splitAddress[countryPos];
        }
        if(newAddress.length === 0) {
            newAddress = address
        }
        return newAddress
    }
    return (
        <>
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {places.length > 0 && places.map((place) => (
                    <Link to={'/place/' + place._id}>
                        <div className="bg-gray-500 mb-2 rounded-xl flex">
                            {place?.photos?.[0] &&
                                <img className="rounded-xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place?.photos?.[0]} alt="" />
                            }
                        </div>
                        <h2 className="font-bold">{formatAddress(place.address)}</h2>
                        <h3 className="text-sm text-gray-500">{place.title}</h3>
                        <p className="mt-1"><span className="font-bold">${place.pricePerNight}</span> per night</p>
                    </Link>
                ))}
            </div>
        </>
    )
}