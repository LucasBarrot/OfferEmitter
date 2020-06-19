capacity = 100;
poids = capacity * 20 + 2000;
vitesse = 100;

Energy = 0.5 * poids * ((vitesse * 1000) / 3600) ** 2;

console.log(poids);
console.log((vitesse * 1000) / 3600);
console.log(Energy);
