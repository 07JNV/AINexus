import Navbar from "../navbar/navbar.js"
import "./explore.css"
import Add from "../add/add.js"
import { useState, useEffect } from "react"
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import "../homepage/home.css"
import Footer from "../footer/footer.js"
import { Link } from 'react-router-dom';



const fetchData = async () => {
    try {
        const response = await fetch('https://65ede63108706c584d9ad669.mockapi.io/api/v1/Models_data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


const Explore = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const fetchedData = await fetchData();
            if (fetchedData !== null) {
                const arr = Object.entries(fetchedData);
                arr.sort((a, b) => b[1].likes - a[1].likes);
                const sortedData = Object.fromEntries(arr);
                setData(sortedData);
            }
        };

        getData();
    }, []);
    // console.log(typeof(data));
    const handleLike = async (index) => {
        const newData = { ...data };
        newData[index].likes += 1;
        setData(newData);
        await postData(newData[index]); // Call postData function to send updated data to the API
    };

    const handleDislike = async (index) => {
        const newData = { ...data };
        newData[index].dislikes += 1;
        setData(newData);
        await postData(newData[index]); // Call postData function to send updated data to the API
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






    return (
        <div>
            <Navbar />
            <Add />
            <div className="eb1">
                <div className="eb1h">
                    Explore
                </div>
                <div className="eb2">
                    {data !== null ? (
                        Object.entries(data)

                            .map(([key, value]) => (
                                <div key={key} className="eb2c">
                                    <Link to={`/explore/${value.id}`} className="image-link">
                                        <div style={{ width: "100%" }}>
                                            <img id="thumbimg" src={value.projectPic} alt="#" />
                                        </div>
                                    </Link>
                                    <div id="like-dislike">
                                        <div style={{ justifyContent: "center" }}>
                                            <BiSolidLike onClick={() => handleLike(key)} />{value.likes}
                                        </div>
                                        <div style={{ justifyContent: "center" }}>
                                            <BiSolidDislike onClick={() => handleDislike(key)} />{value.dislikes}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: "20px" }}>{value.model}</p>
                                </div>
                            ))
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default Explore;