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
      }
    }
}