const img = document.querySelector(".register-img")
const file = document.querySelector("#file")

img.addEventListener("click", () => {
    file.click()
})

file.addEventListener("change", () => {
    const reader = new FileReader()

    reader.onload = () => {
        if (reader.readyState === 2) {
            img.src = reader.result
        }
    }

    reader.readAsDataURL(file.files[0])
})