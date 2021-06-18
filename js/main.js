 window.onload= function(){


    


    
    $.ajax({
        url:"data/meni.json",
        method: "GET",
        success: function(meni){

            ispisMenija(meni)
            ispisMenijaDrugog(meni)


            var PeraPeric={
                ime: "Pera",
                prezime: "Peric",
                godiste: 1980,
                godine: function(){
                var datum = new Date();
                var tekuca = datum.getFullYear();
                console.log(this);
                console.log(tekuca
                - this.godiste);
                }
               

                }

                console.log(this);
                console.log(MikaMikic);
                var MikaMikic={
                ime: "Mika",
                prezime: "Mikic",
                godiste: 1990,
                }
                PeraPeric.godine();
                MikaMikic.godine = PeraPeric.godine
                ;
                MikaMikic.godine();
        }


    });

    ucitajRadove();


document.getElementById("sortiranjeOp").addEventListener("click", sortirajPoCeniOpadajuce);
document.getElementById("sortiranjeRa").addEventListener("click", sortirajPoCeniRastuce);
document.getElementById("sortiranjeNa").addEventListener("click", sortirajPoNazivu);
document.getElementById("sortiranjeAu").addEventListener("click", sortirajPoAutoru);
document.getElementById("cetirik").addEventListener("click", koloneCetiri);
document.getElementById("trik").addEventListener("click", koloneTri);
document.getElementById("viseb").addEventListener("click", ucitajRadove);
document.querySelector("#dugme").addEventListener("click", provera);




    
    
}


function ucitajRadove() 
{
    $.ajax({
        url:"data/radovi.json",
        method: "GET",
        success: function(proizvodi){
            ispisProizvoda(proizvodi)

           

            const filtriranje = document.querySelectorAll('.filtriranje');
            console.log(filtriranje);

            filtriranje.forEach(function(element) {
                element.addEventListener('click', function(e) {

                    

                    e.preventDefault();

                    const prezime = element.dataset.prezime;

                    const filtriraniRadovi = generalniFilter(proizvodi, prezime);

                    ispisProizvoda(filtriraniRadovi);

                    
                });

                
            });


            


     

        }});
}






function ispisMenija(meni){
   var ispis=""
    for(m of meni){
        ispis+=`<ul>
        <li>
            <a href="${m.link}">${m.stavke}</a>
        </li>
    </ul>
`
    }

    document.getElementById("meni").innerHTML+=ispis;
   

}

function ispisMenijaDrugog(meni){
    var ispis=""
     for(m of meni){
         ispis+=`
         <ul>
           <li><a class="grey-text text-lighten-3" href="${m.link}">${m.stavke}</a></li>
     </ul>
 `
     }
 
     document.getElementById("meni2").innerHTML+=ispis;
    
 
 
 }


