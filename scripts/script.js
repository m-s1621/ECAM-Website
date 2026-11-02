/* ECAM gallery script
   - Albums are built only when first opened (not all on page load)
   - One click listener per album instead of one per image
   - Optional small thumbnails in the grid, full image in the modal
*/

// ---------- settings ----------

const BASE = "../images/event-gallery/";

// Set to true once every album folder has a thumbs/ subfolder containing
// a .webp copy of each photo with the same file name
// (e.g. Health_screening/thumbs/health_screening_pictures_1.webp).
const USE_THUMBS = true;

// ---------- helpers ----------

// range(3, n => `pic_${n}.jpg`) -> ["pic_1.jpg", "pic_2.jpg", "pic_3.jpg"]
const range = (count, name) => Array.from({ length: count }, (_, i) => name(i + 1));

// ---------- album data ----------

const commEventImages = [
  "70", "04", "54", "98", "13", "762", "15", "80", "19", "20", "30", "31", "33", "37",
  "48", "50", "522", "61", "83", "12", "14", "17", "23", "25", "26", "27", "46", "47",
  "52", "55", "56", "62", "63", "67", "68", "72", "76", "90", "95", "58", "97", "99",
].map(n => `comm-event${n}.webp`);

const fundraisingImages = [
  "0747", "0748", "0749", "0753", "0754", "0755", "0756", "0767", "0769", "0770", "0772",
  "0775", "0801", "3773", "3776", "3780", "3782", "3800", "3801", "3803", "3806", "3807",
  "3808", "3809", "3812", "3813", "3814", "3816", "3818", "3819", "3829", "3830", "3836",
  "3839", "3844", "3847", "3849", "3850", "3852", "3854", "3857", "3860", "3862", "3867",
  "3869", "3871", "3872", "3875", "3878", "3879", "3881", "3885", "3886", "3890",
].map(n => `fundraising_${n}.webp`);

const ethiopianDayImages = [
  "7511", "7518", "7561", "7566", "7569", "7579", "7583", "7585", "7592", "7597", "7598",
  "7612", "7619", "7624", "7631", "7646", "7662", "7671", "7676", "7682", "7691", "7695",
  "7696", "7703", "7705", "7719", "7722", "7726", "7729", "7739", "7740", "7742", "7745",
  "7750", "7751", "7760", "7766", "7770", "7774", "7780", "7783", "7526", "7527", "7539",
  "7543", "7546", "7553", "7602", "7604", "7608", "7626", "7634", "7651", "7665", "7679",
  "7713", "7723", "7735", "7754", "7756",
].map(n => `GW7A${n}.jpg`);

// key  = id of the collapse element
// el   = id of the container the images go into
// dir  = folder under images/event-gallery/
// NOTE: file names and extensions must match the server EXACTLY (.jpg is not .JPG)
const albums = {
  collapse1: { el: "comm-event-gallery",         dir: "first-community-meeting",   files: commEventImages },
  collapse2: { el: "fundraising-gallery",        dir: "ECAMFundraisingPictures",   files: fundraisingImages },
  collapse3: { el: "ethiopian-day-gallery",      dir: "Ethiopian_day_pics",        files: ethiopianDayImages },
  collapse4: { el: "health-screening-gallery-1", dir: "Health_screening",          files: range(45,  n => `health_screening_pictures_${n}.jpg`) },
  collapse5: { el: "health-screening-gallery-2", dir: "Health_screening_2",        files: range(96,  n => `HealthScreeningImages_${n}.jpg`) },
  collapse6: { el: "health-screening-gallery-3", dir: "Health_screening_3",        files: range(101, n => `HealthScreeningImages_${n}.jpg`) },
  collapse7: { el: "health-screening-gallery-4", dir: "Health_screening_4",        files: range(49,  n => `HealthScreeningImages_${n}.jpg`) },
  collapse8: { el: "ethiopian-day-gallery-2",    dir: "ethiopian_day_2",           files: range(21,  n => `Ethiopian_day_2_${n}.jpg`) },
  collapse9: { el: "gi_team_presentation",       dir: "ECAM_GI_Team_Presentation", files: range(17,  n => `gi_team_presentation_${n}.jpg`) },
};

