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

function refresh(){
    document.querySelectorAll(".item").forEach(item => {
        item.onclick = () => {
            let url = item.children[0].children[0].src
            modalImg.src = url;
            Type = item.dataset.id;
    
            modalBox.classList.add("active")
        }
    })
}

function deleteItem(e){
    e.preventDefault()
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



closeBtn.onclick = () =>{
    modalBox.classList.remove("active")
} 

document.querySelector("#excluir").addEventListener('click', deleteItem)