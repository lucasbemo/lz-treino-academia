const seriesURL =  'https://raw.githubusercontent.com/lucasbemo/lz-treino-academia/main/series.json';
let series;

setup();


async function setup() {
    AddSeries();

    setActionOnTabButtons();
}

async function AddSeries() {
    series = await findSeries();

    series.forEach(serie => {
        document.querySelectorAll(".container").forEach((container) => {
            let hidden = 'hidden="hidden"';
            if (serie.serie === "A")
                hidden = '';

            container.insertAdjacentHTML("beforeend",
                `
                    <div class="carousel" ${hidden} id="carousel${serie.serie}">
                    </div>
                `
            );
        
            let equipamentos = serie.equipamento;

            addCarousel(equipamentos, `carousel${serie.serie}`);
        });
    });

    addCarouselButtons();
}

async function setActionOnTabButtons() {
    document.querySelectorAll(".btn").forEach((tabButton) => {
        console.log(tabButton.id);
        
        tabButton.addEventListener("click", () => {
            document.querySelectorAll(".carousel").forEach(carousel => carousel.setAttribute("hidden", "hidden"));

            let carousel = document.getElementById(`carousel${tabButton.id}`);
            console.log(carousel);
            carousel.removeAttribute("hidden");
        });
    });
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

async function addCarouselButtons() {
    document.querySelectorAll(".carousel").forEach((carousel) => {
        const items = carousel.querySelectorAll(".carousel__item");
        
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
