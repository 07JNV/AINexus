import React, { useState } from 'react';
import {
    MDBInput,
    MDBBtn,
    MDBFile
} from 'mdb-react-ui-kit';
import "./form.css"
import Navbar from "../navbar/navbar.js"
import Footer from "../footer/footer.js"

export default function App() {
    const [developer, setDeveloper] = useState('');
    const [email, setEmail] = useState('');
    const [model, setModel] = useState('');
    const [modelFile, setModelFile] = useState(null);
    const [projectPic, setProjectPic] = useState(null);
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState('');

    const handleAddClick = async (e) => {
        e.preventDefault();

        const requestBody = {
            developer: developer,
            email: email,
            model: model,
            modelFile: modelFile,
            projectPic: projectPic,
            description: description,
            relatedLinks:links
        };

        console.log(requestBody);



        try {
            const response = await fetch(`https://65ede63108706c584d9ad669.mockapi.io/api/v1/Models_data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data uploaded successfully:', data);
            } else {
                console.error('Failed to upload data:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='mbf1'>
                <form>
                    <div style={{ width: "100%", textAlign: "center" }}>Add Your Model</div>
                    <MDBInput value={developer} onChange={(e) => setDeveloper(e.target.value)} wrapperClass='mb-4' label='Developer' />
                    <MDBInput type='email' value={email} onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' label='Email address' />
                    <MDBInput type='text' value={model} onChange={(e) => setModel(e.target.value)} wrapperClass='mb-4' label='Model' />
                    <MDBInput label='Model File' onChange={(e) => setModelFile(e.target.value)} value={modelFile} wrapperClass='mb-4' />
                    <MDBInput label='Project Pic' onChange={(e) => setProjectPic(e.target.value)} value={projectPic} wrapperClass='mb-4' />
                    <MDBInput  value={description} onChange={(e) => setDescription(e.target.value)} wrapperClass='mb-4' textarea rows={4} label='Description' />
                    <MDBInput  value={links} onChange={(e) => setLinks(e.target.value)} wrapperClass='mb-4' textarea rows={4} label='Links' />
                    <MDBBtn type='submit' className='mb-4' block onClick={handleAddClick}>
                        Add
                    </MDBBtn>
                </form>

            </div>
            {/* <Footer/> */}
        </div>
    );
}