function dohvatiSveProizvode() {
    $.ajax({
        url : "data/radovi.json",
        method : "GET",
        type : "json",
        success : function(data) {
            prikaziProizvode(data);
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
} 
function ispisProizvoda(proizvodi){
    let ispis=""
    for(p of proizvodi){

        if(p.id<13){

        
        ispis+=`
        <div class="col-lg-3 col-sm-5 flex-wrap p-4 kartice ">
                    

        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${p.slika.putanja}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${p.naziv}<i class="material-icons right">more_vert</i></span>
            <p>Autor: <a class="filtriranje" href="" data-prezime=${p.majstor.prezime}> ${p.majstor.prezime}</a></p>
            <p data-cena=${p.cena}>Cena:  ${p.cena} </p>  <a  class="srce korpa" data-id=${p.id} href=""><i class="material-icons srcee no">favorite</i></a>
            
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
            <p>${p.opis}</p>
            
          </div>
        </div>
          
                  
        
      </div>`}

      
    }
    document.getElementById("tetovaze").innerHTML=ispis;
    bindCartEvents();
   

}

//========================[ VANJA ]==================================
function bindCartEvents() 
{
    $(".korpa").click(addToCart);
}

function productsInCart() 
{
    return JSON.parse(localStorage.getItem("products"));
}

function addToCart() 
{

    
    let id = $(this).data("id");

    var products = productsInCart();

    if(products) {
        if(productIsAlreadyInCart()) {
            alert("Izabrali ste ovu tetovazu.");
        } else {
            addToLocalStorage()
        }
    } else {
        addFirstItemToLocalStorage();
    }

    alert("Sadržaj unet u korpu.");

    /* Male funkcije koje odradjuju po jednu funkcionalnost radi lakse odrzivosti koda */
    function productIsAlreadyInCart() {
        return products.filter(p => p.id == id).length;
    }

    function addToLocalStorage() {
        let products = productsInCart();
        products.push({
            id : id,
            quantity : 1
        });
        localStorage.setItem("products", JSON.stringify(products));
    }

   

    

    function addFirstItemToLocalStorage() {
        let products = [];
        products[0] = {
            id : id,
            quantity : 1
        };
        localStorage.setItem("products", JSON.stringify(products));
    }
}



function clearCart() {
    localStorage.removeItem("products");
}
//========================[ VANJA KRAJ ]=============================

function generalniFilter(filtrat, polje) 
{    
    return filtrat.filter(function (element) {
        return element.majstor.prezime === polje;
    });
}

function dodajUOmiljeno(stvari, stvar) 
{
    stvari.push(stvar);

    const stvarString = JSON.strigify(stvari);

    localStorage.setItem('omiljeno', 'stvariString');
}

function citajOmiljeno() 
{
    const omiljenoString = localStorage.getItem('omiljeno');

    if (omiljenoString === undefined) {
        return [];
    }

    return JSON.parse(omiljenoString);
}



/*
    const favorite = document.querySelectorAll('.favorite');

    favorite.forEach(function(element) {
        elemet.addEventListener('click', function() {
            const omiljenObjekat; DOBAVITI IZ JSONA

            const omiljeno = citajOmiljeno();

            dodajUOmiljeno(omiljeno, omiljenObjekat);
        });
    });
*/



function sortirajPoCeniOpadajuce(e) {
    e.preventDefault()
    $.ajax({
        url : "data/radovi.json",
        method : "GET",
        type : "json",
        success : function(data) { 
           data.sort(function(a,b) {
                if(a.cena==b.cena){ 
                    return 0}
                    else if(a.cena>b.cena){
                return  -1
            } else
            {return 1}
            });
            ispisProizvoda(data);

            const filtriranje = document.querySelectorAll('.filtriranje');
            console.log(filtriranje);

            filtriranje.forEach(function(element) {
                element.addEventListener('click', function(e) {

                    e.preventDefault();

                    const prezime = element.dataset.prezime;

                    const filtriraniRadovi = generalniFilter(data, prezime);

                    ispisProizvoda(filtriraniRadovi);
                });
            });
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}

function sortirajPoCeniRastuce(e) {
    e.preventDefault()
    $.ajax({
        url : "data/radovi.json",
        method : "GET",
        type : "json",
        success : function(data) { 
           data.sort(function(a,b) {
                if(a.cena==b.cena){ 
                    return 0}
                    else if(a.cena<b.cena){
                return  -1
            } else
            {return 1}
            });
            ispisProizvoda(data);
            console.log(ispisProizvoda)
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}

function sortirajPoNazivu(e) {
    e.preventDefault()
    $.ajax({
        url : "data/radovi.json",
        method : "GET",
        type : "json",
        success : function(data) { 
           data.sort(function(a,b) {
                if(a.naziv==b.naziv){ 
                    return 0}
                    else if(a.naziv<b.naziv){
                return  -1
            } else
            {return 1}
            });
            ispisProizvoda(data);
            console.log(ispisProizvoda)
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}

function sortirajPoAutoru(e) {
    e.preventDefault()
    $.ajax({
        url : "data/radovi.json",
        method : "GET",
        type : "json",
        success : function(data) { 
           data.sort(function(a,b) {
                if(a.majstor.ime==b.majstor.ime){ 
                    return 0}
                    else if(a.majstor.ime>b.majstor.ime){
                return  -1
            } else
            {return 1}
            });
            ispisProizvoda(data);
            console.log(ispisProizvoda)
        },
        error : function(xhr, error, status) {
            alert(status);
        }
    });
}

function koloneCetiri(e){
    e.preventDefault();
    $('.flex-wrap').removeClass('col-lg-4').addClass('col-lg-3')
}
function koloneTri(e){
    e.preventDefault();
    $('.flex-wrap').removeClass('col-lg-3').addClass('col-lg-4')
}



function prikaziVise(proizvodi){
    

    let ispis=""
    for(p of proizvodi){

        

        
        ispis+=`
        <div class="col-3 flex-wrap p-4 ">
                    

        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${p.slika.putanja}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${p.naziv}<i class="material-icons right">more_vert</i></span>
            <p>Autor: <a id="filtriranje" href="" data-id=${p.majstor.id}> ${p.majstor.prezime}</a></p>
            <p>Cena:  ${p.cena} </p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
            <p>${p.opis}</p>
          </div>
        </div>
          
                  
        
      </div>`

}
document.getElementById("tetovaze").innerHTML+=ispis;
        

}




function provera(e){
    e.preventDefault()

    let validno = true;
    let podaci = [];

    let ime, prezime, datumZakazivanja, napomena

    ime = document.getElementById("imei").value;
    prezime = document.getElementById("prezimei").value.trim();
    datumZakazivanja = document.getElementById("datumz").value.trim();
   napomena=document.getElementById("napomenai").value

    let reIme, reDatumZakazivanja, rePrezime, reNapomena;

    reIme = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/;
    rePrezime = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/;
    reDatumZakazivanja = /^(19[\d]{2}|20[01][\d])\-(0[1-9]|1[012])\-(0[1-9]|[12][\d]|3[01])$/;


    imeGreska = document.getElementById("greskai");
    prezimeGreska = document.getElementById("greskap");
    datumzGreska = document.getElementById("greskad");
    napomenaGreska = document.getElementById("#greskan");

    if(ime == ""){
        validno = false;
        imeGreska.innerHTML = "Polje ime je prazno."
    }
    else{
        if(!reIme.test(ime)){
            validno = false;
            imeGreska.innerHTML = "Ime nije u dobrom formatu.";
        }else{
            imeGreska.innerHTML = "";
            
        }
    }

    if(prezime == ""){
        validno = false;
        prezimeGreska.innerHTML = "Polje mejl je prazno."
    }
    else{
        if(!rePrezime.test(prezime)){
            validno = false;
            prezimeGreska.innerHTML = "Mejl nije u dobrom formatu.";
        }else{
            prezimeGreska.innerHTML = "";
            
        }
    }


}











