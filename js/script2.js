function getDate(){
    //Data

    const DT = new Date()

    const dia = String(DT.getDate()).padStart(2, '0')
    const mes = String(DT.getMonth()+1).padStart(2, '0')
    const ano = DT.getFullYear()

    const hora = String(DT.getHours()).padStart(2, '0')
    const minuto = String(DT.getMinutes()).padStart(2, '0')


    const dataAtual = `${dia}/${mes}/${ano} - ${hora}:${minuto}`
    console.log(dataAtual);
    return dataAtual;
}










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
    
    const Type = document.querySelector("#idtipo")
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
            "Data": getDate(),
            "Type": Type.value
        }
        fetch("http://localhost:8000/add/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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
