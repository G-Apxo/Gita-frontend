const boxes = document.querySelectorAll('.box')
window.addEventListener("scroll", checkBoxes)

    console.log(boxes)
function checkBoxes() {
    const triggerBottom = window.innerHeight / 1.4
    boxes.forEach(box => {
        const topBox = box.getBoundingClientRect().top
        console.log("topBox",topBox)
        console.log("-----------------------")
        console.log("triggerBottom",triggerBottom)
         console.log("-----------------------")
        if(topBox < triggerBottom) {
            box.classList.add("show")
        } else {
            box.classList.remove("show")
        }

    })
}