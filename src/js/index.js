
document.addEventListener("DOMContentLoaded", function(){
    createGalery();
    scrollView();
    scrollNavigation();
});

function createGalery(){
    
    const galery = document.querySelector(".images-galery");
    

    for(let i=1;i<=12;i++){

        const img = document.createElement("img");        
        img.src = `build/img/thumb/${i}.webp`;

        img.dataset.dataId = i;
        // asihnar el evento click a la funcion
        img.onclick = showImage;

        const li = document.createElement("li");
        li.appendChild(img);

        galery.appendChild(li);

    }
}

function showImage(event){

    const id = event.target.dataset.dataId;

    const img = document.createElement("img");
    img.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.appendChild(img);

    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.className = "fixed-body";

    // BOTON PARA CERRAR IMAGEN
    const btn = document.createElement("p");
    btn.innerText = "X";
    btn.className = "btn-overlay";
    btn.addEventListener("click", function(){
        overlay.remove();
        body.removeAttribute("class");
        body.removeChild(overlay);
    });


    overlay.appendChild(btn);
    overlay.addEventListener("click", function(){
        overlay.remove();
        body.removeAttribute("class");
        body.removeChild(overlay);
    });
    
}

function scrollView(){

    const enlaces = document.querySelectorAll(".navegacion-principal a");

    enlaces.forEach(function (enlace){
        enlace.addEventListener("click", function(event){
            event.preventDefault();

            const seccion = document.querySelector(event.target.attributes.href.value);
            
            seccion.scrollIntoView({
                "behavior": "smooth"
            });
        });
    });

}

function scrollNavigation(){

    const barra = document.querySelector("#header");

    window.addEventListener("scroll", function(){
        const y = window.scrollY;

        if(y > document.querySelector("#header").clientHeight){
            barra.classList.add("fixed");
            console.log("DESAPARECIO LA BARRA");
        }else{
            barra.classList.remove("fixed");
            console.log("APARECIO LA BARRA");
        }
        
    });
    
}

    
    
