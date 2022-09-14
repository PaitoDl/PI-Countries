//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country } = require('./src/db.js');
const axios = require('axios');

// Inyectar los datos de la API en mi BD

const createDB = async () => {
  await axios.get(`https://restcountries.com/v3.1/all`)
    .then(resultado => {
        // console.log(typeof resultado);
        // El resultado se lee con .data
        resultado.data.forEach( country => {
        // console.log(country);
        // Se hace Destructuring de los datos necesarios
        const { name: { common }, translations: {spa}, flags: {svg}, cca3, continents, capital, subregion, area, population} = country;
        let countryActual = {
          name: common,
          nameSpanish: spa.common ? spa.common : common,
          flag: svg ? svg : "No tiene bandera",
          code: cca3,
          continent: continents[0],
          capital: capital ? capital[0] : "No tiene capital",
          subregion: subregion ? subregion : "No tiene una sub region",
          area: area ? area : 0,
          population: parseInt(population),
        }
        // console.log(countryActual); Logea el Pais actual.
        // console.log(countryActual.flag ? "Si hay bandera" : "No hay bandera");
        Country.findOrCreate({where: countryActual});
      }
    )
  });
};

// Se ejecuta createDB() que extrae los datos de la API y los agrega a mi BD
createDB();

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('Servidor levantado en 3001'); // eslint-disable-line no-console
  });
});

/*
Version con try/catch:

const getCountries = async () => {
  try {
    const response = await fetch(API_ALL);
    const allCountries = await response.json();

    const countriesToDB = allCountries.map(countries => {
      return {
        ID: countries.cca3,
        name: countries.name.common,
        img_url: countries.flags[0],
        continent: countries.region,
        capital: countries.capital !== undefined ? countries.capital[0] : "No Capital",
        sub_region: countries.subregion !== undefined ? countries.subregion : "No subregion",
        area: Math.round(countries.area),
        population: countries.population,
      };
    })

    countriesToDB.map(countries => {
      Country.findOrCreate({
        where: {
          ID: countries.ID,
          name: countries.name,
          img_url: countries.img_url,
          continent: countries.continent,
          capital: countries.capital,
          sub_region: countries.sub_region,
          area: countries.area,
          population: countries.population
        }
      }) 
      
      .then(([country, created]) => {
        console.log(country.toJSON())
        console.log(created)
      })
    });
  }
catch(error){
  next(error)
}};
*/