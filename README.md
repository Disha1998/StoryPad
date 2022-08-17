# StoryPad

 Storypad is a Token Gated community of Readers and Writers where writers can share their stories, charge fees to give access to a digital copy, and give special access to readers having their NFT membership.
 
 

![MicrosoftTeams-image (10)](https://user-images.githubusercontent.com/69969675/185176948-94696ba7-f5aa-468c-a2a3-8f1e81b71267.png)




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
