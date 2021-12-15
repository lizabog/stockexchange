class OnSearch {
  constructor() {
    this.searchTerm = document.getElementById("searchInput").value;
  }

  clearSearch = () => {
    while (listArea.firstChild) {
      listArea.removeChild(listArea.firstChild);
    }
  };

  loaderOn = () => {
    const loadBar = document.getElementById("loader");
    loadBar.classList.remove("hide");
  };
  loaderOff = () => {
    const loadBar = document.getElementById("loader");
    loadBar.classList.add("hide");
  };

  
  async getStockslist() {
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchTerm}&amp;limit=10&amp;exchange=NASDAQ`
      );
      const data = await response.json();
      return data.slice(0, searchResultLimit - 1);
    } catch (e) {
      console.error(e);
    }
  }
}
input.addEventListener("keyup", debounce(search, 1000));

function debounce(callback, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}async function search() {
  const currentSearch = new OnSearch();
  currentSearch.clearSearch();
  currentSearch.loaderOn();
  const searchArray = await currentSearch.getStockslist();
  currentSearch.loaderOff();
  for (let i = 0; i < searchArray.length; i++) {
    if (searchArray[i]) {
      const newSearchItem = new SearchResult(
        searchArray[i],
        await getCompProfile(searchArray[i].symbol, currentSearch.searchTerm),
        currentSearch.searchTerm
      );

      newSearchItem.addToList();
    } else break;
  }
}