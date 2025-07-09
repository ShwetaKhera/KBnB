export default function PlaceImg({place, index=0, className=null}) {
    if(!place.photos?.length) {
        return <></>
    }
    if(!className) {
        className = 'aspect-square cursor-pointer object-cover' as any
    }
    return (
        <img src={"http://localhost:4000/uploads/" + place?.photos?.[index]} alt="" className={className as any}/>
           
    )
}