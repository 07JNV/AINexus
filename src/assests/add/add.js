import { useState } from "react";
import "./add.css"
import { useNavigate } from 'react-router-dom';



function Add() {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate("/form");
    }

    return (
        <div>
            <div className="addbtn">
                <button id="addbtn" onClick={handleclick}>Add</button>
            </div>
        </div>
    );

}

export default Add;
