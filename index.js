let submitBtnEl = document.getElementById('submitBtn');
let searchBarEl = document.getElementById('searchBar');
let mainContainerEl = document.getElementById('mainContainer');

let cityDetailsContainerEl = document.getElementById('cityDetailsContainer');

cityDetailsContainerEl.style.display = 'none';

let cityNameEl = document.getElementById('cityName')
let cityConditionEl = document.getElementById('cityCondition');
let cityTempEl = document.getElementById('cityTemp');
let cityWindSpeedEl = document.getElementById('cityWindSpeed');

let apiKey = 'c965927c0f19842ae76ebe882fce0792'

let setBackgroundImage = (background) => {
    let backgroundImage;

    switch (background){
        case "Clear":
            backgroundImage = "url('https://res.cloudinary.com/drnrrd97f/image/upload/v1709219238/hi-res-sky-wallpaper-br8e0koqmzyol36d_mjpfg9.jpg')";
            break;
        case "Clouds":
            backgroundImage = "url('https://res.cloudinary.com/drnrrd97f/image/upload/v1709219240/pexels-pixabay-46160_avdye2.jpg')";
            break;
        case "Rain":
            backgroundImage = "url('https://res.cloudinary.com/drnrrd97f/image/upload/v1709042867/rain1_sehode.jpg')";
            break;
        case "Haze":
            backgroundImage = "url('https://res.cloudinary.com/drnrrd97f/image/upload/v1709209487/what-is-haze-960x640_dkag0o.jpg')";
            break;
        default:
            backgroundImage = "url('https://res.cloudinary.com/drnrrd97f/image/upload/v1707999528/wa_m5jfcp.jpg')";
            break;
    }

    mainContainerEl.style.backgroundImage = backgroundImage
    
}

submitBtnEl.addEventListener('click', () => {
    let searchBarElValue = searchBarEl.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchBarElValue}&appid=${apiKey}`

    if (searchBarElValue !== ''){
        const getWheather = async () => {
            const response = await fetch(url);
            const data = await response.json()
            // console.log(data)
            if (response.ok){
                setBackgroundImage(data.weather[0].main)
                const cityNameText = data.name
                const descriptionText = data.weather[0].description
                const temperatureText = data.main.temp
                const windSpeedText = data.wind.speed

                const convertedTemp = (temperatureText - 273).toFixed(2)
                
                cityDetailsContainerEl.style.display = 'flex'

                cityNameEl.textContent = cityNameText;
                cityConditionEl.textContent = descriptionText;
                cityTempEl.textContent = convertedTemp;
                cityWindSpeedEl.textContent = windSpeedText;

            }
            
            else{
                alert(data.message)
            }
        }
    
        getWheather()
    }else{
        alert('Enter the City Name')
    }
    
})