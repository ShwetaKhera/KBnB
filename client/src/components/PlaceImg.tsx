export default function PlaceImg({place, index=0, className=null} : any) {
    if(!place.photos?.length) {
        return <></>
    }
    if(!className) {
        className = 'aspect-square cursor-pointer object-cover' as any
    }
    return (
        <img src={import.meta.env.VITE_API_URL + "/uploads/" + place?.photos?.[index]} alt="" className={className as any}/>
           
    )
}