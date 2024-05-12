const seriesURL =  'https://raw.githubusercontent.com/lucasbemo/lz-treino-academia/main/series.json';

AddSeries();

async function AddSeries() {
    let series = await findSeries();
    let equipamentos = series[0].equipamento;
    console.log(equipamentos);
    equipamentos.forEach(eq => {
        document.getElementById('carousel').innerHTML += 
        `
        <div class="carousel__item">
            <img src="images/${eq.img}" class="carousel__item__img" />
            <div class="carousel__item__text">
                <p>${eq.nome}</p>
            </div>
        </div>
        `
    });

    setUp();
}

async function findSeries() {
    let reponseSeries = await fetch(seriesURL);
    let series = await reponseSeries.json();
    console.log(series);
    
    return series;
}

async function setUp() {
    document.querySelectorAll(".carousel").forEach((carousel) => {
        const items = carousel.querySelectorAll(".carousel__item");
        console.log(items.length);
        const buttonsHtml = Array.from(items, () => {
            return `<span class="carousel__button"></span>`;
        });
    
        carousel.insertAdjacentHTML("beforeend",
            `
              <div class="carousel__nav">
                  ${buttonsHtml.join("")}
              </div>
            `
        );
    
        const buttons = carousel.querySelectorAll(".carousel__button");
    
        buttons.forEach((button, i) => {
            button.addEventListener("click", () => {
                // un-select all the items
                items.forEach((item) =>
                    item.classList.remove("carousel__item--selected")
                );
                buttons.forEach((button) =>
                    button.classList.remove("carousel__button--selected")
                );
    
                items[i].classList.add("carousel__item--selected");
                button.classList.add("carousel__button--selected");
            });
        });
    
        // Select the first item on page load
        items[0].classList.add("carousel__item--selected");
        buttons[0].classList.add("carousel__button--selected");
    });
}

