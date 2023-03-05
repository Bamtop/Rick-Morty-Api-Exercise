
const browser = document.getElementById("search");
const content = document.getElementsByClassName('content')[0];
const searchButton = document.getElementsByClassName("search-button")[0];
const searchInput = document.getElementById("search");
const status = document.getElementById("Status");
const gender = document.getElementById("Gender");
const species = document.getElementById("Species");
const nextButton = document.getElementsByClassName("next-button")[0];
const prevButton = document.getElementsByClassName("prev-button")[0];
const columnButton = document.getElementsByClassName("change-column")[0];
let isChanged = false;


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
    if(nextPage == null){
        nextButton.style.display="none";
    }else{
        nextButton.style.display="block";
    }
    if (prevPage ==null){
        prevButton.style.display="none";

    }else{
        prevButton.style.display="block";
    }

}
//create function data to card
const create = (characterData) => {
    let characterDataInfo =characterData['results']
    characterDataInfo.forEach(data => {

        const card = document.createRange().createContextualFragment(/*html*/`
   <div class="card">
    <img class="image-card" src=${data.image} alt='${data.name}'>
       <article class="container">
        <h4><b>${data.name}</b></h4>
        <p class="card_status">Status:  ${data.status}</p>
        <p class="card_species">Specie:  ${data.species}</p>
        <p class="card_type">Type:  ${data.type}</p>
        
        </article>
    </div>
    
    `)
        content.append(card);
    });
}

//debounce function
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
    let icon = document.getElementsByClassName("icon")[0];
    icon.classList.add("spin");
})

browser.addEventListener('blur',()=>{
    let icon = document.getElementsByClassName("icon")[0];
    icon.classList.remove("spin");
})

columnButton.addEventListener('click', ()=>{
    if(isChanged === false){
        content.style.gridTemplateColumns="1fr 1fr 1fr 1fr 1fr";
        isChanged = true;


    }else{
        content.style.gridTemplateColumns= "1fr 1fr 1fr";
        isChanged=false;

    }





})
fetchDataAndCreateCard();

