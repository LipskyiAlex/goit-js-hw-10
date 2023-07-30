import { fetchBreeds, fetchCatByBreed} from "./cat-api";
import Notiflix from "notiflix";

const refs = {
    
    select: document.querySelector(".breed-select"),
    catInfo: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),

}



refs.select.addEventListener("change", fetchCatInfo);


// Фетчим список

fetchBreeds()
.then((data) => renderMarkup(data))
.catch((error) => {

    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
});


//Рендерим список

function renderMarkup(data) {
  
    refs.select.classList.remove("hidden");
    refs.loader.classList.add("hidden");
    refs.data = data;
   const markup = data.reduce((acum,element) => {
       return acum+`<option value="${element.id}">${element.name}</option>`
     },"")
     refs.select.insertAdjacentHTML("afterbegin",markup);

    
}

//Фетчим конкретный элемент списка 

function fetchCatInfo() {

    refs.catInfo.classList.add("hidden");
     refs.loader.classList.remove("hidden");

    const selectedValue = refs.select.value;

    fetchCatByBreed(selectedValue)
    .then((data) => renderCatInfo(data))
    .catch((error) => {

        Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    })
}

//Рендерим конкретный элемент списка

function renderCatInfo(data) {
    
    console.log('hello');
    refs.catInfo.classList.remove("hidden");
    refs.loader.classList.add("hidden");

    const selectedIndex = refs.select.selectedIndex;
    const name = refs.data[selectedIndex].name;
    const description = refs.data[selectedIndex].description;
    const temperament = refs.data[selectedIndex].temperament; 
   
    const markup = `<img src="${data[0].url}" alt="${name}" width="350">
    <div>
    <h3>${name}</h3>
        <p>${description}</p>
        <p><span class="temper">Temperament: </span>${temperament}</p>
        </div>`
    refs.catInfo.innerHTML = markup;
}

