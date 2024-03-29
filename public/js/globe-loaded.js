(function () {

    var earthObj;
    var localNewsMarker;

    window.addEventListener("earthjsload", function () {

        earthObj = new Earth(document.getElementById('earth'), {
            zoom: 1.05,
            light: 'none',

            transparent: true,
            mapSeaColor: 'RGBA(255,255,255,0.76)',
            mapLandColor: '#383838',
            mapBorderColor: '#5D5D5D',
            mapBorderWidth: 0.25,
            // mapStyles: ' #CU, #DO, #HT, #JM, #PR { fill: red; stroke: red; } ',
            mapHitTest: true,
            autoRotate: true,
            // autoRotateSpeed: 0.7,
            autoRotateDelay: 4000,

        });


        earthObj.addEventListener("ready", function () {
            this.startAutoRotate();

            distributedCompanies.forEach(function(item){
                earthObj.addOverlay({
                    location: { lat: item.lat, lng: item.lng },
                    offset: 0.3,
                    depthScale: 0.25,
                    className: 'dist-location',
                    occlude: false,
                    data : item
                })
                .element.addEventListener('click', showDetails);
            })
        });

    });


    function showDetails(event) {

        var overlay = event.target.closest('.earth-overlay').overlay,
        box = document.querySelector('.earth-box');

        box.classList.add('show-place-details');
        writeCompanydetials(overlay.data);
        event.stopPropagation();
        return;

        document.getElementById('breaking-news-' + newsId).classList.add('news-highlight');
        setTimeout(function () {
            document.getElementById('breaking-news-' + newsId).classList.remove('news-highlight');
        }, 500);

        earthObj.goTo(overlay.location, { duration: 250, relativeDuration: 70 });

    }


    var heading, subHeading, description;
    var headingElem, subHeadingElem, descriptionElem;
    headingElem = document.querySelector(".xx-dist-name")
    subHeadingElem = document.querySelector(".xx-country-name")
    descriptionElem = document.querySelector(".xx-dist-description")
    function writeCompanydetials(data) {
        headingElem.textContent = "";
        subHeadingElem.textContent = "";
        descriptionElem.textContent = "";
        // headingElem.classList.add('dh')
        subHeadingElem.classList.add('dh')
        descriptionElem.classList.add('dh')

        
        if(heading){
            heading.destroy();
        }
        if(subHeading){
            subHeading.destroy();
        }
        if(description){
            description.destroy();
        }

        heading = new TypeIt(".xx-dist-name", {
            strings: data.name,
            speed : 1,
            afterComplete: async (step, instance) => {
                instance.destroy();

                // country
                subHeadingElem.classList.remove('dh')
                subHeading = new TypeIt(".xx-country-name", {
                    strings: data.country,
                    speed : 1,
                    // paragraph
                    afterComplete: async (step, instance) => {
                        instance.destroy();
                        descriptionElem.classList.remove('dh')
                        description = new TypeIt(".xx-dist-description", {
                            strings: data.description,
                            speed : 2,
                            afterComplete: async (step, instance) => {
                                instance.destroy();
                            },
                        }).go();
                    },
                }).go();
            },
        }).go();
    }
})()

