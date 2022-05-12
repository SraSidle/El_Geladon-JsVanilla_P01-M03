const baseURL = "http://localhost:3000/paletas";

async function findAllPaletas() {
  const response = await fetch(`${baseURL}/todas-paletas`);

  const paletas = await response.json();

  console.log(paletas);
}
