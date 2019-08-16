var slideIndex = 1;
showSlides(slideIndex);


// Next/previous controls
let n

function plusSlides(n) {
    showSlides(slideIndex += n);
}

var slideIndex = 0;
showSlides();

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}


function otroValor() {
    let captura = document.getElementById("opcion")
    let mostrar = document.getElementById("ocultar")
    console.log("Entra")
    if (captura.value == 3) {
        mostrar.style.display = "inline-block";

    } else {
        mostrar.style.display = "none"
    }
}