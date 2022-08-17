import React, { useState, useEffect } from "react";
import { mintParentContract } from "../config";
import ContractABI from "../abi/mintContractParent.json";
import { ethers } from "ethers";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config({ path: "./.env" });
// const currentUser = Moralis.User.current();
// console.log(currentUser,"current user");
function UploadFormNft() {
  const pk_1 = process.env.REACT_APP_PRIVATE_KEY;
  //storyPad
  const [authorname, setAuthorname] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokenQuantity, setTokenQuantity] = useState("");
  const [noNFT, setNoNFT] = useState("");
  const API_Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzOEQzNkJhOTIwOWU0NDhCMzZEOGYwNzQ2MzE4ZGFiNmUyNzUwQmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk2ODIzNzc0NDUsIm5hbWUiOiJzdG9yeXBhZCJ9.YBGPQ1JxGs17x5IQ09mPazz85Fv07PK6puQmvhKxHCQ";
  const client = new Web3Storage({ token: API_Token });
  //---//
  const notify = () => alert("NFTs are uploaded!");
  //StoryPad
  const authorNameEvent = (e) => {
    setAuthorname(e.target.value);
  };
  const tokenPriceEvent = (e) => {
    setTokenPrice(e.target.value || null);
  };
  const tokenQuantityEvent = (e) => {
    setTokenQuantity(e.target.value);
  };
  const symbolEvent = (e) => {
    setSymbol(e.target.value);
  };
  //--------------
  async function onFormSubmit(e) {
    e.preventDefault();
    setAuthorname("");
    setTokenPrice("");
    setTokenQuantity("");
    setSymbol("");
    console.log(Item, "form submit");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(address);
    console.log(signature, "signture from onFormClick button");
    const storyMintContract = new ethers.Contract(
      mintParentContract,
      ContractABI.abi,
      signer
    );
    var options = {
      gas: 2100000, gasPrice: 8000000000, value: tokenPrice
    };
    let wei;
    let transaction = await storyMintContract.createToken(authorname, symbol);
    console.log(transaction, "createToken");
    let tx = await transaction.wait();
    console.log(tx, "tx");
    let event = tx.events[0];
    console.log(event, "Event");
    // let tokenContractAddress = event?.address;
    let tokenContractAddress = event.args[1];
    console.log(tokenContractAddress, "TokenContractAddress");
    await storyMintContract.bulkMintERC721(
      address,
      tokenContractAddress,
      0,
      tokenQuantity,
      parseInt(tokenPrice)
    );
  }
  let Item = {
    authorname: authorname,
    tokenPrice: tokenPrice,
    tokenQuantity: tokenQuantity,
    symbol: symbol,
  };
  return (
    <div
      style={{ backgroundColor: "#faf7f8", marginTop: "10%" }}
      className="col"
    >
      <div className="form-style-2 offset-4 row-8">
        <div className="form-style-2-heading">Add NFT Readership from here</div>
        <form action="" method="" onSubmit={onFormSubmit}>
          <label for="field1">
            <span>
              Name <span className="required">*</span>
            </span>
            <input
              value={authorname}
              onChange={authorNameEvent}
              placeholder="Your name"
              type="text"
              class="input-field"
              name="field1"
            />
          </label>{" "}
          <br />
          <label for="field1">
            <span>
              Symbol<span className="required">*</span>
            </span>
            <input
              value={symbol}
              onChange={symbolEvent}
              placeholder="Enter symbol"
              type="text"
              class="input-field"
              name="field1"
            />
          </label>{" "}
          <br />
          {/* <label for="field4"><span>Not NFT holder</span><select value={category} name="field4" onChange={(e)=>setNoNFT(e.target.value)} className="select-field">
                        <option defaultChecked defaultValue="free" value="free">Post story for free</option>
                        <option value="charge">Documents</option>
                    </select></label> */}
          <label for="field1">
            <span>
              tokenPrice <span className="required">*</span>
            </span>
            <input
              value={tokenPrice}
              onChange={tokenPriceEvent}
              placeholder="Enter a token price"
              type="text"
              class="input-field"
              name="field1"
            />
          </label>{" "}
          <br />
          <label for="field1">
            <span>
              tokenQuantity<span className="required">*</span>
            </span>
            <input
              value={tokenQuantity}
              onChange={tokenQuantityEvent}
              placeholder="Enter quantity"
              type="text"
              class="input-field"
              name="field1"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            style={{ backgroundColor: "#D82148", marginLeft:"120px" }}
            onClick={notify}
          />
        </form>
      </div>
    </div>
  );
}
export default UploadFormNft;