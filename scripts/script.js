const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const gallery = document.getElementById("gallery");

const images =[
    "comm-event70.jpg",
    "comm-event04.jpg",
    "comm-event54.jpg",
    "comm-event98.jpg",
    "comm-event13.jpg",
    "comm-event762.jpg",
    "comm-event15.jpg",
    "comm-event80.jpg",
    "comm-event19.jpg",
    "comm-event20.jpg",
    "comm-event30.jpg",
    "comm-event31.jpg",
    "comm-event33.jpg",
    "comm-event37.jpg",
    "comm-event48.jpg",
    "comm-event50.jpg",
    "comm-event522.jpg",
    "comm-event61.jpg",
   "comm-event83.jpg",
    "comm-event12.jpg",
    "comm-event14.jpg",
    "comm-event17.jpg",
    "comm-event23.jpg",
    "comm-event25.jpg",
    "comm-event26.jpg",
    "comm-event27.jpg",
    "comm-event46.jpg",
    "comm-event47.jpg",
    "comm-event52.jpg",
    "comm-event55.jpg",
    "comm-event56.jpg",
    "comm-event62.jpg",
    "comm-event63.jpg",
    "comm-event67.jpg",
    "comm-event68.jpg",
    "comm-event72.jpg",
    "comm-event76.jpg",
    "comm-event90.jpg",
    "comm-event95.jpg",
    "comm-event58.jpg",
    "comm-event97.jpg",
    "comm-event99.jpg",
   ]


function openModal(image) {
    console.log("openModal triggered");
    modal.style.display = 'flex';
    modalImg.src = image.src;
}

function closeModal() {
    console.log("closeModal triggered");
    modal.style.display = 'none';
}

// Loop through the images and add them to the gallery
images.forEach((imagePath) => {
    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/first-community-meeting/${imagePath}`;
    imgElement.classList.add("gallery-img");

    // imgElement.onclick = function () {
    //     openModal(this);
    // };
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    gallery.appendChild(imgElement);
    
})


