$(document).ready(function() {
    
    //Slajdovi



    $.ajax({
        url: "assets/data/slajdovi.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
         prikaziSladjove(data.slides)
        },
        error: function(xhr, status, error) {
            console.error("AJAX error:", status, error);
        }
    });

   
function prikaziSladjove(slides) {
    var carouselInner = $(".carousel-inner");

    slides.forEach(function(slide, index) {
        var activeClass = index === 0 ? "active" : "";
        var slideHtml = `
            <div class="carousel-item ${activeClass}">
                <img src="${slide.image}" alt="background image ${index + 1}">
                <div class="carousel-caption d-flex justify-content-start ">
                    <div class="content style text-center">
                        <h2 class="text-white text-bold mb-2">${slide.caption.title}</h2>
                        <p class="tag-text mb-1">${slide.caption.description}</p>
                        <p class="tag-text mb-4">
                            <h6 class="text-uppercase font-weight-bold">
                                <a href="${slide.caption.linkUrl}" class="text-white">${slide.caption.linkText}</a>
                            </h6>
                        </p>
                    </div>
                </div>
            </div>
        `;
        carouselInner.append(slideHtml);
    });
}







function promeniSadrzaj() {
    var offer1Elements = document.getElementsByClassName('offer1');
    var offer2Elements = document.getElementsByClassName('offer2');

    for (var i = 0; i < offer1Elements.length; i++) {
        var offer1 = offer1Elements[i];
        var offer2 = offer2Elements[i];

        if (offer1.style.visibility === 'hidden' || !offer1.style.visibility) {
            offer1.style.visibility = 'visible';
            offer2.style.visibility = 'hidden';
        } else {
            offer1.style.visibility = 'hidden';
            offer2.style.visibility = 'visible';
        }
    }
}

setInterval(promeniSadrzaj, 2000);




const texts = [
  "\"Not all who wander are lost.\" - J.R.R. Tolkien",
  "\"Traveling – it leaves you speechless, then turns you into a storyteller.\" - Ibn Battuta",
  "\"The world is a book, and those who do not travel read only one page.\" - Saint Augustine"
];
let index = 0;
let textIndex = 0;
let currentText = "";
const localStorageKey="typedText";
const typingSpeed = 80; 

function type() {
  if (typeof currentText === "undefined") {
    currentText = "";
  }
  if (index < texts.length) {
    currentText = texts[index].substring(0, textIndex);
    document.getElementById("typed").textContent = currentText;
    textIndex++;
    if (textIndex <= texts[index].length) {
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, 1500);
    }
    sacuvajTrenutni();
  } else {
    index = 0;
    setTimeout(erase, 1500); 
  }
}




function erase() {
  if (typeof currentText === "undefined") {
    currentText = "";
  }
  if (currentText.length > 0) {
    currentText = currentText.substring(0, currentText.length - 1);
    document.getElementById("typed").textContent = currentText;
    setTimeout(erase, typingSpeed);
    sacuvajTrenutni();
  } else {
    textIndex = 0;
    index++;
    if (index >= texts.length) {
      index = 0;
    }
    setTimeout(type, typingSpeed); 
    sacuvajTrenutni();
  }
}







function sacuvajTrenutni() {
  localStorage.setItem(localStorageKey, JSON.stringify({index:index, textIndex:textIndex, currentText: currentText}));
  
}
function ucitajTrenutni() {
  var sacuvanTrenutni = JSON.parse(localStorage.getItem(localStorageKey));
  if (sacuvanTrenutni) {
    index = sacuvanTrenutni.index;
    textIndex = sacuvanTrenutni.textIndex;
    currentText = sacuvanTrenutni.currentText;
    
  } else {
   
  }
}

window.onload = function() {
  ucitajTrenutni();
  setTimeout(type, 1500); 
};

setInterval(sacuvajTrenutni,1500);
     
});