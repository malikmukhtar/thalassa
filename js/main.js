(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 300, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Progress Bar
    $(".animated-progress span").each(function () {
        $(this).animate(
            {
                width: $(this).attr("data-progress") + "%",
            },
            1000
        );
        $(this).text($(this).attr("data-progress") + "%");
    });
    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        autoplayTimeout:10000,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        autoplayTimeout:10000,
        center: true,
        dots: true,
        loop: true,
         nav : true,
         navText: ['<i class="fa fa-angle-left">', '<i class="fa fa-angle-right">'],
        responsive: {
        
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
        
    });
        $('.sponsors-carousel').owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            smartSpeed: 700,
            autoplay: true,
            navText: [ '<span class="la la-angle-left"></span>', '<span class="la la-angle-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                768:{
                    items:3
                },
                1024:{
                    items:4
                }
            }
        });

    })(jQuery);


    document.addEventListener("DOMContentLoaded", function() {
        const apiUrl = 'https://newsdata.io/api/1/news?apikey=pub_49691f27437ba23404a23ee008aebfd48a895&q=CBN%20AND%20Dollar&country=ng';
        const cacheKey = 'apiDataCache';
        const cacheExpiration = 3 * 60 * 60 * 1000; // Cache expiration time in milliseconds (e.g., 1 hour)
    
        // Function to make the API call
        function fetchData() {
            const cachedData = getCachedData();
    
            if (cachedData) {
                displayResults(cachedData);
            } else {
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Cache the data
                        setCachedData(data);
                        // Display the result
                        displayResults(data);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                        document.getElementById('results').textContent = 'Error fetching data.';
                    });
            }
        }
    
        // Function to get cached data
        function getCachedData() {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const cachedObj = JSON.parse(cached);
                const now = new Date().getTime();
                // Check if cache has expired
                if (now - cachedObj.timestamp < cacheExpiration) {
                    return cachedObj.data;
                } else {
                    // If cache expired, remove it
                    localStorage.removeItem(cacheKey);
                }
            }
            return null;
        }
    
        // Function to set cached data
        function setCachedData(data) {
            const cacheObj = {
                timestamp: new Date().getTime(),
                data: data
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheObj));
        }
    
        // Function to display the results
        function displayResults(data) {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
    
            data.results.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('col-lg-4');
                itemDiv.classList.add('wow');
                itemDiv.classList.add('slideInUp');

                itemDiv.innerHTML = `
                <div class="blog-img position-relative overflow-hidden">
                        <a href="blog-details.html"> <img class="img-fluid" src="${item.image_url}" alt=""></a>
                </div>
                <div class="p-4 ps-0">
                    <div class="d-flex mb-3">
                        <small class="me-3"><i class="far fa-user text-primary me-2"></i>${item.source_id}</small>
                        <small><i class="far fa-calendar-alt text-primary me-2"></i>${item.pubDate}</small>
                    </div>
                    <a class=" text-primary" href="${item.source_url}" target="_blank"><h4 class="mb-3">${item.title}</h4></a>
                    
                    <a class="text-uppercase text-primary" href="${item.source_url}" target="_blank">Read More <i class="bi bi-arrow-right"></i></a>
                </div>
            `;

                resultsDiv.appendChild(itemDiv);
            });
        }
    
        // Call the fetchData function on page load
        fetchData();
    });

    function sendMail() {
        var params = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          message: document.getElementById("message").value,
        };
      
        const serviceID = "service_hsldqp6";
        const templateID = "template_wh5x4ao";
      
          emailjs.send(serviceID, templateID, params)
          .then(res=>{
              document.getElementById("name").value = "";
              document.getElementById("email").value = "";
              document.getElementById("message").value = "";
              document.getElementById("phone").value = "";
              console.log(res);
              alert("Your message sent successfully!!")
      
          })
          .catch(err=>console.log(err));
      
      }
    


   
    
    

