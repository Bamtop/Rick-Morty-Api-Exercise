
const browser = document.getElementById("search");
const content = document.getElementsByClassName('content')[0];
const button = document.getElementsByClassName("search-button")[0];
const searchInput = document.getElementById("search");
const processChange = debounce((value) =>{
    fetchDataAndCreateCard();
});
const fetchDataAndCreateCard = () => {
        while (content.hasChildNodes()){
        content.removeChild(content.lastChild);
    }
    fetch(`https://rickandmortyapi.com/api/character/?name=${browser.value}`)
        .then(res => res.json())
        .then(data => create(data));
};


const create = (tableData) => {
    tableData['results'].forEach(data => {
        const main = document.querySelector("content");
        const card = document.createRange().createContextualFragment(/*html*/`
   <div class="card">
    <img src=${data.image} alt="Avatar" style="width:100%">
       <div class="container">
        <h4><b>${data.name}</b></h4>
        <p>${data.status}</p>
        <p>${data.species}</p>
        <p>${data.type}</p>
        
        </div>
    </div>
    
    `)
        content.append(card);
    });



}

function debounce(func, wait = 300) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
searchInput.addEventListener("keyup", (e) => {
    processChange(e.target.value);
});



button.addEventListener('click', fetchDataAndCreateCard);
