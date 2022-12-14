
import React, { useState, createContext, useEffect } from "react";
import axios from 'axios'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";
//--------- MAHIMA
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



export const BookContext = createContext();
export const BookContextProvider = (props) => {
    const [Image, setImage] = useState();
    const [pdf, setPdf] = useState('');

    const { Moralis, user, account } = useMoralis();
    const { data, fetch } = useMoralisQuery("Storylab");
    // console.log(data, ' ====');
    const [NewData, setData] = useState([]);
    const [storyDetails, setStoryDetails] = useState({})
    const API_Token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
    const client = new Web3Storage({ token: API_Token })
    const Storypad = Moralis.Object.extend("Storylab");
    const StoryPad = new Storypad();
    const { authenticate, isAuthenticated, isInitialized } = useMoralis()


    function addData(Item) {
        const blob = new Blob(
            [
                JSON.stringify(Item),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "story.json"),
        ];
        console.log('files==>', files);
        return files;

    }


    async function storeFiles(Item) {

        StoryPad.set('Currunt_user', user);
        let files = addData(Item);
        const cid = await client.put(files);
        StoryPad.set("CID", cid);
        StoryPad.save();

        console.log("files with cid ==>", ` https://dweb.link/ipfs/${cid}/story.json`);

        return cid;
    }

    const login = async () => {
        console.log('called login');
        if (!isAuthenticated) {
            await authenticate({
                provider: "web3Auth",
                clientId: "BHQlt53J8Q_CprFI9tgx5aRB7pE9Ei0ccchzXQBNIYAI4RwdZ84Y2sVGoezEZ3S_kwwt3MuZ2eZIGoTYET--4I0",
                
            })
                .then(function (user) {
                let address = user.get("ethAddress")
                console.log(address, 'address in context');
                localStorage.setItem("currentUserAddress", address)
            })
    .catch(function (error) {
    });

        }
    }



async function getStoryDetails(params) {
    console.log("params----------", params);

    if (isAuthenticated) {
        const archives = Moralis.Object.extend("Storylab");
        const query = new Moralis.Query(archives);
        query.equalTo("objectId", (params.id).toString());
        const object = await query.first();
        axios.get(`https://dweb.link/ipfs/${object.attributes.CID}/story.json`)
            .then(function (response) {
                setStoryDetails(response.data)
            })
            .catch(function (error) {

            })
    }
}

console.log('storyDetails contexxx', storyDetails);


// ------------MAHIMA'CODE

async function storeFile(file) {
    const ext = file.name.split('.').pop();

    const fileName = `${uuidv4()}.${ext}`;
    const newFile = new File([file], fileName, { type: file.type });
    const cid = await client.put([newFile], {
        name: fileName,
    });
    const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
    setImage(imageURI);

    return imageURI;
}



return (
    <BookContext.Provider
        value={{
            addData,
            storeFiles,
            getStoryDetails,
            data,
            storyDetails,
            login,
            storeFile,
            Image,
            fetch



        }}
    >
        {props.children}
    </BookContext.Provider>
);
}