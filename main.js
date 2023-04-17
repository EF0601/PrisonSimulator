let prison = {
     escapeRate: 20,
     riotRate: 10,
     day:1,
     escapes:0,
     riots:0,
     guards:5,
     prisoners:5,
     money:100000,
     happiness:20,
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
     locations.escapeRateDis.textContent = prison.escapeRate+"%";
     locations.riotRateDis.textContent = prison.riotRate+"%";
     locations.moneyUseDis.textContent = prison.income;
     locations.escapeDis.textContent = prison.escapes;
     locations.riotDis.textContent = prison.riots;
     locations.happyDis.textContent = prison.happiness+"%";
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
     if(prison.money <= 0){
          alert("GGs! Game over.")
          prison.money = 0;
     }
     updateVals()
     
}

function upgrade(item){
     switch(item){
          case 'wall':
               if(upLevels.wallLvl <= 20 && prison.money >= upPrice.wallPrice){
                    prison.escapeRate = Math.round(prison.escapeRate*0.8);
                    prison.money = Math.round(prison.money - upPrice.wallPrice);
                    upPrice.wallPrice = Math.round(upPrice.wallPrice * 1.1);
                    prison.income = prison.income - 10;
                    upLevels.wallLvl++;
               }
          break
          case 'luxury':
               if(upLevels.luxuryLvl <= 10 && prison.money >= upPrice.luxuryPrice){
                    prison.happiness = Math.round(prison.happiness * 1.05);
                    console.log(prison.riotRate*0.9)
                    prison.riotRate = Math.round(prison.riotRate * 0.9)
                    prison.money = Math.round(prison.money - upPrice.luxuryPrice);
                    upPrice.luxuryPrice = Math.round(upPrice.luxuryPrice * 1.05);
                    prison.income = prison.income - 100;
                    upLevels.luxuryLvl++;
               }
          break
          case 'guard':
               if(prison.money >= upPrice.guardPrice){
                    prison.escapeRate = prison.escapeRate * 0.9;
                    prison.money = Math.round(prison.money - upPrice.wallPrice);
                    upPrice.wallPrice = Math.round(upPrice.wallPrice * 1.1);
               }
          break
          default:
               console.warn("Item, " + item + " is not valid. Contact help on Github.")
     }
     // setTimeout(updateVals,1000)
     updateVals()
}

updateVals()