// ---------- modal (enlarged image) ----------

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const stickyThumbnails = document.getElementById("sticky-thumbnails");

function openModal(src) {
  stickyThumbnails.style.display = "none";
  modal.style.display = "flex";
  modalImg.src = src;
}

// called by onclick="closeModal()" in the HTML
function closeModal() {
  modal.style.display = "none";
  modalImg.removeAttribute("src");
  stickyThumbnails.style.display = "";
}

// close when clicking the dark background or pressing Escape
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.style.display === "flex") closeModal();
});

// ---------- build an album the first time it is opened ----------

function buildAlbum(collapseId) {
  const album = albums[collapseId];
  if (!album || album.built) return;

  const container = document.getElementById(album.el);
  if (!container) {
    console.warn(`Gallery container #${album.el} not found for ${collapseId}`);
    return;
  }
  album.built = true;

  const fragment = document.createDocumentFragment();

  album.files.forEach(file => {
    const fullPath = `${BASE}${album.dir}/${file}`;
    const thumbPath = `${BASE}${album.dir}/thumbs/${file.replace(/\.\w+$/, ".webp")}`;

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.className = "gallery-img";
    img.alt = "";
    img.dataset.full = fullPath;

    if (USE_THUMBS) {
      // if a thumbnail is missing, fall back to the full image
      img.addEventListener("error", () => { img.src = fullPath; }, { once: true });
      img.src = thumbPath;
    } else {
      img.src = fullPath;
    }

    fragment.appendChild(img);
  });

  container.appendChild(fragment);

  container.addEventListener("click", e => {
    if (e.target.classList.contains("gallery-img")) {
      openModal(e.target.dataset.full);
    }
  });
}

// ---------- album selector ----------

function scrollToCollapse(collapseEl) {
  const yOffset = -200; // adjust for the sticky header
  const y = collapseEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function thumbnailScroll() {
  document.querySelectorAll("[data-target-id]").forEach(thumbnail => {
    thumbnail.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target-id");
      const collapseEl = document.getElementById(targetId);
      if (!collapseEl) return;

      // close every other open album
      document.querySelectorAll(".collapse.show").forEach(openCollapse => {
        if (openCollapse.id !== targetId) {
          bootstrap.Collapse.getOrCreateInstance(openCollapse, { toggle: false }).hide();
        }
      });

      // open the selected one
      buildAlbum(targetId);
      bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false }).show();

      setTimeout(() => scrollToCollapse(collapseEl), 350);
    });
  });
}

// side bar in the collapse gallary 
function setAlbumBarHeight() {
  const height = stickyThumbnails.offsetHeight;
  if (height > 0) {
    document.documentElement.style.setProperty("--album-bar-height", height + "px");
  }
}

setAlbumBarHeight();
window.addEventListener("load", setAlbumBarHeight);
window.addEventListener("resize", setAlbumBarHeight);

// ---------- start ----------

function initGallery() {
  // safety net: build an album whenever its collapse starts opening
  Object.keys(albums).forEach(id => {
    const collapseEl = document.getElementById(id);
    if (collapseEl) {
      collapseEl.addEventListener("show.bs.collapse", () => buildAlbum(id));
    }
  });

  // build whichever album is open on page load
  const opened = document.querySelector(".collapse.show");
  if (opened) {
    buildAlbum(opened.id);
    setTimeout(() => scrollToCollapse(opened), 400);
  }

  thumbnailScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGallery);
} else {
  initGallery();
}

















// const modal = document.getElementById('modal');
// const modalImg = document.getElementById('modal-img');
// const commEventGallery = document.getElementById("comm-event-gallery");
// const fundraisingGallery = document.getElementById("fundraising-gallery");
// const ethiopianDayGallery = document.getElementById("ethiopian-day-gallery");
// const ethiopianDayGallery2 = document.getElementById("ethiopian-day-gallery-2");
// const HealthScreeningGallery1 = document.getElementById("health-screening-gallery-1");
// const HealthScreeningGallery2 = document.getElementById("health-screening-gallery-2");
// const HealthScreeningGallery3 = document.getElementById("health-screening-gallery-3");
// const HealthScreeningGallery4 = document.getElementById("health-screening-gallery-4");
// const Gi_team_presentations = document.getElementById("gi_team_presentation");


