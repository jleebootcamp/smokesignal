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
      /*getApi() {
        console.log("getAPI function running");
        var requestUrl = 'https://data.seattle.gov/resource/kzjm-xkqj.json';
        fetch(requestUrl)
        .then(response => response.json())
        .then(function(data) {
        for (var i = 0; i < data.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = data[i].address;
            repoList.appendChild(listItem);
        }
      })
      .catch(err => console.error(err));
      }
      getApi() {
          console.log("getAPI function start");

          var requestUrl = 'https://data.seattle.gov/resource/kzjm-xkqj.json';

          fetch(requestUrl)
          .then(response => response.json())
          .then(function(data) {
              for (var i = 0; i < data.length; i++) {
                  const newRow = document.getElementById('rowEl');
                  const newAddress = 
                  let addressText = document.createTextNode(data[i].address);
                  const addressEl = document.getElementById('address');
                  addressEl.appendChild(addressText);
              }
          })

          let addressText = document.createTextNode('Test Address 01');
          let alarmTypeText = document.createTextNode('Test Alarm Type 01');
          let incidentDateText = document.createTextNode('Test Incident Date 01');

          const address = document.getElementById('address');
          const alarmType = document.getElementById('alarmType');
          const incidentDate = document.getElementById('incidentDate');

          address.replaceChildren();
          alarmType.replaceChildren();
          incidentDate.replaceChildren();

          address.appendChild(addressText);
          alarmType.appendChild(alarmTypeText)
          incidentDate.appendChild(incidentDateText);

          console.log("getAPI function complete"); */
      }
    }