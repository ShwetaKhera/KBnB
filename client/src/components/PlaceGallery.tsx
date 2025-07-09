import { useState } from "react";

export default function PlaceGallery({place}) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-w-full min-h-screen">
                <div className="grid gap-4">
                    <div className="flex fixed w-full bg-white text-gray-800 p-6 shadow shadow-black-500">
                        <button
                            onClick={(ev) => setShowAllPhotos(false)}
                            className=" flex gap-1 py-2 px-4 rounded-md bg-transparent border border-black shadow shadow-gray-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 -ml-2">
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                            </svg>
                            Back
                        </button>
                        <h2 className="text-3xl w-full  ml-10 truncate content-center">Photos of {place?.title}</h2>
                    </div>
                    <div className="mt-24">
                        {
                            place?.photos?.length > 0 && place?.photos?.map((photo: string) => (
                                <div key={photo} className="mx-8 my-4">
                                    <img src={"http://localhost:4000/uploads/" + photo} alt="" />
                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>
        )
    }
    return (
        <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                        <div>
                            {place?.photos?.[0] && (
                                <div >
                                    <img onClick={() => setShowAllPhotos(true)} src={"http://localhost:4000/uploads/" + place?.photos?.[0]} alt="" className="aspect-square cursor-pointer object-cover" />
                                </div>
                            )}
                        </div>
                        <div className="grid">
                            <div>
                                {place?.photos?.[1] && (
                                    <img onClick={() => setShowAllPhotos(true)}  src={"http://localhost:4000/uploads/" + place?.photos?.[1]} alt="" className="aspect-square cursor-pointer object-cover" />
                                )}
                            </div>
                            <div className="overflow-hidden">
                                {place?.photos?.[2] && (
                                    <img onClick={() => setShowAllPhotos(true)}  src={"http://localhost:4000/uploads/" + place?.photos?.[2]} alt="" className="aspect-square cursor-pointer object-cover relative top-2" />
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={(ev) => setShowAllPhotos(true)}
                        className="flex gap-1 absolute bottom-2 right-2 py-2 pr-4 pl-3 bg-white rounded-md shadow shadow-md shadow-gray-500"
                    >
                        <div className="content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 -mt-2 mb-0">
                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 -mt-4 mb-0">
                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 -mt-4 -mb-2">
                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                            </svg>

                        </div>
                        Show more photos
                    </button>
                </div>

    )
}