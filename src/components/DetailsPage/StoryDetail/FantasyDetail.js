import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from '../../../Context/BookContext';
import { useMoralis } from "react-moralis";
// import ReactReadMoreReadLess from "react-read-more-read-less";
import StoryDetail from "../StoryDetail";
import ReactDOM from "react-dom";
// import ReadMoreReact from 'read-more-react';








// const ReadMore = ({ children }) => {
//     const text = children ;
//     const [isReadMore, setIsReadMore] = useState(true);
//     const toggleReadMore = () => {
//         setIsReadMore(!isReadMore);
//     };
//     return (
//         <p className="text">
//             {isReadMore !== undefined ? text.slice(0, 150) : text}
//             <span onClick={toggleReadMore} className="read-or-hide">
//                 {isReadMore ? "...read more" : " show less"}
//             </span>
//         </p>
//     );
// };

function FantasyDetail() {
    // const [Content, setContent] = useState();
    const params = useParams();
    console.log('params', params);
    const { isAuthenticated, isInitialized } = useMoralis()


    const storyContext = React.useContext(BookContext);
    const { getStoryDetails, storyDetails } = storyContext;


    useEffect(() => {
        getStoryDetails(params)
    }, [isAuthenticated, isInitialized])

    const [readMore, setReadMore] = useState(false);
    const extraContent = <div>
        <p className="extra-content">
            {storyDetails.content}
        </p>
    </div>
    const linkName = readMore ? 'Read Less << ' : 'Read More >> '


    return (
        <div style={{ marginTop: "22px" }} className="container storyDetailContainer">
            <h2 className="storyDetailTitle">{storyDetails.name}</h2><br></br>
            <h5 className="text-muted">By : {storyDetails.authorName}</h5><br></br>
            <img className="story-detail-img" src={storyDetails.coverPicture}></img><br></br>
            <small className="text-muted">Last updated {new Date().toLocaleString()}</small>

            <h6 className="story-content">
                {/* <ReactReadMoreReadLess
                    charLimit={200}
                    readMoreText={"Read more ???"}
                    readLessText={"Read less ???"}
                    readMoreClassName="read-more-less--more"
                    readLessClassName="read-more-less--less"
                > */}
                {/* <p>{storyDetails.content}</p> */}
                {/* </ReactReadMoreReadLess> */}
                {/* <ReadMore>
                    {storyDetails.content}
                </ReadMore> */}

                {/* 
                <ReadMoreReact text={storyDetails.content || ""}
                    // value={text}
                    min={80}
                    ideal={100}
                    max={100}
                    readMoreText="...click here to read more" /> */}
                {/* {console.log(storyDetails.content)} */}
                <a className="read-more-link" onClick={() => { setReadMore(!readMore) }}><h4>{linkName}</h4></a>
                {readMore && extraContent}

            </h6>
        </div>

    );
};

export default FantasyDetail;