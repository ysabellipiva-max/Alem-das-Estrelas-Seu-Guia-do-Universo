const fatos = [
    "Um dia em Vênus é mais longo do que um ano em Vênus.",
    "Existe uma nuvem gigante de álcool na constelação de Aquila com diâmetro 1000 vezes maior que o Sistema Solar.",
    "A luz do Sol leva cerca de 8 minutos e 20 segundos para chegar à Terra.",
    "Em Marte, os por do sol são de cor azulada por conta da poeira em sua atmosfera.",
    "Pegadas deixadas pelos astronautas na Lua podem durar milhões de anos, pois não há vento ou água para apagá-las."
];

const btnFact = document.getElementById('btn-fact');
const factDisplay = document.getElementById('fact-display');

btnFact.addEventListener('click', () => {
    const fatoAleatorio = fatos[Math.floor(Math.random() * fatos.length)];
    factDisplay.innerText = "✨ " + fatoAleatorio;
    factDisplay.style.display = "block";
});

function mostrarDetalhes(titulo, descricao) {
    alert(`🪐 ${titulo}\n\n${descricao}`);
}
