const modalImg = document.querySelector(".modalImg")
const modalBox = document.querySelector(".modal")
const closeBtn = document.querySelector(".fa-times")

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


let Type = "outros"
let url = ""
let it;

function refresh(){
    document.querySelectorAll(".item").forEach(item => {
        item.onclick = () => {
            it = item
            url = item.children[0].children[0].src
            modalImg.src = url;
            Type = item.dataset.id;
    
            modalBox.classList.add("active")
        }
    })
}

function deleteItem(e){
    e.preventDefault()

    it.remove()
    modalBox.classList.remove("active")

    const info = {
        "URL": modalImg.src,
        "Data": getDate(),
        "Type": Type,
    }

    fetch("https://api-felina.up.railway.app/del/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(console.log)
        console.log(info);
}

function claimItem(e){
    e.preventDefault()

    it.remove()
    modalBox.classList.remove("active")

    const info = {
        "URL": modalImg.src,
        "Data": getDate(),
        "Type": Type,
    }

    fetch("https://api-felina.up.railway.app/claim/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(info)
        }).then(res => res.json())
        .then(console.log)
        console.log(info);
}



closeBtn.onclick = () =>{
    modalBox.classList.remove("active")
} 

document.querySelector("#excluir").addEventListener('click', deleteItem)
document.querySelector("#resgatar").addEventListener('click', claimItem)