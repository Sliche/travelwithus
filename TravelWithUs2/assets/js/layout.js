$(document).ready(function() {

  //Ovde sam napravio layout koji cu koristiti i na drugim stranicama





      //Navigacija

      var navbarContainer = $("#navbarResponsive");
      $.ajax({
          url: "assets/data/meni.json",
          method: "GET",
          dataType: "json",
          success: function(data) {
              prikaziNavigaciju(data.links);
          },
          error: function(xhr, status, error) {
              console.error("AJAX error:", status, error);
          }
      });

      
      function prikaziNavigaciju(links) {
      var navList = $("<ul>", { class: "navbar-nav ml-auto" }); 
      for (var i = 0; i < links.length; i++) {
          var link = links[i];
          var navItem = $("<li>", { class: "nav-item" });
          var navLink = $("<a>", { class: "nav-link", text: `${link.text}`, href: `${link.url}` });
          navItem.append(navLink);
          navList.append(navItem); 
      } 

          
          navbarContainer.append(navList);

      }

      //Footer
    
    $.ajax({
      url: 'assets/data/footer.json',
      dataType: 'json',
      success: function(data) {
     
        var fontAwsomeHtml = '';
        data.fontAwsome.forEach(function(icon) {
            fontAwsomeHtml += '<a class="btn btn-outline-light btn-floating m-1" href="' + icon.link + '" role="button"><i class="' + icon.class + '"></i></a>';
        });
        $('.an-fa').append(fontAwsomeHtml);
  
        var navHtml = '';
        data.footerNavigation.forEach(function(navItem) {
          navHtml += '<div class="col-md-2"><h6 class="text-uppercase font-weight-bold"><a href="' + navItem.link + '" class="text-white"';
          if (navItem.target) {
            navHtml += ' target="' + navItem.target + '"';
          }
          navHtml += '>' + navItem.label + '</a></h6></div>';
        });
        $('.row.text-center.d-flex.justify-content-center.py-4').html(navHtml);
      },
      error: function(xhr, status, error) {
        console.error('AJAX error:', status, error);
      }
    });


    
  });
  