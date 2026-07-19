const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const commEventGallery = document.getElementById("comm-event-gallery");
const fundraisingGallery = document.getElementById("fundraising-gallery");
const ethiopianDayGallery = document.getElementById("ethiopian-day-gallery");
const HealthScreeningGallery1 = document.getElementById("health-screening-gallery-1");
const HealthScreeningGallery2 = document.getElementById("health-screening-gallery-2");
const HealthScreeningGallery3 = document.getElementById("health-screening-gallery-3");
const HealthScreeningGallery4 = document.getElementById("health-screening-gallery-4");


const commEventImages =[
    { high: "comm-event70.webp", low: "comm-event70_lowquality.webp" },
    { high: "comm-event04.webp", low: "comm-event04_lowquality.webp" },
    { high: "comm-event54.webp", low: "comm-event54_lowquality.webp" },
    { high: "comm-event98.webp", low: "comm-event98_lowquality.webp" },
    { high: "comm-event13.webp", low: "comm-event13_lowquality.webp" },
    { high: "comm-event762.webp", low: "comm-event762_lowquality.webp" },
    { high: "comm-event15.webp", low: "comm-event15_lowquality.webp" },
    { high: "comm-event80.webp", low: "comm-event80_lowquality.webp" },
    { high: "comm-event19.webp", low: "comm-event19_lowquality.webp" },
    { high: "comm-event20.webp", low: "comm-event20_lowquality.webp" },
    { high: "comm-event30.webp", low: "comm-event30_lowquality.webp" },
    { high: "comm-event31.webp", low: "comm-event31_lowquality.webp" },
    { high: "comm-event33.webp", low: "comm-event33_lowquality.webp" },
    { high: "comm-event37.webp", low: "comm-event37_lowquality.webp" },
    { high: "comm-event48.webp", low: "comm-event48_lowquality.webp" },
    { high: "comm-event50.webp", low: "comm-event50_lowquality.webp" },
    { high: "comm-event522.webp", low: "comm-event522_lowquality.webp" },
    { high: "comm-event61.webp", low: "comm-event61_lowquality.webp" },
    { high: "comm-event83.webp", low: "comm-event83_lowquality.webp" },
    { high: "comm-event12.webp", low: "comm-event12_lowquality.webp" },
    { high: "comm-event14.webp", low: "comm-event14_lowquality.webp" },
    { high: "comm-event17.webp", low: "comm-event17_lowquality.webp" },
    { high: "comm-event23.webp", low: "comm-event23_lowquality.webp" },
    { high: "comm-event25.webp", low: "comm-event25_lowquality.webp" },
    { high: "comm-event26.webp", low: "comm-event26_lowquality.webp" },
    { high: "comm-event27.webp", low: "comm-event27_lowquality.webp" },
    { high: "comm-event46.webp", low: "comm-event46_lowquality.webp" },
    { high: "comm-event47.webp", low: "comm-event47_lowquality.webp" },
    { high: "comm-event52.webp", low: "comm-event52_lowquality.webp" },
    { high: "comm-event55.webp", low: "comm-event55_lowquality.webp" },
    { high: "comm-event56.webp", low: "comm-event56_lowquality.webp" },
    { high: "comm-event62.webp", low: "comm-event62_lowquality.webp" },
    { high: "comm-event63.webp", low: "comm-event63_lowquality.webp" },
    { high: "comm-event67.webp", low: "comm-event67_lowquality.webp" },
    { high: "comm-event68.webp", low: "comm-event68_lowquality.webp" },
    { high: "comm-event72.webp", low: "comm-event72_lowquality.webp" },
    { high: "comm-event76.webp", low: "comm-event76_lowquality.webp" },
    { high: "comm-event90.webp", low: "comm-event90_lowquality.webp" },
    { high: "comm-event95.webp", low: "comm-event95_lowquality.webp" },
    { high: "comm-event58.webp", low: "comm-event58_lowquality.webp" },
    { high: "comm-event97.webp", low: "comm-event97_lowquality.webp" },
    { high: "comm-event99.webp", low: "comm-event99_lowquality.webp" },
   ]

   fundraisingImages =[
    "fundraising_0747.webp",
    "fundraising_0748.webp",
    "fundraising_0749.webp",
    "fundraising_0753.webp",
    "fundraising_0754.webp",
    "fundraising_0755.webp",
    "fundraising_0756.webp",
    "fundraising_0767.webp",
    "fundraising_0769.webp",
    "fundraising_0770.webp",
    "fundraising_0772.webp",
    "fundraising_0775.webp",
    "fundraising_0801.webp",
    "fundraising_3773.webp",
    "fundraising_3776.webp",
    "fundraising_3780.webp",
    "fundraising_3782.webp",
    "fundraising_3800.webp",
    "fundraising_3801.webp",
    "fundraising_3803.webp",
    "fundraising_3806.webp",
    "fundraising_3807.webp",
    "fundraising_3808.webp",
    "fundraising_3809.webp",
    "fundraising_3812.webp",
    "fundraising_3813.webp",
    "fundraising_3814.webp",
    "fundraising_3816.webp",
    "fundraising_3818.webp",
    "fundraising_3819.webp",
    "fundraising_3829.webp",
    "fundraising_3830.webp",
    "fundraising_3836.webp",
    "fundraising_3839.webp",
    "fundraising_3844.webp",
    "fundraising_3847.webp",
    "fundraising_3849.webp",
    "fundraising_3850.webp",
    "fundraising_3852.webp",
    "fundraising_3854.webp",
    "fundraising_3857.webp",
    "fundraising_3860.webp",
    "fundraising_3862.webp",
    "fundraising_3867.webp",
    "fundraising_3869.webp",
    "fundraising_3871.webp",
    "fundraising_3872.webp",
    "fundraising_3875.webp",
    "fundraising_3878.webp",
    "fundraising_3879.webp",
    "fundraising_3881.webp",
    "fundraising_3885.webp",
    "fundraising_3886.webp",
    "fundraising_3890.webp"
   ]

   ethiopianDayImages= [
    "GW7A7511.jpg",
    "GW7A7518.jpg",
    "GW7A7561.jpg",
    "GW7A7566.jpg",
    "GW7A7569.jpg",
    "GW7A7579.jpg", 
    "GW7A7583.jpg",
    "GW7A7585.jpg",
    "GW7A7592.jpg", 
    "GW7A7597.jpg", 
    "GW7A7598.jpg", 
    "GW7A7612.jpg", 
    "GW7A7619.jpg", 
    "GW7A7624.jpg", 
    "GW7A7631.jpg", 
    "GW7A7646.jpg",
    "GW7A7662.jpg",
    "GW7A7671.jpg", 
    "GW7A7676.jpg", 
    "GW7A7682.jpg", 
    "GW7A7691.jpg", 
    "GW7A7695.jpg", 
    "GW7A7696.jpg", 
    "GW7A7703.jpg", 
    "GW7A7705.jpg", 
    "GW7A7719.jpg", 
    "GW7A7722.jpg", 
    "GW7A7726.jpg", 
    "GW7A7729.jpg", 
    "GW7A7739.jpg", 
    "GW7A7740.jpg", 
    "GW7A7742.jpg", 
    "GW7A7745.jpg", 
    "GW7A7750.jpg", 
    "GW7A7751.jpg", 
    "GW7A7760.jpg", 
    "GW7A7766.jpg", 
    "GW7A7770.jpg", 
    "GW7A7774.jpg", 
    "GW7A7780.jpg", 
    "GW7A7783.jpg",
    "GW7A7526.jpg",
    "GW7A7527.jpg",
    "GW7A7539.jpg",
    "GW7A7543.jpg",
    "GW7A7546.jpg",
    "GW7A7553.jpg",
    "GW7A7602.jpg",
    "GW7A7604.jpg",
    "GW7A7608.jpg",
    "GW7A7626.jpg",
    "GW7A7634.jpg",
    "GW7A7651.jpg",
    "GW7A7665.jpg",
    "GW7A7679.jpg",
    "GW7A7713.jpg",
    "GW7A7723.jpg",
    "GW7A7735.jpg",
    "GW7A7754.jpg",
    "GW7A7756.jpg"
    
   ]

   HealthScreeningImages1 =[
    "health_screening_pictures_1.jpg",
    "health_screening_pictures_2.jpg",
    "health_screening_pictures_3.jpg",
    "health_screening_pictures_4.jpg",
    "health_screening_pictures_5.jpg",
    "health_screening_pictures_6.jpg",
    "health_screening_pictures_7.jpg",
    "health_screening_pictures_8.jpg",
    "health_screening_pictures_9.jpg",
    "health_screening_pictures_10.jpg",
    "health_screening_pictures_11.jpg",
    "health_screening_pictures_12.jpg",
    "health_screening_pictures_13.jpg",
    "health_screening_pictures_14.jpg",
    "health_screening_pictures_15.jpg",
    "health_screening_pictures_16.jpg",
    "health_screening_pictures_17.jpg",
    "health_screening_pictures_18.jpg",
    "health_screening_pictures_19.jpg",
    "health_screening_pictures_20.jpg",
    "health_screening_pictures_21.jpg",
    "health_screening_pictures_22.jpg",
    "health_screening_pictures_23.jpg",
    "health_screening_pictures_24.jpg",
    "health_screening_pictures_25.jpg",
    "health_screening_pictures_26.jpg",
    "health_screening_pictures_27.jpg",
    "health_screening_pictures_28.jpg",
    "health_screening_pictures_29.jpg",
    "health_screening_pictures_30.jpg",
    "health_screening_pictures_31.jpg",
    "health_screening_pictures_32.jpg",
    "health_screening_pictures_33.jpg",
    "health_screening_pictures_34.jpg",
    "health_screening_pictures_35.jpg",
    "health_screening_pictures_36.jpg",
    "health_screening_pictures_37.jpg",
    "health_screening_pictures_38.jpg",
    "health_screening_pictures_39.jpg",
    "health_screening_pictures_40.jpg",
    "health_screening_pictures_41.jpg",
    "health_screening_pictures_42.jpg",
    "health_screening_pictures_43.jpg",
    "health_screening_pictures_44.jpg",
    "health_screening_pictures_45.jpg"
  
   ]

   HealthScreeningImages2 = Array.from({length: 96}, (_, i) => `HealthScreeningImages_${i + 1}.jpg` );

   HealthScreeningImages3 = Array.from({length: 101}, (_, i) => `HealthScreeningImages_${i + 1}.jpg` );

   HealthScreeningImages4 = Array.from({length: 49}, (_, i) => `HealthScreeningImages_${i + 1}.jpg` );

  

