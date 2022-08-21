function data() {
    function getThemeFromLocalStorage() {
        // if user already changed the theme, use it
        if (window.localStorage.getItem('dark')) {
            return JSON.parse(window.localStorage.getItem('dark'))
        }

        // else return their preferences
        return (
            !!window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        )
    }

    function setThemeToLocalStorage(value) {
        window.localStorage.setItem('dark', value)
    }

    return {
        dark: getThemeFromLocalStorage(),
        toggleTheme() {
            this.dark = !this.dark
            setThemeToLocalStorage(this.dark)
        },
        isSideMenuOpen: false,
        toggleSideMenu() {
            this.isSideMenuOpen = !this.isSideMenuOpen
        },
        closeSideMenu() {
            this.isSideMenuOpen = false
        },
        isNotificationsMenuOpen: false,
        toggleNotificationsMenu() {
            this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
        },
        closeNotificationsMenu() {
            this.isNotificationsMenuOpen = false
        },
        isProfileMenuOpen: false,
        toggleProfileMenu() {
            this.isProfileMenuOpen = !this.isProfileMenuOpen
        },
        closeProfileMenu() {
            this.isProfileMenuOpen = false
        },
        isPagesMenuOpen: false,
        togglePagesMenu() {
            this.isPagesMenuOpen = !this.isPagesMenuOpen
        },
        // Modal
        isModalOpen: false,
        trapCleanup: null,
        openModal() {
            this.isModalOpen = true
            this.trapCleanup = focusTrap(document.querySelector('#modal'))
        },
        closeModal() {
            this.isModalOpen = false
            this.trapCleanup()
        },
        getApi() {
            console.log("getAPI function start");
            var requestUrl = 'https://data.seattle.gov/resource/kzjm-xkqj.json';
            fetch(requestUrl)
            .then(response => response.json())
            .then(function(data) {
                const tableBody = document.getElementById('tableBody');
                data.forEach(
                    el => tableBody.insertAdjacentHTML(
                        'beforebegin',
                        `<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                            <tr class="text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3">
                                    ${el.address}
                                </td>
                                <td class="px-4 py-3">
                                    ${el.type}
                                </td>
                                <td class="px-4 py-3">
                                    ${el.datetime}
                                </td>
                            </tr>
                        </tbody>`
                    )
                );
            })
            .catch(err => console.error(err));
            console.log("getAPI function complete");
        },
        filter() {
            var input, filter, table, tr, td, cell, i, j;
            filter = document.getElementById("filterInput").value.toLowerCase();
            table = document.getElementById("userTable");
            tr = table.getElementsByTagName("tr");
            for (i = 1; i < tr.length; i++) {
                tr[i].style.display = "none";
                const tdArray = tr[i].getElementsByTagName("td");
                for (var j = 0; j < tdArray.length; j++) {
                    const cellValue = tdArray[j];
                    if (cellValue && cellValue.innerHTML.toLowerCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        break;
                    }
                }
            }
        },
    }
}

function initMap(){
    var requestURL = 'https://data.seattle.gov/resource/kzjm-xkqj.json?$limit=10'
    var options = {
        center: {lat: 47.6062, lng: -122.3321},
        zoom: 8
    }
    map = new google.maps.Map(document.getElementById("map"), options);

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        for (var i=0; i < data.length; i++) {
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
            map: map,
            title: data[i].address
            })
        }
    })

    var input = document.getElementById('searchInput');
    console.log(input)

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        //var place = autocomplete.getPlace();
        //if (!place.geometry) {
            //window.alert("Please click or tap on the correct search result");
            //return;
        //}
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

    var address = '';
    if (place.address_components) {
        address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
    }
    
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);

    for (var i = 0; i < place.address_components.length; i++) {
        if(place.address_components[i].types[0] == 'postal_code'){
            document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
        }
        if(place.address_components[i].types[0] == 'country'){
            document.getElementById('country').innerHTML = place.address_components[i].long_name;
        }
    }
    document.getElementById('location').innerHTML = place.formatted_address;
    document.getElementById('lat').innerHTML = place.geometry.location.lat();
    document.getElementById('lon').innerHTML = place.geometry.location.lng();
  });
}

var heroSection

function show_hide() {
    if(heroSection==1) {
        document.getElementById("hero").style.display="inline";
        return heroSection=0;
    }
    else {
        document.getElementById("hero").style.display="none";
        return heroSection=0;
    }
}
