# Story_Pad



## IPFS & Filecoin

https://github.com/Disha1998/Story_Pad/blob/master/Filecoin.md

```
  
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

```
