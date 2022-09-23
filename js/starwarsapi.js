const nome = document.getElementById("nome");
const filmesParticipadosList = document.getElementById("filmesParticipadosList");
const inputID = document.getElementById("inputID");
const btPesquisar = document.getElementById("btPesquisar");
const pLink = document.getElementById("pLink");

const handleClickBtPesquisar = async () => {
    const id = parseInt(inputID.value.trim());
    if (isNaN(id) || id <= 0) {
        alert("ID inválido! Digite um número positivo!");
        return;
    }
    resetData();
    basicData = await fillBasicInfo(id);

};

async function fillBasicInfo(id) {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = await response.json();
    nome.innerHTML = "<b>Nome:</b> " + data.name;
    altura.innerHTML = "<b>Altura:</b> " + data.height + "cm";
    peso.innerHTML = "<b>Massa:</b> " + data.mass + "kg";

    fillPlanetInfo(data.homeworld);
    fillFilms(data.films);
}

async function fillPlanetInfo(apiAddress) {
    const planetResponse = await fetch(apiAddress);
    const dataPlanet = await planetResponse.json();
    nomePlanetaNatal.innerHTML = "<b>Planeta de Origem:</b> " + dataPlanet.name;
}

async function fillFilms(films) {
    if(films.length > 0){
        filmesParticipou.innerHTML = "<b>Filmes em que participou:</b>";
    }

    for (film of films) {
        const filmResponse = await fetch(film);
        const dataFilm = await filmResponse.json();
        const liName = document.createElement("li");
        liName.innerHTML = dataFilm.title;
        filmesParticipadosList.appendChild(liName);
    }
}

function resetData() {
    filmesParticipadosList.innerHTML = "";
}

btPesquisar.onclick = handleClickBtPesquisar;