// const commEventImages =[
//     { high: "comm-event70.webp", low: "comm-event70_lowquality.webp" },
//     { high: "comm-event04.webp", low: "comm-event04_lowquality.webp" },
//     { high: "comm-event54.webp", low: "comm-event54_lowquality.webp" },
//     { high: "comm-event98.webp", low: "comm-event98_lowquality.webp" },
//     { high: "comm-event13.webp", low: "comm-event13_lowquality.webp" },
//     { high: "comm-event762.webp", low: "comm-event762_lowquality.webp" },
//     { high: "comm-event15.webp", low: "comm-event15_lowquality.webp" },
//     { high: "comm-event80.webp", low: "comm-event80_lowquality.webp" },
//     { high: "comm-event19.webp", low: "comm-event19_lowquality.webp" },
//     { high: "comm-event20.webp", low: "comm-event20_lowquality.webp" },
//     { high: "comm-event30.webp", low: "comm-event30_lowquality.webp" },
//     { high: "comm-event31.webp", low: "comm-event31_lowquality.webp" },
//     { high: "comm-event33.webp", low: "comm-event33_lowquality.webp" },
//     { high: "comm-event37.webp", low: "comm-event37_lowquality.webp" },
//     { high: "comm-event48.webp", low: "comm-event48_lowquality.webp" },
//     { high: "comm-event50.webp", low: "comm-event50_lowquality.webp" },
//     { high: "comm-event522.webp", low: "comm-event522_lowquality.webp" },
//     { high: "comm-event61.webp", low: "comm-event61_lowquality.webp" },
//     { high: "comm-event83.webp", low: "comm-event83_lowquality.webp" },
//     { high: "comm-event12.webp", low: "comm-event12_lowquality.webp" },
//     { high: "comm-event14.webp", low: "comm-event14_lowquality.webp" },
//     { high: "comm-event17.webp", low: "comm-event17_lowquality.webp" },
//     { high: "comm-event23.webp", low: "comm-event23_lowquality.webp" },
//     { high: "comm-event25.webp", low: "comm-event25_lowquality.webp" },
//     { high: "comm-event26.webp", low: "comm-event26_lowquality.webp" },
//     { high: "comm-event27.webp", low: "comm-event27_lowquality.webp" },
//     { high: "comm-event46.webp", low: "comm-event46_lowquality.webp" },
//     { high: "comm-event47.webp", low: "comm-event47_lowquality.webp" },
//     { high: "comm-event52.webp", low: "comm-event52_lowquality.webp" },
//     { high: "comm-event55.webp", low: "comm-event55_lowquality.webp" },
//     { high: "comm-event56.webp", low: "comm-event56_lowquality.webp" },
//     { high: "comm-event62.webp", low: "comm-event62_lowquality.webp" },
//     { high: "comm-event63.webp", low: "comm-event63_lowquality.webp" },
//     { high: "comm-event67.webp", low: "comm-event67_lowquality.webp" },
//     { high: "comm-event68.webp", low: "comm-event68_lowquality.webp" },
//     { high: "comm-event72.webp", low: "comm-event72_lowquality.webp" },
//     { high: "comm-event76.webp", low: "comm-event76_lowquality.webp" },
//     { high: "comm-event90.webp", low: "comm-event90_lowquality.webp" },
//     { high: "comm-event95.webp", low: "comm-event95_lowquality.webp" },
//     { high: "comm-event58.webp", low: "comm-event58_lowquality.webp" },
//     { high: "comm-event97.webp", low: "comm-event97_lowquality.webp" },
//     { high: "comm-event99.webp", low: "comm-event99_lowquality.webp" },
//    ]

