let prison = {
     escapeRate: 20,
     riotRate: 10,
     day:1,
     escapes:0,
     riots:0,
     guards:5,
     prisoners:5,
     money:5000,
     happiness:20,
     income: -100,
     prisonerLoad: 0,
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

const model2 = document.getElementById("myModal2");
const span2 = document.getElementsByClassName("close2")[0];

span2.onclick = function() {
  model2.style.display = "none";
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

     document.querySelector('.load').textContent = prison.prisonerLoad;
     document.querySelector('.shakedownCost').textContent = prison.prisoners * 3000;

     document.querySelector('.escape').textContent = prison.escapes;
     document.querySelector('.riot').textContent = prison.riots;
}

function day(){
     prison.day++;
     prison.money = Number(prison.money + prison.income);
     prison.prisoners = prison.prisoners + prison.prisonerLoad;
     prison.prisonerLoad = 0;
     if(prison.money <= 0){
          model2.style.display = "block";
          prison.money = 0;
     }
     updateVals()
     
}

function upgrade(item){
     switch(item){
          case 'wall':
               if(upLevels.wallLvl <= 20 && prison.money >= upPrice.wallPrice){
                    prison.escapeRate = rounder(prison.escapeRate*0.9, 1000);
                    prison.money = rounder(prison.money - upPrice.wallPrice, 1000);
                    upPrice.wallPrice = rounder(upPrice.wallPrice * 1.05, 1);
                    prison.income = prison.income - 10;
                    upLevels.wallLvl++;
               }
          break
          case 'luxury':
               if(upLevels.luxuryLvl <= 10 && prison.money >= upPrice.luxuryPrice){
                    prison.happiness = rounder(prison.happiness * 1.05, 1000);
                    prison.riotRate = rounder(prison.riotRate * 0.98, 100)
                    prison.money = rounder(prison.money - upPrice.luxuryPrice, 1);
                    upPrice.luxuryPrice = rounder(upPrice.luxuryPrice * 1.05, 1);
                    prison.income = prison.income - 100;
                    upLevels.luxuryLvl++;
               }
          break
          case 'guard':
               if(prison.money >= upPrice.guardPrice){
                    prison.escapeRate = rounder(prison.escapeRate * 0.98, 1000);
                    prison.money = rounder(prison.money - upPrice.guardPrice, 1);
                    upLevels.guardLvl++;
                    prison.income = prison.income - 50;
                    prison.guards++;
               }
          break
          default:
               console.warn("Item, " + item + " is not valid. Contact help on Github.")
     }
     // setTimeout(updateVals,1000)
     updateVals()
}

function rounder(number, place){
     return (Math.round(number * place)/place);
}

function addPrisoner(amount){
     prison.prisonerLoad = prison.prisonerLoad + amount;
     for(x=1; x<=prison.prisonerLoad; x++){
          prison.money = prison.money + 10000;
          prison.income = prison.income + 1000;
          if(prison.prisoners + prison.prisonerLoad > prison.guards){
               prison.escapeRate = rounder(prison.escapeRate + 1.02, 1000);
               prison.riotRate = rounder(prison.riotRate*1.01, 1000)
          }
     }
     updateVals()
}

function shakedown(){
     if((prison.prisoners * 3000) <= prison.money){
          prison.escapeRate = rounder(prison.escapeRate * 0.75, 1000);
          prison.riotRate = rounder(prison.riotRate * 0.75, 1000);
          prison.money = prison.money - prison.prisoners * 300;
     }
     updateVals()
}

updateVals()