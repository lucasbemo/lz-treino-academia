const seriesURL =  'https://raw.githubusercontent.com/lucasbemo/lz-treino-academia/main/series.json';

AddSeries();

async function AddSeries() {
    let series = await findSeries();

    series.forEach(serie => {
        document.querySelectorAll(".container").forEach((container) => {
            container.insertAdjacentHTML("beforeend",
                `
                    <div class="carousel" id="carousel${serie.serie}">
                    </div>
                `
            );
        
            let equipamentos = serie.equipamento;

            addCarousel(equipamentos, `carousel${serie.serie}`);
        });
    });
    setUpCarousel();
}

async function findSeries() {
    let reponseSeries = await fetch(seriesURL);
    let series = await reponseSeries.json();
    
    return series;
}

async function addCarousel(equipamentos, carouselId) {
    const carouselItemId = `carousel__item carousel__item${carouselId}`;

    equipamentos.forEach(equipamento => {
        document.getElementById(carouselId).innerHTML += 
            `
            <div class="${carouselItemId}">
                <img src="images/${equipamento.img}" class="carousel__item__img" />
                <div class="carousel__item__text">
                    <p>${equipamento.nome}</p>
                </div>
            </div>
            `;
    });
}

async function setUpCarousel() {
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
