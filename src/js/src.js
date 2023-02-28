
const browser = document.getElementById("search");
const content = document.getElementsByClassName('content')[0];
const searchButton = document.getElementsByClassName("search-button")[0];
const searchInput = document.getElementById("search");
const status = document.getElementById("Status");
const gender = document.getElementById("Gender");
const species = document.getElementById("Species");
const nextButton = document.getElementsByClassName("next-button")[0];
const prevButton = document.getElementsByClassName("prev-button")[0];

let isPrev;
let isNext;
let prevPage ='';
let nextPage ='';

//api call
const fetchDataAndCreateCard = () => {
        while (content.hasChildNodes()){
        content.removeChild(content.lastChild);
    }
    let uri=`https://rickandmortyapi.com/api/character/?name=${browser.value}&status=${status.value}&gender=${gender.value}&species=${species.value}`

    if(isPrev){
        uri=prevPage;

    }else if (isNext){
        uri = nextPage;
    }
    fetch(uri)
        .then(res => res.json())
        .then(data => {
            create(data);
            setPrevAndNext(data);
        });


};

function setPrevAndNext(data){
    nextPage  = data['info']['next'];
    prevPage= data['info']['prev'];

}
//create funtion data to card
const create = (characterData) => {
    let characterDataInfo =characterData['results']
    characterDataInfo.forEach(data => {

        const card = document.createRange().createContextualFragment(/*html*/`
   <div class="card">
    <img class="image-card" src=${data.image} alt='${data.name}'>
       <article class="container">
        <h4><b>${data.name}</b></h4>
        <p>${data.status}</p>
        <p>${data.species}</p>
        <p>${data.type}</p>
        
        </article>
    </div>
    
    `)
        content.append(card);
    });
}

//debounce funtion
function debounce(func, wait = 300) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
const processChange = debounce((value) =>{
    fetchDataAndCreateCard();
});
searchInput.addEventListener("keyup", (e) => {
    processChange(e.target.value);
});
nextButton.addEventListener('click',() =>{
    isNext = true;
    fetchDataAndCreateCard();
    isNext = false;

});
prevButton.addEventListener('click',()=>{
    isPrev = true;
    fetchDataAndCreateCard();
    isPrev = false;
});

searchButton.addEventListener('click', fetchDataAndCreateCard);
status.addEventListener("change", fetchDataAndCreateCard);
gender.addEventListener("change", fetchDataAndCreateCard);
species.addEventListener("change", fetchDataAndCreateCard);
browser.addEventListener('input',()=>{
    const icon = document.getElementsByClassName("icon")[0];
    icon.classList.add("spin");
})

browser.addEventListener('blur',()=>{
    const icon = document.getElementsByClassName("icon")[0];
    icon.classList.remove("spin");
})
