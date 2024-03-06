$(document).ready(function(){
    var svePonude;
    var cenaZaFiltriranje;
    var noOffersElement= document.getElementById("noOffers");

    $.ajax({
      url: 'assets/data/offers.json',
      dataType: 'json',
      success: function(data){
        svePonude = data.offers;
        ucitajPodatke(svePonude);
        popuniPadajucuListu(svePonude);
      }
    });

    $(window).on('load', function() {
        var cbs = document.querySelectorAll('input[type="checkbox"]');
        cbs.forEach(function(checkbox){
            checkbox.checked = false;
        });
    });

    function ucitajPodatke(ponude){
        $('#ispis').empty();
        if (ponude.length === 0) {
           
            noOffersElement.style.visibility='visible';
            
        }
        else {
            noOffersElement.style.visibility="hidden";
        }
    
        for (var i = 0; i < ponude.length; i++) {
            var ponuda = ponude[i];
            var jeNovaHtml = ponuda.tags.isNew ? '<span class="an-new text-uppercase p-1">New</span>' : '';
            var jePopunjenaHtml = ponuda.tags.isFull ? '<span class="an-full text-uppercase p-1">Full</span>' : '';
            var ocenaHtml = '';
            for (var j = 1; j <= 5; j++) {
                if (j <= ponuda.rating) {
                    ocenaHtml += '<li class="list-inline-item m-0"><i class="fa fa-star"></i></li>';
                } else {
                    ocenaHtml += '<li class="list-inline-item m-0"><i class="fa fa-star-o"></i></li>';
                }
            }
            var cenaHtml = '';
            if(ponuda.price.old && ponuda.price.new) {
                cenaHtml= `<div class="col-xl-6 col-lg-12 justify-content-end text-right">
                <p><span class="an-oldprice">${ponuda.price.old}</span> ${ponuda.price.new}</p>
                </div>`;
            }
            else {
                cenaHtml= `
                <div class="col-xl-6 col-lg-12 justify-content-end text-right">
                    <p>${ponuda.price.new}</p>
                </div>`;
            }
            var karticaHtml = `
                <div class="col-xs-12 col-sm-6 col-lg-3">
                    <div class="card rounded shadow-sm border-0" >
                    ${jeNovaHtml}
                    <img src="${ponuda.image}" class="card-img-top" alt="Slika kartice za ${ponuda.title}">
                    <div class="card-body">
                        <h4 class="card-title text-center py-2">${ponuda.title}</h4>
                        <h5 class="text-right my-4">${ponuda.location}</h5>
                        <p class="opis text-center">${ponuda.description}</p>
                        <div class="container">
                        <div class="row">
                            <ul class="list-inline col-xl-6 col-lg-12 ">
                            ${ocenaHtml}
                            </ul>
                            ${cenaHtml}
                        </div>
                        </div>
                    </div>
                    </div>
                    ${jePopunjenaHtml}
                </div>
            `;
            $('#ispis').append(karticaHtml);
        }
    }

    function popuniPadajucuListu(ponude) {
        var select = $('#drpbox');
        select.append($('<option></option>').val('All').text('All')); 
    
        var jedinstveneLokacije = [];
        for (var i = 0; i < ponude.length; i++) {
            var ponuda = ponude[i];
            if (!jedinstveneLokacije.includes(ponuda.location)) {
                jedinstveneLokacije.push(ponuda.location);
            }
        }
    
        for (var j = 0; j < jedinstveneLokacije.length; j++) {
            select.append($('<option></option>').val(jedinstveneLokacije[j]).text(jedinstveneLokacije[j]));
        }
    
        select.change(function() {
            try {
                var izabranaLokacija = $(this).val(); 
                var filtriranePonude;
                if(izabranaLokacija === 'All') {
                    filtriranePonude = svePonude; 
                } else {
                    filtriranePonude = svePonude.filter(function(ponuda) {
                        return ponuda.location === izabranaLokacija; 
                    });
                }
            } catch (error) {
                console.log.error('There is error loading the locations', error);
            }
            ucitajPodatke(filtriranePonude); 
        });
    }

    $('#cena').on('input', function() {
        cenaZaFiltriranje = parseFloat($(this).val()); 
        var sortiranePonude = svePonude.filter(function(ponuda) {
            return parseFloat(ponuda.price.new) <= cenaZaFiltriranje; 
        });
        ucitajPodatke(sortiranePonude); 
    });

    $('input[type=checkbox][id^=inlineCheckbox]').change(function() {
        var izabraneOcene = []; 
    
      
        $('input[type=checkbox][id^=inlineCheckbox]').each(function() {
            if ($(this).prop('checked')) {
                izabraneOcene.push(parseInt($(this).val())); 
            }
        });
    
        
        if (izabraneOcene.length === 0) {
            ucitajPodatke(svePonude);
        } else {
            
            var filtriranePonude = svePonude.filter(function(ponuda) {
                return izabraneOcene.includes(ponuda.rating);
            });
            ucitajPodatke(filtriranePonude);
        }
    });
    
});
