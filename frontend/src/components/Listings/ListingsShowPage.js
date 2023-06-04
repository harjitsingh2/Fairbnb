import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { fetchListing } from "../../store/listings";
import image from '../../image/image.webp'

const ListingsShowPage = ( ) => {
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const [errors, setErrors] = useState([]);

    const listing = useSelector((state) => state.listings[listingId]);
    

    useEffect(() => {
        // debugger 
        dispatch(fetchListing(listingId)).catch(async (response) => {
            let data;
            try {
                data = await response.clone().json();
            } catch {
                data = await response.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([response.statusText]);

            console.log(listing.id)
            return data;
        })
    }, [dispatch])

    if (!listing) {
        return (
            <div>Page does not exist</div>
        )
    }
    
    return (
        <div className="listings-show">
            <div className="show-heading-container">
                <h1 className="listing-title-show">{listing.title}</h1>
                <p>{listing.city}, {listing.state}</p>
            </div>
            <div className="show-pic-container">
                <div><img src={image} className="show-main-pic" alt="" /></div>
            </div>
            <div className="show-body-container">
                <div className="show-body-info">
                    <p>Host information</p>
                    <div className="main-features">
                        <span>{listing.maxGuests} guests | </span>
                        <span>{listing.numBedrooms} bedrooms | </span>
                        <span>{listing.numBeds} beds | </span>
                        <span>{listing.numBathrooms} baths</span>
                    </div>
                    <div className="description">{listing.description}</div>
                    <div className="amenities">
                        <h2>What this place offers</h2>
                        <ul>Amenity 1</ul>
                        <ul>Amenity 2</ul>
                        <ul>Amenity 3</ul>
                        <ul>Amenity 4</ul>
                    </div>
                    <p>Calendar</p>
                </div>
                <div className="show-body-reservation">
                    <p>Reservation Component</p>
                </div>
            </div>
            <div className="show-reviews-container">
                <p>Reviews Component</p>
            </div>
            <div className="show-map-container">
                <p>Map</p>
            </div>
        </div>
    )
}

export default ListingsShowPage;