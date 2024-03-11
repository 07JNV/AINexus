// import React from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../navbar/navbar';
// import Footer from '../footer/footer';
// import { useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import "./details.css"
// import { BiSolidLike, BiSolidDislike } from "react-icons/bi";








// const Details = () => {
//     const location = useLocation();
//     const currentUrl = location.pathname;
//     const id = currentUrl.slice(-1)
//     const url = 'https://65ede63108706c584d9ad669.mockapi.io/api/v1/Models_data/' + `${id}`;
//     const fetchData = async () => {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             return null;
//         }
//     };


//     const [data, setData] = useState([]);
//     useEffect(() => {
//         const getData = async () => {
//             const fetchedData = await fetchData();
//             if (fetchedData !== null) {
//                 const arr = Object.entries(fetchedData);
//                 arr.sort((a, b) => b[1].likes - a[1].likes);
//                 const sortedData = Object.fromEntries(arr);
//                 setData(sortedData);
//             }
//         };

//         getData();
//     }, []);
//     console.log(data);
//     // console.log(typeof(data));
//     const handleLike = async (index) => {
//         const newData = { ...data };
//         data.likes += 1;
//         setData(newData);
//         await postData(newData); // Call postData function to send updated data to the API
//     };

//     const handleDislike = async (index) => {
//         const newData = { ...data };
//         data.dislikes += 1;
//         setData(newData);
//         await postData(newData); // Call postData function to send updated data to the API
//     };

//     const postData = async (updatedData) => {
//         try {
//             const response = await fetch(`https://65ede63108706c584d9ad669.mockapi.io/api/v1/Models_data/${updatedData.id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedData)
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to update data');
//             }
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };


//     return (
//         <div>
//             <Navbar />
//             <div className='db1'>
//                 <div className='db1h'>
//                     {data.model}
//                 </div>
//                 <div className='db1c1'>
//                     <div className='mimg'>
//                         <img id="mimg" src={data.projectPic} alt='#' />

//                     </div>

//                     <div className='trynow'>
//                         <button id='trynow'>Try Now</button>
//                     </div>
//                 </div>
//                 <div className='db1c3'>
//                     <div style={{ fontSize: "30px" }}>
//                         <BiSolidLike  onClick={handleLike}/>{data.likes}
//                     </div>
//                     <div style={{ fontSize: "30px" }} >
//                         <BiSolidDislike onClick={handleDislike}/>{data.dislikes}
//                     </div>
//                 </div>
//                 <div className='db1c2'>
//                     <div className='dname' >
//                         <p> Developer : {data.developer}</p>
//                         <p>Email : {data.email}</p>
//                     </div>
//                     <div className='mdes' >
//                         <p>Description:</p>
//                         <div id="mdes">{data.description}</div>

//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Details;



import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import { useLocation } from 'react-router-dom';
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import "./details.css"

const Details = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    console.log(currentUrl)
    
    const id = currentUrl.replace("/explore/", "");

    const url = 'https://65ede63108706c584d9ad669.mockapi.io/api/v1/Models_data/'+`${id}` ;

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const fetchedData = await fetchData();
            if (fetchedData !== null) {
                setData(fetchedData);
            }
        };
        getData();
    }, [url]);

    const handleLike = async () => {
        const updatedData = { ...data, likes: data.likes + 1 };
        setData(updatedData);
        await postData(updatedData);
    };

    const handleDislike = async () => {
        const updatedData = { ...data, dislikes: data.dislikes + 1 };
        setData(updatedData);
        await postData(updatedData);
    };

    const postData = async (updatedData) => {
        try {
            const response = await fetch(`https://65ede63108706c584d9ad669.mockapi.io/api/v1/Models_data/${updatedData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='db1'>
                <div className='db1h'>
                    {data.model}
                </div>
                <div className='db1c1'>
                    <div className='mimg'>
                        <img id="mimg" src={data.projectPic} alt='#' />

                    </div>

                    <div className='trynow'>
                        <button id='trynow'>Try Now</button>
                    </div>
                </div>
                <div className='db1c3'>
                    <div style={{ fontSize: "30px" }}>
                        <BiSolidLike onClick={handleLike} /> {data.likes}
                    </div>
                    <div style={{ fontSize: "30px" }}>
                        <BiSolidDislike onClick={handleDislike} /> {data.dislikes}
                    </div>
                </div>
                <div className='db1c2'>
                    <div className='dname' >
                        <p> Developer : {data.developer}</p>
                        <p>Email : {data.email}</p>
                    </div>
                    <div className='mdes' >
                        <p>Description:</p>
                        <div id="mdes">{data.description}</div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Details;