function openModal(image) {
//   console.log("openModal triggered");
  document.getElementById('sticky-thumbnails').style.display = 'none';
  modal.style.display = 'flex';
  modalImg.src = image.src;
}

function closeModal() {
//   console.log("closeModal triggered");
  modal.style.display = 'none';
  document.getElementById('sticky-thumbnails').style.display = 'block';
}

// Loop through the images and add them to the gallery
commEventImages.forEach(({ high, low }) => {
    // const fullResPath = `../images/event-gallery/first-community-meeting/${high}`;
    // const lowResPath = `../images/event-gallery/first-community-meeting/${low}`;
  
    // const wrapper = document.createElement("div");
    // wrapper.classList.add("blur-load");
    // wrapper.style.backgroundImage = `url(${lowResPath})`;

    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/first-community-meeting/${high}`;
    imgElement.loading = "lazy";
    imgElement.classList.add("gallery-img");
   
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    //   // Add image to wrapper
    // wrapper.appendChild(imgElement);
    // commEventGallery.appendChild(wrapper);

    // function loaded() {
    //     wrapper.classList.add("loaded");
    //   }
    
    //   if (imgElement.complete) {
    //     loaded();
    //   } else {
    //     imgElement.addEventListener("load", loaded);
    //   }

     commEventGallery.appendChild(imgElement);
    // imgElement.addEventListener("load", function () {
    //     imgElement.classList.add("loaded");
    //   });


})

fundraisingImages.forEach((imagePath) => {
    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/ECAMFundraisingPictures/${imagePath}`;
     imgElement.loading = "lazy";
    imgElement.classList.add("gallery-img");

   
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    fundraisingGallery.appendChild(imgElement);
    
})


