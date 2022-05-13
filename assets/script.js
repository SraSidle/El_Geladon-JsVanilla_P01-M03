const baseUrl = "https://el-geladon-backend-by-ip-production.up.railway.app/paletas";

async function findAllPaletas() {
  const response = await fetch(`${baseUrl}/find-paletas`);

  const paletas = await response.json();
  paletas.forEach((paleta) => {
    document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `<div class="PaletaListaItem">
        <div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$ ${paleta.preco.toFixed(
              2
            )}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
          </div>
            <img class="PaletaListaItem__foto" src=${
              paleta.foto
            } alt=${`Paleta de ${paleta.sabor}`} />
        </div>`
    );
  });
};

findAllPaletas();

