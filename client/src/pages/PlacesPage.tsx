import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlaceForm from "../components/PlaceForm";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {
    const { action, id } = useParams();
    
    const [places, setPlaces] = useState([])
    
    useEffect(() => {
        if(!action && !id){
            axios.get('/places').then(({ data }: any) => {
                setPlaces(data);
            })    
        } 
    }, [])

    return (
        <div>
            {(action !== 'new' && !id) && (
                <>
                    <div className="text-center">
                        <Link
                            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                            to={'/account/places/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add new place
                        </Link>
                    </div>
                    <div className="mt-4">
                        {
                            places?.length > 0 && places?.map((place) => (
                                <Link to={'/account/places/' + place._id} key={place.id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-md my-4">
                                    <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                                        <PlaceImg place={place}/>
                                    </div>
                                    <div className="grow-0 shrink">
                                        <h2 className="text-xl">{place.title}</h2>
                                        <p className="text-sm mt-2 ">{place.description}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </>

            )}
            {(action === 'new' || !!id) && (
                <PlaceForm />
            )}
        </div>
    )
}