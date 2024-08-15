import { countriesInfo } from "./countries-list.js";
let countries = countriesInfo;
allElementsPage(countries);

function allElementsPage(countries) {

    mainPage();
    
    
    document.querySelector('.search-bar').addEventListener('keydown', searchCountries);
    document.querySelector('.search-button').addEventListener('click', searchCountries);
    document.querySelector('.filter-region').addEventListener('change', filterCountriesRegion);
    
    document.querySelectorAll('.country').forEach( (test) => {
        test.addEventListener('click', function (){
            localStorage.setItem('country-id', this.id);
            goOwnPage();
        });
    });
    
    
    
    let checkDarkMode = localStorage.getItem('darkmode');
    if (checkDarkMode=='active'){
        document.body.classList.add('dark-mode');
        changeIcons('dark')
    };

    document.querySelector('.dark-mode-turner').addEventListener('click', darkMode);

    

    function goOwnPage() {
        window.location.replace('country.html');
    };


    function mainPage(){
        let allElements = `
        <div class="header">
            <div class="first-section">
                <h1>Where in the world?</h1>
            </div>
            <div class="second-section dark-mode-turner">
                <div class="dark-mode-icon-container">
                    <img src="icons/moon-icon-white.png" alt="Dark mode icon" class="dark-mode-icon">
                </div>
                
                <p>Dark Mode</p>
            </div>
        </div>
        <div class="search-filter-container">
            <div class="search-container">
                <button class="search-button">
                    <img src="icons/search-icon-white.png" alt="search-button-icon" class="search-button-icon">
                </button>
                <input type="text" class="search-bar" placeholder="Search a country...">
            </div>
            <div class="filter-container" >
                <select class="filter-region">
                    <option vales="no filter">No filter</option>
                    <option value="africa">Africa</option>
                    <option value="america">America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Ocenia</option>
                </select>
            </div>
        </div>
        <div class="countries-list">
        </div>
        
        <link rel="stylesheet" href="styles/style.css">
        <script src="scripts/scipts.js" type="module"></script>
        `
        document.body.innerHTML = allElements;
        countriesList(countries);
    }

    function countriesList(countries){
        const countriesListLink = document.querySelector('.countries-list');
        let countriesListHTML = ``;
        for (let i = 0; i<countries.length; i++){
            let country = countries[i];
            countriesListHTML += `
                    <div class="country" id="${country.country_id}" ">
                        <div class="country-flag" >
                            <img src="${country.country_flag}" alt="country flag" class="country-flag-image" >
                        </div>
                        <div class="country-name" >
                            <p >${country.country_name}</p>
                        </div>
                        <div class="country-informations" >
                            <div class="country-population" >
                                <p >Population: <span>${country.country_population}</span></p>
                            </div>
                            <div class="country-region" >
                                <p >Region: <span>${country.country_region}</span></p>
                            </div>
                            <div class="country-capital" >
                                <p >Capital: <span>${country.country_capital}</span></p>
                            </div>
                        </div>
                    </div>`;
        };
        countriesListLink.innerHTML = countriesListHTML;
        document.querySelectorAll('.country').forEach( (test) => {
            test.addEventListener('click', function (){
                localStorage.setItem('country-id', this.id);
                goOwnPage();
            });
        });
    };

    function darkMode(){
        let checkActive = localStorage.getItem('darkmode');
        if (checkActive!='active'){
            localStorage.setItem('darkmode','active');
            document.body.classList.add('dark-mode');
            changeIcons('dark');
        }else{
            localStorage.setItem('darkmode','null');
            document.body.classList.remove('dark-mode');
            changeIcons('white');
        }

    };


    function changeIcons(darkOrWhite){
        let moonIcon = document.querySelector('.dark-mode-icon-container');
        let searchIcon = document.querySelector('.search-button');
        if (darkOrWhite=='dark') {
            moonIcon.innerHTML = `<img src="icons/moon-icon-dark.png" alt="Dark mode icon" class="dark-mode-icon"></img>`;
            searchIcon.innerHTML =`<img src="icons/search-icon-dark.png" alt="search-button-icon" class="search-button-icon"></img>`;   
        }else{
            moonIcon.innerHTML = `<img src="icons/moon-icon-white.png" alt="Dark mode icon" class="dark-mode-icon"></img>`;
            searchIcon.innerHTML =`<img src="icons/search-icon-white.png" alt="search-button-icon" class="search-button-icon"></img>`;  
        }
    };

    function searchCountries(){
        let searchWord = document.querySelector('.search-bar').value;
        if (!searchWord){
            countriesList(countries);
        }else{
            searchWord = searchWord.toLowerCase();
            let searchedCountries = [];
            for(let l = 0; l<countries.length; l++){
                if ((countries[l].country_id==searchWord) || (countries[l].country_id.startsWith(searchWord))){
                    searchedCountries.push(countries[l]);
                };
            };
            countriesList(searchedCountries);
            document.querySelector('.filter-region').options[0].selected = 'selected';
        };
        
    };

    function filterCountriesRegion() {
        let filterRegion = document.querySelector('.filter-region').value;
        let filteredCountries = [];
        filterRegion = filterRegion.toLowerCase();
        if (filterRegion=='no filter'){
            countriesList(countries);
        }else{
            for (let k = 0; k<countries.length; k++){
                let countryRegion = countries[k].country_region.toLowerCase();
                if (filterRegion==countryRegion){
                    filteredCountries.push(countries[k]);
                };
            };
            countriesList(filteredCountries);
            document.querySelector('.search-bar').value = '';
        };
        
    };

};
