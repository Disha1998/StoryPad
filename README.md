# StoryPad

 Storypad is a Token Gated community of Readers and Writers where writers can share their stories, charge fees to give access to a digital copy, and give special access to readers having their NFT membership.
 
 

![MicrosoftTeams-image (10)](https://user-images.githubusercontent.com/69969675/185176948-94696ba7-f5aa-468c-a2a3-8f1e81b71267.png)


## Write Story

A writer can add a story by filling up this form. A writer needs to share an introduction of the story and then for the rest of the content writer can decide whether they want to post it for free or want to charge readers to give access to the full story.

Here writer can also choose to give a special discount or give free access to all the NFT holders.


![MicrosoftTeams-image (13)](https://user-images.githubusercontent.com/69969675/185178807-3678781a-0cde-4b25-a38f-a981eefa2ec8.png)


![MicrosoftTeams-image (12)](https://user-images.githubusercontent.com/69969675/185178623-10267567-342a-4f53-8d00-cd2b8be82a90.png)



## NFT Readership

NFT Readership is a kind of membership where only specific number of readers will get a chance to support the writer by purchasing NFT to be part of the Writer's Reader Club.

![Screenshot 2022-08-17 at 8 56 17 PM](https://user-images.githubusercontent.com/69969675/185179514-0f260cbc-b274-4fb7-940b-7881b8252a82.png)






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
