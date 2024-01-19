
const itemList = []
const recent = document.querySelector(".btnR")
let rct = 1;

recent.addEventListener("click", reverse)

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

function reverse(){
    const itList = document.querySelectorAll(".item")
    const fGallery = document.querySelector(".filter-gallery")
    itList.forEach(it =>{
        const info = {
            "URL": it.children[0].children[0].src,
            "Data": it.children[0].children[1].innerText,
            "Type": it.dataset.id,
            "Visibility": it.style.display,
        }
        itemList.push(info)

        fGallery.removeChild(it)
    })
    console.log(itemList.reverse());

    itemList.forEach(it => {
        let image = document.createElement("img")
        let inner = document.createElement("div")
        let p = document.createElement("p")
        p.innerText = it.Data
        inner.classList.add("inner")
        let itemD = document.createElement("div")
        itemD.style.display = it.Visibility
        itemD.classList.add("item")
        itemD.dataset.id = it.Type
        image.src = it.URL
        inner.appendChild(image)
        inner.appendChild(p)
        itemD.appendChild(inner)
        f.appendChild(itemD)
        refresh()
    })
    itemList.splice(0)

    if(rct == 1){
        recent.innerText = "Mais Antigos"
        rct = 0;
    }else if(rct == 0){
        recent.innerText = "Mais Recentes"
        rct = 1
    }

    refresh()

    

}
















async function getItem(id) {

    const APIResponse = await fetch(`https://api-felina.up.railway.app/msg/${id}`);

    if (APIResponse.status == 200   ) {
        const data = await APIResponse.json();
        return data;
    }
}

async function getMax() {

    const APIResponse = await fetch(`https://api-felina.up.railway.app/`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const f = document.querySelector(".filter-gallery");

async function fillPage(){
    let total = await getMax();
    console.log(total);
    if(total){
        for(let i = 0; i < total.Items; i++){
            
            let item = await getItem(i);
            let url = item.URL
            let image = document.createElement("img")
            let inner = document.createElement("div")
            let p = document.createElement("p")
            p.innerText = item.Data
            inner.classList.add("inner")
            let itemD = document.createElement("div")
            itemD.classList.add("item")
            itemD.dataset.id = item.Type
            image.src = url
            inner.appendChild(image)
            inner.appendChild(p)
            itemD.appendChild(inner)
            f.appendChild(itemD)

            
        }
    }
    refresh()
}

fillPage()


//dropdown

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector(".select")
    const caret = dropdown.querySelector(".caret")
    const menu = dropdown.querySelector(".menu")
    const options = dropdown.querySelectorAll(".menu li")
    const selected = dropdown.querySelector(".selected")

    select.addEventListener('click', ()=>{
        select.classList.toggle("select-clicked")
        caret.classList.toggle("caret-rotate")
        menu.classList.toggle("menu-open")
    });
    options.forEach(option =>{
        option.addEventListener("click", () =>{
            selected.innerText = option.innerText;
            select.classList.remove("select-clicked")
            caret.classList.remove("caret-rotate")
            menu.classList.remove("menu-open")

            options.forEach(option => {
                option.classList.remove("active");
            });

            option.classList.add("active");
        })
    })
    
});

//Filtro
const filterButtons = document.querySelector("#filter-btns").children;
const items = document.querySelector(".filter-gallery").children;

for(let i = 0; i < filterButtons.length; i++){
    filterButtons[i].addEventListener("click", function (){
        for(let j = 0; j < filterButtons.length; j++){
            filterButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        const target = this.getAttribute("data-target");

        for(let k = 0; k < items.length; k++){
            items[k].style.display = "none";

            if(target == items[k].getAttribute("data-id")){
                items[k].style.display = "block";
            }

            if(target == "todos"){
                items[k].style.display = "block";
            }
        }

    })
}





