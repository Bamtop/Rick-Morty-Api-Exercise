
const browser = document.getElementById("search");
const content = document.getElementsByClassName('content')[0];
const button = document.getElementsByClassName("search-button")[0];
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
        const dataRow = createCard(data);
        content.appendChild(dataRow);
    });

}

const createCard = (rowData) => {


    // imagen
    const imageTd = document.createElement('img');
    imageTd.setAttribute('src',rowData['image']);

    return imageTd;
}

button.addEventListener('click', fetchDataAndCreateCard);
