
// fetch = nativo do js 
// retorna uma Promisse => async/ await // then 
// Recebe 2 argumentos => Primeiro é obrigatório => URL / Segundo => objeto configuração 
// converter .json() => ter os dados de uma forma que o js entenda



const baseUrl = "https://el-geladon-backend-by-ip.herokuapp.com/paletas"

// Read ALL
async function findAllPaletas() {

    const response = await fetch(`${baseUrl}/find-paletas`) // https://el-geladon-backend-by-ip.herokuapp.com/paletas/find-paletas
    
    console.log("response:", response)

    const paletas = await response.json()
    console.log("paletas:", paletas)

    // 1. Selecionar o elemento html que eu quero modificar (seletores)
    // getElementById("paletaList")
    // querySelector("#paletaList")
    // querySelectoAll(PaletaListItem)
    const paletaDivElement = document.getElementById("paletaList")

    // console.log("paletaDivElement", paletaDivElement)

    // *****Exibir apenas uma paleta na tela 
    // paletaDivElement.insertAdjacentHTML("beforeend", 
    //     ` 
    //     <div class="PaletaListaItem">
    //         <div>
    //             <div class="PaletaListaItem__sabor">${paletas[3].sabor}</div>
    //             <div class="PaletaListaItem__preco">R$ ${paletas[3].preco},00</div>
    //             <div class="PaletaListaItem__descricao">${paletas[3].descricao}</div>
    //         </div>
    //         <img class="PaletaListaItem__foto" src=${paletas[3].foto} alt="Paleta de Doce de Leite" />
    //     </div>
    //     `
    //     ) 

    // *****Exibir a lista 
    // 1. com o FOR
    // for (let i = 0; i<paletas.length; i++){
    //     // console.log(i, paletas[i]['descricao'])

    //     // 2. Alteração que eu quero 
    //         // acrescentar um porçao de código que representa cada card de cada paleta 

    //         // pra inserir uma porção de código, podemos utilizar o insertAdjacentHTML, que recebe 2 argumentos
    //     paletaDivElement.insertAdjacentHTML("beforeend", 
    //     ` 
    //     <div class="PaletaListaItem">
    //         <div>
    //             <div class="PaletaListaItem__sabor">${paletas[i].sabor}</div>
    //             <div class="PaletaListaItem__preco">R$ ${paletas[i].preco},00</div>
    //             <div class="PaletaListaItem__descricao">${paletas[i].descricao}</div>
    //         </div>
    //         <img class="PaletaListaItem__foto" src=${paletas[i].foto} alt="Paleta de Doce de Leite" />
    //     </div>
    //     `
    //     ) 
    // }

    // 2. FOREACH => exemplo apostila // FOROF

    // 3. MAP
    paletas.map(function(batata) {
        return document.getElementById("paletaList").insertAdjacentHTML("beforeend", 
        `
        <div class="PaletaListaItem">
            <div>
                <div class="PaletaListaItem__sabor">${batata.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${batata.preco},00</div>
                <div class="PaletaListaItem__descricao">${batata.descricao}</div>
            </div>
            <img class="PaletaListaItem__foto" src=${batata.foto} alt="Paleta de ${batata.sabor}" />
        </div>
        `
        )
    })
}

findAllPaletas()

// Read One
async function findOnePaleta() {

    // 1. Selecionar o elemento html que eu quero modificar (seletores)
    const inputElement = document.querySelector("#idPaleta")
    console.log("inputElement", inputElement)

    const id = inputElement.value

    console.log("id", id)

    const response = await fetch(`${baseUrl}/find-paleta/${id}`) 
    
    const paleta = await response.json()
    console.log("paleta:", paleta)

    const divPaletaEscolhidaElement = document.getElementById("paletaEscolhida")

    console.log("divPaletaEscolhidaElement", divPaletaEscolhidaElement)

    divPaletaEscolhidaElement.innerHTML = 
        ` 
        <div class="PaletaListaItem">
            <div>
                <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
                <div class="PaletaListaItem__preco">R$ ${paleta.preco},00</div>
                <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            </div>
            <img class="PaletaListaItem__foto" src=${paleta.foto} alt="Paleta de Doce de Leite" />
        </div>
        `
}

// findOnePaleta()

// Create 
async function createPaleta() {

    paleta = {
        "sabor": "Teste",
        "descricao": "Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
        "foto": "./assets/images/doce-de-leite-com-doce-de-leite.png",
        "preco": "12" 
    }

    console.log(JSON.stringify(paleta))

    const response = await fetch(`${baseUrl}/create`, 
        {
            method: "post", // metodo HTTP 
            headers: {"Content-Type": "application/json"}, 
            mode: "cors", 
            body: JSON.stringify(paleta) // o que queremos cadatrar na API             
        }
    ) 
    
    const novaPaleta = await response.json() // verificar o retorno API
    console.log("novaPaleta:", novaPaleta)
}

createPaleta()
