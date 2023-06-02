import csrfFetch from "./csrf.js";

// Action Constants
const RECEIVE_LISTING = 'listings/RECEIVE_LISTING';
const RECEIVE_LISTINGS = 'listings/RECEIVE_LISTINGS';

// Action Creators
export const receiveListing = (listing) => ({
    type: RECEIVE_LISTING,
    payload: listing
});

export const receiveListings = (listings) => ({
    type: RECEIVE_LISTINGS,
    payload: listings 
})

// Selectors 
export const getListing = (listingId) => (state) => {
    if (state.listings) {
        return (state.listings[listingId])
    } else {
        return null 
    }
}

export const getListings = (state) => {
    if (state.listings) {
        return Object.values(state.listings)
    } else {
        return []
    }
}

// Thunk Action Creators
export const fetchListing = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`);

    const data = await response.json();
    dispatch(receiveListing(data));
    // return response;
}

export const fetchListings = () => async (dispatch) => {
    const response = await csrfFetch("/api/listings");

    const data = await response.json();
    dispatch(receiveListings(data));
    // return response;
}


// Listings Reducer
const listingsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};

    switch (action.type) {
        case RECEIVE_LISTING:
            newState[action.listing.id] = action.listing;
            return newState;
        case RECEIVE_LISTINGS:
            debugger;
        //   return {...state, ...action.listings};
            action.payload.forEach(
                listing => {newState[listing.id] = listing}
            )
            debugger;
            return newState;
        default:
          return state;
      }
}

export default listingsReducer;