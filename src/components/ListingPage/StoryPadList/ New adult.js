import React, { useContext, useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from "axios";
import { useMoralis } from "react-moralis";


import { BookContext } from '../../../Context/BookContext'

function NewAdult() {

    const storyContext = React.useContext(BookContext);
    const { data } = storyContext;

    useEffect(() => {
        const bList = JSON.parse(JSON.stringify(data));
        if (bList) {
            ListStoryData(bList)
        }
    }, [data])

    const [storyData, setstoryData] = useState([]);

    async function ListStoryData(bList) {
        var array = [];
        if (bList) {
            for (let index = 0; index < bList.length; index++) {
                const element = bList[index];
                if (element.CID) {
                    await axios.get(`https://${element.CID}.ipfs.dweb.link/story.json`).then((response) => {
                        const id = element.objectId;
                        var newData = { ...response.data, id };
                        array.push(newData);
                    });
                }

            }
        }
        setstoryData(array);
    }
    console.log(storyData, 'storydata horror');



    return (
        <>
            <div style={{ marginTop: "100px" }} className="container">
                <div className="text-center">
                </div>
                <div className="container">
                    <div className="card-columns">
                        {
                            storyData && storyData.map((e) => {
                                if (e.category == "NewAdult") {
                                    return (
                                        <div className="card carding">
                                            <a href="#">
                                                <img className="card-img-top" src={e.coverPicture} alt="Card image cap" />
                                                <div className="card-body">
                                                    <h5 className="story-card-title">{e.name}</h5>
                                                    <p className="card-text">
                                                        {e.description}
                                                    </p>

                                                    <p class="card-text"><small className="text-muted">Last updated {new Date().toLocaleString()}</small></p>
                                                    <Link to={`/newadult-detail/${e.id}`}>

                                                        <button type="button" class="btn btn-outline-danger buy-story-btn">Buy Story</button>

                                                        <Button variant="outline-info btn-outline-danger buy-story-btn">Read Full Story</Button>
                                                    </Link>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                }

                            })
                        }
                    </div>
                </div>
            </div>
        </>

    )
}
export default NewAdult;