//    fundraisingImages =[
//     "fundraising_0747.webp",
//     "fundraising_0748.webp",
//     "fundraising_0749.webp",
//     "fundraising_0753.webp",
//     "fundraising_0754.webp",
//     "fundraising_0755.webp",
//     "fundraising_0756.webp",
//     "fundraising_0767.webp",
//     "fundraising_0769.webp",
//     "fundraising_0770.webp",
//     "fundraising_0772.webp",
//     "fundraising_0775.webp",
//     "fundraising_0801.webp",
//     "fundraising_3773.webp",
//     "fundraising_3776.webp",
//     "fundraising_3780.webp",
//     "fundraising_3782.webp",
//     "fundraising_3800.webp",
//     "fundraising_3801.webp",
//     "fundraising_3803.webp",
//     "fundraising_3806.webp",
//     "fundraising_3807.webp",
//     "fundraising_3808.webp",
//     "fundraising_3809.webp",
//     "fundraising_3812.webp",
//     "fundraising_3813.webp",
//     "fundraising_3814.webp",
//     "fundraising_3816.webp",
//     "fundraising_3818.webp",
//     "fundraising_3819.webp",
//     "fundraising_3829.webp",
//     "fundraising_3830.webp",
//     "fundraising_3836.webp",
//     "fundraising_3839.webp",
//     "fundraising_3844.webp",
//     "fundraising_3847.webp",
//     "fundraising_3849.webp",
//     "fundraising_3850.webp",
//     "fundraising_3852.webp",
//     "fundraising_3854.webp",
//     "fundraising_3857.webp",
//     "fundraising_3860.webp",
//     "fundraising_3862.webp",
//     "fundraising_3867.webp",
//     "fundraising_3869.webp",
//     "fundraising_3871.webp",
//     "fundraising_3872.webp",
//     "fundraising_3875.webp",
//     "fundraising_3878.webp",
//     "fundraising_3879.webp",
//     "fundraising_3881.webp",
//     "fundraising_3885.webp",
//     "fundraising_3886.webp",
//     "fundraising_3890.webp"
//    ]

//    ethiopianDayImages= [
//     "GW7A7511.jpg",
//     "GW7A7518.jpg",
//     "GW7A7561.jpg",
//     "GW7A7566.jpg",
//     "GW7A7569.jpg",
//     "GW7A7579.jpg", 
//     "GW7A7583.jpg",
//     "GW7A7585.jpg",
//     "GW7A7592.jpg", 
//     "GW7A7597.jpg", 
//     "GW7A7598.jpg", 
//     "GW7A7612.jpg", 
//     "GW7A7619.jpg", 
//     "GW7A7624.jpg", 
//     "GW7A7631.jpg", 
//     "GW7A7646.jpg",
//     "GW7A7662.jpg",
//     "GW7A7671.jpg", 
//     "GW7A7676.jpg", 
//     "GW7A7682.jpg", 
//     "GW7A7691.jpg", 
//     "GW7A7695.jpg", 
//     "GW7A7696.jpg", 
//     "GW7A7703.jpg", 
//     "GW7A7705.jpg", 
//     "GW7A7719.jpg", 
//     "GW7A7722.jpg", 
//     "GW7A7726.jpg", 
//     "GW7A7729.jpg", 
//     "GW7A7739.jpg", 
//     "GW7A7740.jpg", 
//     "GW7A7742.jpg", 
//     "GW7A7745.jpg", 
//     "GW7A7750.jpg", 
//     "GW7A7751.jpg", 
//     "GW7A7760.jpg", 
//     "GW7A7766.jpg", 
//     "GW7A7770.jpg", 
//     "GW7A7774.jpg", 
//     "GW7A7780.jpg", 
//     "GW7A7783.jpg",
//     "GW7A7526.jpg",
//     "GW7A7527.jpg",
//     "GW7A7539.jpg",
//     "GW7A7543.jpg",
//     "GW7A7546.jpg",
//     "GW7A7553.jpg",
//     "GW7A7602.jpg",
//     "GW7A7604.jpg",
//     "GW7A7608.jpg",
//     "GW7A7626.jpg",
//     "GW7A7634.jpg",
//     "GW7A7651.jpg",
//     "GW7A7665.jpg",
//     "GW7A7679.jpg",
//     "GW7A7713.jpg",
//     "GW7A7723.jpg",
//     "GW7A7735.jpg",
//     "GW7A7754.jpg",
//     "GW7A7756.jpg"
    
