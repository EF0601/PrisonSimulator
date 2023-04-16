let prison = {
     escapeRate: 0.2,
     riotRate: 0.1,
     day:1,
     escapes:0,
     riots:0,
     guards:5,
     prisoners:5,
     money:100000,
     happiness:0.2,
     income: -100,
}

let locations = {
     escapeRateDis: document.querySelector('.escapeRate'),
     riotRateDis: document.querySelector('.riotRate'),
     moneyUseDis: document.querySelector('.moneyUsage'),
     escapeDis: document.querySelector('.escapes'),
     riotDis: document.querySelector('.riots'),
     happyDis: document.querySelector('.happiness'),
     guardDis: document.querySelector('.guards'),
     prisonerDis: document.querySelector('.prisoners'),
     moneyDis: document.querySelector('.money'),
     dayDis: document.querySelector('.day'),
}

let upPrice = {
     wallPrice: 50000,
     luxuryPrice: 2000,
     guardPrice: 1000,

     wallPriceDis: document.querySelector('.wallPrice'),
     luxuryPriceDis: document.querySelector('.luxuryPrice'),
     guardPriceDis: document.querySelector('.guardPrice'),
}

let upLevels = {
     wallLvl: 1,
     luxuryLvl: 1,
     guardLvl: 5,

     wallLvlDis: document.querySelector('.wallLVL'),
     luxuryLvlDis: document.querySelector('.luxuryLVL'),
     guardLvlDis: document.querySelector('.guardLVL'),
}

function updateVals(){
     locations.escapeRateDis.textContent = prison.escapeRate * 100 + "%";
     locations.riotRateDis.textContent = prison.riotRate * 100 + "%";
     locations.moneyUseDis.textContent = prison.income;
     locations.escapeDis.textContent = prison.escapes;
     locations.riotDis.textContent = prison.riots;
     locations.happyDis.textContent = prison.happiness;
     locations.guardDis.textContent = prison.guards;
     locations.prisonerDis.textContent = prison.prisoners;
     locations.moneyDis.textContent = prison.money;
     locations.dayDis.textContent = prison.day;

     upPrice.wallPriceDis.textContent = upPrice.wallPrice;
     upPrice.luxuryPriceDis.textContent = upPrice.luxuryPrice;

     upLevels.wallLvlDis.textContent = upLevels.wallLvl;
     upLevels.luxuryLvlDis.textContent = upLevels.luxuryLvl;
     upLevels.guardLvlDis.textContent = upLevels.guardLvl;
}

function day(){
     prison.day++;
     prison.money = Number(prison.money + prison.income);
     updateVals()
}

function upgrade(item){
     switch(item){
          case 'wall':
               if(upLevels.wallLvl <= 20 && prison.money >= upPrice.wallPrice){
                    prison.escapeRate = Math.round(prison.escapeRate * 0.9);
                    prison.money = Math.round(prison.money - upPrice.wallPrice);
                    upPrice.wallPrice = Math.round(upPrice.wallPrice * 1.1);
                    upLevels.wallLvl++;
                    console.log("purchased")
               }
          
               case 'luxury':
               if(upLevels.wallLvl <= 20 && prison.money >= upPrice.wallPrice){
                    prison.escapeRate = prison.escapeRate * 0.9;
                    prison.money = prison.money - upPrice.wallPrice;
                    upPrice.wallPrice = upPrice.wallPrice * 1.1;
               }
          
               case 'guard':
               if(prison.money >= upPrice.guardPrice){
                    prison.escapeRate = prison.escapeRate * 0.9;
                    prison.money = prison.money - upPrice.wallPrice;
                    upPrice.wallPrice = upPrice.wallPrice * 1.1;
               }
          
          default:
               console.warn("Item, " + item + " is not valid. Contact help on Github.")
     }
     setTimeout(updateVals,1000)
}

updateVals()