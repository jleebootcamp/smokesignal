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
          }
          )
          .catch(err => console.error(err));
          console.log("getAPI function complete");
      },
      filter() {
        var input, filter, table, tr, td, cell, i, j;
        filter = document.getElementById("searchInput").value.toLowerCase();
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
}