//    ]

//    HealthScreeningImages1 =[
//     "health_screening_pictures_1.jpg",
//     "health_screening_pictures_2.jpg",
//     "health_screening_pictures_3.jpg",
//     "health_screening_pictures_4.jpg",
//     "health_screening_pictures_5.jpg",
//     "health_screening_pictures_6.jpg",
//     "health_screening_pictures_7.jpg",
//     "health_screening_pictures_8.jpg",
//     "health_screening_pictures_9.jpg",
//     "health_screening_pictures_10.jpg",
//     "health_screening_pictures_11.jpg",
//     "health_screening_pictures_12.jpg",
//     "health_screening_pictures_13.jpg",
//     "health_screening_pictures_14.jpg",
//     "health_screening_pictures_15.jpg",
//     "health_screening_pictures_16.jpg",
//     "health_screening_pictures_17.jpg",
//     "health_screening_pictures_18.jpg",
//     "health_screening_pictures_19.jpg",
//     "health_screening_pictures_20.jpg",
//     "health_screening_pictures_21.jpg",
//     "health_screening_pictures_22.jpg",
//     "health_screening_pictures_23.jpg",
//     "health_screening_pictures_24.jpg",
//     "health_screening_pictures_25.jpg",
//     "health_screening_pictures_26.jpg",
//     "health_screening_pictures_27.jpg",
//     "health_screening_pictures_28.jpg",
//     "health_screening_pictures_29.jpg",
//     "health_screening_pictures_30.jpg",
//     "health_screening_pictures_31.jpg",
//     "health_screening_pictures_32.jpg",
//     "health_screening_pictures_33.jpg",
//     "health_screening_pictures_34.jpg",
//     "health_screening_pictures_35.jpg",
//     "health_screening_pictures_36.jpg",
//     "health_screening_pictures_37.jpg",
//     "health_screening_pictures_38.jpg",
//     "health_screening_pictures_39.jpg",
//     "health_screening_pictures_40.jpg",
//     "health_screening_pictures_41.jpg",
//     "health_screening_pictures_42.jpg",
//     "health_screening_pictures_43.jpg",
//     "health_screening_pictures_44.jpg",
//     "health_screening_pictures_45.jpg"
  
//    ]

//    HealthScreeningImages2 = Array.from({length: 96}, (_, i) => `HealthScreeningImages_${i + 1}.jpg` );

//    HealthScreeningImages3 = Array.from({length: 101}, (_, i) => `HealthScreeningImages_${i + 1}.jpg` );

//    HealthScreeningImages4 = Array.from({length: 49}, (_, i) => `HealthScreeningImages_${i + 1}.jpg` );

//    EthiopianDayGallery2 = Array.from({length: 21}, (_, i) => `Ethiopian_day_2_${i + 1}.jpg` );

//    GiTeamPresentationGallery = Array.from({length: 17}, (_, i) => `gi_team_presentation_${i + 1}.jpg` );

  

// function openModal(image) {
// //   console.log("openModal triggered");
//   document.getElementById('sticky-thumbnails').style.display = 'none';
//   modal.style.display = 'flex';
//   modalImg.src = image.src;
// }

// function closeModal() {
// //   console.log("closeModal triggered");
//   modal.style.display = 'none';
//   document.getElementById('sticky-thumbnails').style.display = 'block';
// }

// // Loop through the images and add them to the gallery
// commEventImages.forEach(({ high, low }) => {
//     // const fullResPath = `../images/event-gallery/first-community-meeting/${high}`;
//     // const lowResPath = `../images/event-gallery/first-community-meeting/${low}`;
  
