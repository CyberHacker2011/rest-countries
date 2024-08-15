import { countriesInfo } from "./countries-list.js";
let countries = countriesInfo;
allElementsPage(countries);

function allElementsPage(countries) {
    
    let countryId = localStorage.getItem('country-id');
    ownPage();
    countryInfoMake(countryId);
    let checkDarkMode = localStorage.getItem('darkmode');
    if (checkDarkMode=='active'){
        document.body.classList.add('dark-mode');
        changeIcons('dark')
    };
    document.querySelector('.dark-mode-turner').addEventListener('click', darkMode);
    document.querySelector('.back-button').addEventListener('click', goMainPage);

    function darkMode(){
        let checkActive = localStorage.getItem('darkmode');
        if (checkActive!='active'){
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkmode','active');
            changeIcons('dark');
        }else{
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkmode','null');
            changeIcons('white');
        }
        
    };

    function changeIcons(darkOrWhite){
        let moonIcon = document.querySelector('.dark-mode-icon-container');
        let backIcon = document.querySelector('.middle-section');
        if (darkOrWhite=='dark') {
            moonIcon.innerHTML = `<img src="icons/moon-icon-dark.png" alt="Dark mode icon" class="dark-mode-icon"></img>`;
            backIcon.innerHTML =`<button class="back-button"><img src="icons/back-icon-dark.png" alt="back icon" class="back-icon">Back</button>`;   
        }else{
            moonIcon.innerHTML = `<img src="icons/moon-icon-white.png" alt="Dark mode icon" class="dark-mode-icon"></img>`;
            backIcon.innerHTML =`<button class="back-button"><img src="icons/back-icon-white.png" alt="back icon" class="back-icon">Back</button>`;  
        }
        
        document.querySelector('.back-button').addEventListener('click', goMainPage);
    };
``
    function goMainPage(){
        window.location.replace('index.html');
    };

    function ownPage(){
        const countryPartLink = document.body;
        let countryPartHTML = `
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
        <div class="middle-section">
            <button class="back-button"><img src="icons/back-icon-white.png" alt="back icon" class="back-icon">Back</button>
        </div>
        <div class="country-own-page">
            
        </div>
        <link rel="stylesheet" href="styles/style-country.css">
        <script type="module" src="scripts/country-own-page.js"></script> 
        `;
        countryPartLink.innerHTML = countryPartHTML; 
    };


    function countryInfoMake (countryId){
        let countryInfoLink = document.querySelector('.country-own-page');
        let countryInfoHTML = ``;
        for (let m = 0; m<countries.length; m++){
            if (countryId==countries[m].country_id){
                let countryInfo = countries[m];
                console.log(countryInfo);
                let borderCountries = `
                <p>Border countries:</p>`;
                countryInfo.country_bordercountries.forEach( (bcountry) => {
                    borderCountries +=`
                    <p class="border-country">${bcountry}</p>`;
                });

                countryInfoHTML += `
                <div class="country-flag">
                    <img src="${countryInfo.country_flag}" alt="country flag" class="country-flag-image">
                </div>
                <div class="country-informations">
                    <div class="country-name">
                        <p>${countryInfo.country_name}</p>
                    </div>
                    <div class="country-informations-section">
                        <div class="country-informations-section-1">
                            <p>Native Name: <span>${countryInfo.country_nativename}</span></p>
                            <p>Population: <span>${countryInfo.country_population}</span></p>
                            <p>Region: <span>${countryInfo.country_region}</span></p>
                            <p>Sub Region: <span>${countryInfo.country_subregion}</span></p>
                            <p>Capital: <span>${countryInfo.country_capital}</span></p>
                        </div>
                        <div class="country-informations-section-2">
                            <p>Top Level Doamin: <span>${countryInfo.country_topleveldomain}</span></p>
                            <p>Currencies: <span>${countryInfo.country_currencies}</span></p>
                            <p>Languages: <span>Dutch, French, German</span></p>
                            
                        </div>
                    </div>
                    <div class="country-border-countries">
                        ${borderCountries}
                    </div>
                </div>
                `
            };
        };
        countryInfoLink.innerHTML = countryInfoHTML;

    };
};