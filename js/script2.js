//API
const CLIENT_ID = "2595b30a05bc570";
const form = document.querySelector("#upload-form");

function doUpload(url, options){
    function promiseCallback(resolve, reject){
        fetch(url, options)
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    }


    return new Promise(promiseCallback);
}

function onSucess(result){
    const {data: { link } } = result;
}

function uploadImage(e){
    e.preventDefault();
    
    const file = document.querySelector("#file");
    const data = new FormData();
    data.append('image', file.files[0]);
    data.append('name', "Teste");

    doUpload("https://api.imgur.com/3/image", {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': `Client-ID ${CLIENT_ID}`,
        }
    })
    .then(dt => {
        const info = {
            "URL": dt.data.link,
            "Data": "Teste",
            "Type": "outros",
        }
        fetch("https://6fa4c91b-7263-4580-971f-8b9c4e6c8cd5-00-ht2twr549694.riker.replit.dev/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(console.log)
        console.log(dt)
    })
    .catch(console.error);
}



// rcZSwIy9Nzs2mD8  -- ALBUM HASH  //   QSdjMB2   -- ID 




form.addEventListener("submit", uploadImage);