ethiopianDayImages.forEach((imagePath) => {
    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/Ethiopian_day_pics/${imagePath}`;
     imgElement.loading = "lazy";
    imgElement.classList.add("gallery-img");

   
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    ethiopianDayGallery.appendChild(imgElement);
    
})



  HealthScreeningImages1.forEach((imagePath) => {
    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/Health_screening/${imagePath}`;
     imgElement.loading = "lazy";
    imgElement.classList.add("gallery-img");

   
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    HealthScreeningGallery1.appendChild(imgElement);
    
  })

  HealthScreeningImages2.forEach((imagePath) => {
    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/Health_screening_2/${imagePath}`;
    imgElement.loading = "lazy";
    imgElement.classList.add("gallery-img");

   
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    HealthScreeningGallery2.appendChild(imgElement);
    
  })

  HealthScreeningImages3.forEach((imagePath) => {
    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/Health_screening_3/${imagePath}`;
    imgElement.loading = "lazy";
    imgElement.classList.add("gallery-img");

   
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    HealthScreeningGallery3.appendChild(imgElement);
    
  })

  HealthScreeningImages4.forEach((imagePath) => {
    const imgElement = document.createElement("img")
    imgElement.src = `../images/event-gallery/Health_screening_4/${imagePath}`;
    imgElement.loading = "lazy";
    imgElement.classList.add("gallery-img");

   
    imgElement.addEventListener("click", function () {
        openModal(this);
    });

    HealthScreeningGallery4.appendChild(imgElement);
    
  })

  

function thumbnailScroll() {
  const thumbnails = document.querySelectorAll('[data-target-id]');

  thumbnails.forEach(thumbnail => {

    thumbnail.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target-id');
      const collapseEl = document.getElementById(targetId);

      if (collapseEl) {
        // Collapse all other open previews
        document.querySelectorAll('.collapse.show').forEach(openCollapse => {
          if (openCollapse.id !== targetId) {
            bootstrap.Collapse.getOrCreateInstance(openCollapse).hide();
          }
        });

        // Show the selected collapse
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.show();

        // Smooth scroll to opened collapse
        setTimeout(() => {
          const yOffset = -200; // adjust if needed for sticky header
          const y = collapseEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 350);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  thumbnailScroll();

  // On page load, scroll to any open collapse
  const opened = document.querySelector('.collapse.show');
  if (opened) {
    setTimeout(() => {
      const yOffset = -200;
      const y = opened.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 400);
  }
});


  
  // Call the function when the DOM is ready
  document.addEventListener('DOMContentLoaded', thumbnailScroll);
  
  
   // promo video 
  // const player = new Plyr('.js-player', {
  //   controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
  //   ratio: '12:7'
  // });



    var player = new MediaElementPlayer('#player1');

  
 
