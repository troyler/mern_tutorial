import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import {useState} from 'react';
import { Navigate } from "react-router-dom";


export default function ListingsFormPage(){


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [condition, setCondition] = useState('');
    const [category, setCategory] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect, setRedirect] = useState(false);


    async function publishListing(ev) {
        ev.preventDefault();
        try{
            await axios.post('/listings',{
                title,
                description,
                price,
                condition,
                category,
                addedPhotos,
            });
            alert("Succesfully listed item");
            setRedirect(true);
        } catch(e) {
            alert("failed");
        }
    }

    if(redirect) {
        return <Navigate to = {'/profile/listings'} />
    }


    return (
        <div>
                <form onSubmit={publishListing}>
                <h2 className = "text-l mt-4">Title</h2>
                <input
                    type = "text" 
                    value = {title} 
                    onChange = {ev => setTitle(ev.target.value)} 
                    placeholder = "Item title, ex: iPhone 13 Pro"
                />
                <h2 className = "text-l mt-4">Product Description</h2>
                <textarea 
                    value = {description} 
                    onChange = {ev => setDescription(ev.target.value)} 
                    className="w-full" 
                />
                <h2 className = "text-l mt-4">Price</h2>
                <input 
                    type = "number" 
                    value = {price} 
                    onChange = {ev => setPrice(ev.target.value)}
                    placeholder = "$" 
                />
                <h2 className = "text-l mt-4">Condition</h2>
                <label>Pick Condition:        &nbsp;    </label>
                    <select value = {condition} onChange = {ev => setCondition(ev.target.value)} id="condition">
                        <optgroup label="Conditions">
                        <option value="brand new"> Brand New</option>
                        <option value="like new"> Used - like new</option>
                        <option value="used"> Used</option>
                        <option value="damaged"> Damaged</option>
                        </optgroup>
                    </select>
                <label>Choose Catgeory:        &nbsp;    </label>
                    <select value = {category} onChange = {ev => setCategory(ev.target.value)} id="category">
                        <optgroup label="Conditions">
                        <option value="Home Goods"> Home Goods</option>
                        <option value="Bicycles"> Bicycles </option>
                        <option value="Clothing"> Clothing</option>
                        <option value="Mobile Technology"> Mobile Technology </option>
                        </optgroup>
                    </select>
                <h2 className = "text-l mt-4">Photos</h2>
                <PhotosUploader  addedPhotos = {addedPhotos} onChange ={setAddedPhotos}/>
                <button className="primary">Publish Listing</button>
            </form>
        </div>
    );
    }