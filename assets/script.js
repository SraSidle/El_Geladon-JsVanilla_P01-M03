const baseUrl =
  "https://el-geladon-backend-by-ip-production.up.railway.app/paletas";

async function findAllPaletas() {
  const response = await fetch(`${baseUrl}/find-paletas`);

  const paletas = await response.json();
  paletas.forEach((paleta) => {
    document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `<div class="PaletaListaItem">
        <div>
            <div class="PaletaListaItem_sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem_preco">R$ ${paleta.preco.toFixed(
              2
            )}</div>
            <div class="PaletaListaItem_descricao">${paleta.descricao}</div>
          </div>
            <img class="PaletaListaItem_foto" src=${
              paleta.foto
            } alt=${`Paleta de ${paleta.sabor}`} />
        </div>`
    );
  });
}

async function findPaletaById() {
  const id = document.getElementById("idPaleta").value;
  const response = await fetch(`${baseUrl}/find-paleta/${id}`);
  const paleta = await response.json();
  console.log(response)
  console.log(paleta)

  const paletaEscolhidaDiv = document.getElementById("paletaEscolhida");

  paletaEscolhidaDiv.innerHTML = `<div class="PaletaCardItem">
    <div>
      <div class="PaletaCardItem__sabor">${paleta.sabor}</div>
      <div class="PaletaCardItem__preco">R$ ${paleta.preco}</div>
      <div class="PaletaCardItem__descricao">${paleta.descricao}</div>
    </div>
      <img class="PaletaCardItem__foto" src=${
        paleta.foto
      } alt=${`Paleta de ${paleta.sabor}`} />
  </div>`;
};

findAllPaletas();