//     // const wrapper = document.createElement("div");
//     // wrapper.classList.add("blur-load");
//     // wrapper.style.backgroundImage = `url(${lowResPath})`;

//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/first-community-meeting/${high}`;
//     imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");
   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     //   // Add image to wrapper
//     // wrapper.appendChild(imgElement);
//     // commEventGallery.appendChild(wrapper);

//     // function loaded() {
//     //     wrapper.classList.add("loaded");
//     //   }
    
//     //   if (imgElement.complete) {
//     //     loaded();
//     //   } else {
//     //     imgElement.addEventListener("load", loaded);
//     //   }

//      commEventGallery.appendChild(imgElement);
//     // imgElement.addEventListener("load", function () {
//     //     imgElement.classList.add("loaded");
//     //   });


// })

// fundraisingImages.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/ECAMFundraisingPictures/${imagePath}`;
//      imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     fundraisingGallery.appendChild(imgElement);
    
// })


// ethiopianDayImages.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/Ethiopian_day_pics/${imagePath}`;
//      imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     ethiopianDayGallery.appendChild(imgElement);
    
// })



//   HealthScreeningImages1.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/Health_screening/${imagePath}`;
//      imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     HealthScreeningGallery1.appendChild(imgElement);
    
//   })

//   HealthScreeningImages2.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/Health_screening_2/${imagePath}`;
//     imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     HealthScreeningGallery2.appendChild(imgElement);
    
//   })

//   HealthScreeningImages3.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/Health_screening_3/${imagePath}`;
//     imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     HealthScreeningGallery3.appendChild(imgElement);
    
//   })

//   HealthScreeningImages4.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/Health_screening_4/${imagePath}`;
//     imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     HealthScreeningGallery4.appendChild(imgElement);
    
//   })

//   EthiopianDayGallery2.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/ethiopian_day_2/${imagePath}`;
//     imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//     ethiopianDayGallery2.appendChild(imgElement);
    
//   })

//   GiTeamPresentationGallery.forEach((imagePath) => {
//     const imgElement = document.createElement("img")
//     imgElement.src = `../images/event-gallery/ECAM_GI_Team_Presentation/${imagePath}`;
//     imgElement.loading = "lazy";
//     imgElement.classList.add("gallery-img");

   
//     imgElement.addEventListener("click", function () {
//         openModal(this);
//     });

//    Gi_team_presentations.appendChild(imgElement);
    
//   })

  

// function thumbnailScroll() {
//   const thumbnails = document.querySelectorAll('[data-target-id]');

//   thumbnails.forEach(thumbnail => {

//     thumbnail.addEventListener('click', function () {
//       const targetId = this.getAttribute('data-target-id');
//       const collapseEl = document.getElementById(targetId);

//       if (collapseEl) {
//         // Collapse all other open previews
//         document.querySelectorAll('.collapse.show').forEach(openCollapse => {
//           if (openCollapse.id !== targetId) {
//             bootstrap.Collapse.getOrCreateInstance(openCollapse).hide();
//           }
//         });

//         // Show the selected collapse
//         const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
//         bsCollapse.show();

//         // Smooth scroll to opened collapse
//         setTimeout(() => {
//           const yOffset = -200; // adjust if needed for sticky header
//           const y = collapseEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
//           window.scrollTo({ top: y, behavior: 'smooth' });
//         }, 350);
//       }
//     });
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   thumbnailScroll();

//   // On page load, scroll to any open collapse
//   const opened = document.querySelector('.collapse.show');
//   if (opened) {
//     setTimeout(() => {
//       const yOffset = -200;
//       const y = opened.getBoundingClientRect().top + window.pageYOffset + yOffset;
//       window.scrollTo({ top: y, behavior: 'smooth' });
//     }, 400);
//   }
// });


  
//   // Call the function when the DOM is ready
//   document.addEventListener('DOMContentLoaded', thumbnailScroll);
  
  
//    // promo video 
//   // const player = new Plyr('.js-player', {
//   //   controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
//   //   ratio: '12:7'
//   // });



//     var player = new MediaElementPlayer('#player1');

  






 
