module.exports = {
  calculaCustoIdeal: (custoMinimo, custoMaximo) => {
    const bcrypt = require('bcrypt');    
    for (let custo = custoMinimo; custo < custoMaximo; custo++) {
      const tempoInicial  = Date.now();
      bcrypt.hash('A', custo).then(
        () => console.log(`custo: ${custo}; tempo: ${ Date.now() - tempoInicial} ms`)
      );
    } 
  }
};




