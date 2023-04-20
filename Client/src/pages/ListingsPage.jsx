import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountNavigation from "../AccountNavigation";

export default function ListingsPage(){

    const [listings, setListings] = useState([]);
    useEffect(() => {
        axios.get('/listings').then(({data}) => {
            setListings(data);
        });
    }, []);
   
    return (
        <div>
          <AccountNavigation />
            <div className="text-center">
              <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/profile/listings/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
                Add new place
              </Link>
            </div>
            <div className="mt-4">
              {listings.length > 0 && listings.map(listing => (
                <Link to={'/profile/listings/'+listing._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                  <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                       <img src = {listing.addedPhotos[0]}></img>
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className="text-xl">{listing.title}</h2>
                    <p className="text-sm mt-2">{listing.description}</p>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      );
}