import "./home.css"
import img1 from "../images/img1.png"
import { useState, useEffect } from "react"
import Footer from "../footer/footer.js"
import Navbar from "../navbar/navbar.js"
import Add from "../add/add.js"
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
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


const Home = () => {
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
            <div className="mb1">
                <Add />
                <div className="mb1c1">
                    <div className="mb1c1c1">
                        Level up with the largest AI Models community
                    </div>
                    <div className="mb1c1c2">
                        Join over 17M+ machine learners to share,
                        stress test,
                        and stay up-to-date on all the latest ML
                        techniques and technologies.
                        Discover a huge repository of
                        community-published models,
                        data & code for your next project.

                    </div>
                </div>
                <div className="mb1c2">
                    <img id="img1" src={img1} alt="#" />
                </div>
            </div>
            <div className="mb2">
                <div className="mb2h">
                    Explore
                </div>
                {data !== null ? (
                    Object.entries(data)
                        .slice(3, 6)
                        .map(([key, value]) => (
                            <div key={key} className="mb2c1">
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
                <div className="explore_more">
                    <a href="/explore"><button id="btn">more</button></a>
                </div>
            </div>
            <div className="mb3">
                <div className="mb2h">
                    Featured
                </div>


                {data !== null ? (
                    Object.entries(data)
                        .slice(0, 3)
                        .map(([key, value]) => (
                            <div key={key} className="mb2c1">
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
            <div className="mb4" id="about-us">
                <div className="mb2h">
                    Aboutus
                </div>
                <div className="mb4content">
                    Welcome to AINexus,
                    your premier destination
                    for exploring and utilizing
                    a diverse array of AI models.
                    At AINexus,
                    we're passionate about
                    empowering individuals
                    and organizations to
                    harness the power of
                    artificial intelligence
                    for a wide range of
                    applications.
                </div>
                <div className="mb4content">
                    ✓ Our mission is to
                    provide a comprehensive
                    platform for exploring
                    and utilizing AI models,
                    empowering individuals
                    and businesses to
                    leverage cutting-edge
                    technology for diverse
                    applications.
                </div>
                <div className="mb4content">
                    ✓ With years of experience
                    in AI research and
                    development,
                    our team of
                    experts is dedicated to curating high-quality AI models and providing valuable resources to our users
                </div>
                <div className="mb4content">
                    ✓ We believe in the power of community-driven learning and innovation. Join our community to connect with fellow AI enthusiasts, share ideas, and contribute to the advancement of AI technology
                </div>


            </div>
            <div style={{ marginTop: "61px", width: "100%" }}>
                <Footer />
            </div>
        </div>
    );
}

export default Home;

