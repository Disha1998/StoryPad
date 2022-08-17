import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mintParentContract } from "../../config";
import ChildContractAbi from "../../abi/mintContract.json";
import ContractABI from "../../abi/mintContractParent.json";
import { ethers } from "ethers";
// import fs from 'fs';

import axios from "axios";

function NftReadership() {
  // var fs = require('fs');
  let collection = [];
  const [collectionData, setCollectionData] = useState([])



  return (
    <div style={{ marginTop: "120px" }} className="container">
      <h1>Explore collections</h1>
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <Link to="/readership-nft-detail">
            <div className="card-readership card-block">
              <h4 className="card-title-readership text-right"></h4>

              <>
                <img
                  className="Nft-img"
                  src="https://media.istockphoto.com/id/1209683444/photo/many-hardbound-books-background-selective-focus.webp?s=612x612&w=is&k=20&c=PIpaACwMWXJtY7dSot8WDaZ9WJJk3SfMjLXFM46MoF4="
                  alt="Photo of sunset"
                />

                <h5 className="card-title-readership mt-3 mb-3">AuthorName
                </h5>
              </>
            </div>
          </Link>
        </div>

        <div className="col-md-3 col-sm-6">
          <Link to="/readership-nft-detail">
            <div className="card-readership card-block">
              <h4 className="card-title-readership text-right"></h4>
              <img
                className="Nft-img"
                src="https://media.istockphoto.com/id/873507500/photo/image-of-open-antique-book-on-wooden-table-with-glitter-overlay.webp?s=612x612&w=is&k=20&c=8CC9QdlMx5bt0ySrWjMd0EhXgwetcvpkgc_jD7gZ8yw="
                alt="Photo of sunset"
              />
              <h5 className="card-title-readership mt-3 mb-3">
                AuthorName • nft title
              </h5>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6">
          <Link to="/readership-nft-detail">
            <div className="card-readership card-block">
              <h4 className="card-title-readership text-right"></h4>
              <img
                className="Nft-img"
                src="https://media.istockphoto.com/photos/stack-of-books-on-a-shelf-multicolored-book-spines-picture-id507071472?k=20&m=507071472&s=612x612&w=0&h=lJXM_A9BSC_X_8ffZsA9ZoaInUz7nazNWu3Vj1yOFN8="
                alt="Photo of sunset"
              />
              <h5 className="card-title-readership mt-3 mb-3">
                AuthorName • nft title
              </h5>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6">
          <Link to="/readership-nft-detail">
            <div className="card-readership card-block">
              <h4 className="card-title-readership text-right"></h4>
              <img
                className="Nft-img"
                src="https://media.istockphoto.com/photos/student-studying-on-the-table-picture-id850857066?k=20&m=850857066&s=612x612&w=0&h=mj9auovLjjKVdLVBu0vt1GDh-cdTJXFpfs0sQQ5n6u4="
                alt="Photo of sunset"
              />
              <h5 className="card-title-readership mt-3 mb-3">
                AuthorName • nft title
              </h5>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6">
          <Link to="/readership-nft-detail">
            <div className="card-readership card-block">
              <h4 className="card-title-readership text-right"></h4>
              <img
                className="Nft-img"
                src="https://media.istockphoto.com/photos/opened-book-panorama-format-good-copy-space-picture-id1036088750?k=20&m=1036088750&s=612x612&w=0&h=K9QIbOh7SYS-eZzEPInfESHkTyVZT4L4UmdA6HBhsmA="
                alt="Photo of sunset"
              />
              <h5 className="card-title-readership mt-3 mb-3">
                AuthorName • nft title
              </h5>
            </div>
          </Link>
        </div>
        <div className="col-md-3 col-sm-6">
          <Link to="/readership-nft-detail">
            <div className="card-readership card-block">
              <h4 className="card-title-readership text-right"></h4>
              <img
                className="Nft-img"
                src="https://media.istockphoto.com/photos/ebook-ereading-elearning-picture-id486050741?k=20&m=486050741&s=612x612&w=0&h=ZBhvQZdO0vK090YOb_NZRbpt5Y2tvSdPR1aiB_SWOQA="
                alt="Photo of sunset"
              />
              <h5 className="card-title-readership mt-3 mb-3">
                AuthorName • nft title
              </h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NftReadership;