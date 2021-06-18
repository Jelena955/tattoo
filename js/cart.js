$(document).ready(function () {
    let products = productsInCart();
    
    if(!products.length)
        showEmptyCart();
    else
        displayCartData();

});

function displayCartData() {
    let products = productsInCart();

    $.ajax({
        url : "data/radovi.json",
        success : function(data) {
            let productsForDisplay = [];





            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }
                        
                }
                return false;
            });
            generateTable(data)
        }
    });
}

function generateTable(products) {
    let html = `
            <table class="tabela">
				<thead>
					<tr>
						
						<th style="padding:30px">Slika proizvoda</th>
						<th style="padding:30px">Ime proizovda</th>
                        <th style="padding:30px">Cena</th>
						<th style="padding:30px">Obriši</th>
					</tr>
				</thead>
				<tbody>`;
                
    for(let p of products) {
        html += generateTr(p);
    }

    html +=`    </tbody>
            </table>`;

    $("#content").html(html);

    function generateTr(p) {
       return  `<tr class="rem1">
       
        <td  class="invert-image slikaomiljeno">
            <a href="single.html">
                <img src="${p.slika.putanja}" alt="${p.slika.alt}" class="img-responsive">
            </a>
        </td>
        <td style="padding:30px" class="invert">${p.naziv}</td>
        <td style="padding:30px" class="invert">${p.cena}</td>
        <td style="padding:30px" class="invert">
            <div class="rem">
                <div class=""><button onclick='removeFromCart(${p.id})'>Remove</button> </div>
            </div>
        </td>
    </tr>`
    }
}

function showEmptyCart() {
    $("#content").html("<h1 style='color:white;'>Vaša korpa je prazna!</h1>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}



function removeFromCart(id) {
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));

    displayCartData();
}