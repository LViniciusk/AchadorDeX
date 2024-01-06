
/*
            <div class="col d-flex align-items-center justify-content-between rogerio">
                <img class="marta" src="res/images/AchaDeX.jpg" alt="" />

                <div class="d-flex justify-content-between px-5 mx-5 claudio">
                    <p>Tipo do Item: <span>Null</span></p>
                    <p>Processo Feito: <span>Null</span></p>
                    <p>Data: <span>00/00/0000</span></p>
                </div>
            </div>

*/


async function getItem(id) {

    const APIResponse = await fetch(`https://api-felina.up.railway.app/historico/${id}`);

    if (APIResponse.status == 200   ) {
        const data = await APIResponse.json();
        return data;
    }
}

async function getMax() {

    const APIResponse = await fetch(`https://api-felina.up.railway.app/historico/`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const coluna = document.querySelector("#coluna");

async function fillPage(){
    let total = await getMax();

    if(total.Items == 0){
        let col = document.createElement("div")
        col.classList.add("col")
        col.classList.add("d-flex")
        col.classList.add("align-items-center")
        col.classList.add("justify-content-between")
        col.classList.add("rogerio")
        let img = document.createElement("img")
        img.classList.add("marta")
        img.src = "https://inforpress.cv/wp-content/uploads/2020/05/empty.jpg"
        let info = document.createElement("div")
        info.classList.add("d-flex")
        info.classList.add("justify-content-between")
        info.classList.add("px-5")
        info.classList.add("mx-5")
        info.classList.add("claudio")
        let p1 = document.createElement("p")
        p1.innerText = `Tipo do Item: Empty`
        let p2 = document.createElement("p")
        p2.innerText = `Processo Feito: Null`
        let p3 = document.createElement("p")
        p3.innerText = `Data: 00/00/0000 - 00:00`

        info.appendChild(p1)
        info.appendChild(p2)
        info.appendChild(p3)

        col.appendChild(img)
        col.appendChild(info)
        

        coluna.appendChild(col)
    }

    console.log(total);
    if(total){
        for(let i = 0; i < total.Items; i++){
            let item = await getItem(i);
            let col = document.createElement("div")
            col.classList.add("col")
            col.classList.add("d-flex")
            col.classList.add("align-items-center")
            col.classList.add("justify-content-between")
            col.classList.add("rogerio")
            let img = document.createElement("img")
            img.classList.add("marta")
            img.src = item.URL
            let info = document.createElement("div")
            info.classList.add("d-flex")
            info.classList.add("justify-content-between")
            info.classList.add("px-5")
            info.classList.add("mx-5")
            info.classList.add("claudio")
            let p1 = document.createElement("p")
            p1.innerText = `Tipo do Item: ${item.Type}`
            let p2 = document.createElement("p")
            p2.innerText = `Processo Feito: ${item.Processo}`
            let p3 = document.createElement("p")
            p3.innerText = `Data: ${item.Data}`

            info.appendChild(p1)
            info.appendChild(p2)
            info.appendChild(p3)

            col.appendChild(img)
            col.appendChild(info)
            

            coluna.appendChild(col)

            
        }
    }
}

fillPage()
