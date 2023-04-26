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
     taxProb: 7,
     capacity: 20,
};

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
     alerts: document.querySelector('.alerts'),
     alert: document.querySelector('.alert'),
};

let upPrice = {
     wallPrice: 50000,
     luxuryPrice: 2000,
     guardPrice: 1000,
     taxPrice: 2500,
     maxPrisonerPrice: 5000,

     wallPriceDis: document.querySelector('.wallPrice'),
     luxuryPriceDis: document.querySelector('.luxuryPrice'),
     guardPriceDis: document.querySelector('.guardPrice'),
     taxPriceDis: document.querySelector('.taxPrice'),
     maxPrisonerPriceDis: document.querySelector('.maxPrisonerPrice'),
};

let upLevels = {
     wallLvl: 1,
     luxuryLvl: 1,
     guardLvl: 5,
     taxLVL: 1,
     maxPrisonerLVL: 1,

     wallLvlDis: document.querySelector('.wallLVL'),
     luxuryLvlDis: document.querySelector('.luxuryLVL'),
     guardLvlDis: document.querySelector('.guardLVL'),
     taxLvlDis: document.querySelector('.taxLVL'),
     maxLvlDis: document.querySelector('.maxPrisonerLVL'),
};

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
     upPrice.taxPriceDis.textContent = upPrice.taxPrice;
     upPrice.maxPrisonerPriceDis.textContent = upPrice.maxPrisonerPrice;

     upLevels.wallLvlDis.textContent = upLevels.wallLvl;
     upLevels.luxuryLvlDis.textContent = upLevels.luxuryLvl;
     upLevels.guardLvlDis.textContent = upLevels.guardLvl;
     upLevels.taxLvlDis.textContent = upLevels.taxLVL;
     upLevels.maxLvlDis.textContent = upLevels.maxPrisonerLVL;

     document.querySelector('.load').textContent = prison.prisonerLoad;
     document.querySelector('.shakedownCost').textContent = prison.prisoners * 6000;

     document.querySelector('.escape').textContent = prison.escapes;
     document.querySelector('.riot').textContent = prison.riots;
}

function day(){
     prison.day++;
     prison.money = Number(prison.money + prison.income);
     prison.prisoners = prison.prisoners + prison.prisonerLoad;
     prison.prisonerLoad = 0;
     prison.money = rounder(prison.money, 1);
     roll();
     tax();
     if(prison.money < 0){
          locations.alert.textContent = `Uh oh, you went bankrupt! You have ${prison.day} days lived.`;
          prison.money = 0;
          (document.querySelector('.days')).style.display = "none";
          (document.querySelector('.days2')).style.display = "none";
          (document.querySelector('.days3')).style.display = "none";
     }
     if(prison.income >= 5000){
          prison.taxProb = 9;
     }
     if(prison.money <= 1000){
          locations.alerts.textContent = "Alert! You are running low on funds! You should attempt to raise income!";
     }
     updateVals();
     if(prison.prisoners == 0){
          prison.income = prison.income - rounder((prison.capacity * Math.random()), 1);
          locations.alerts.textContent = "Warning: Your income is draining! This is because you have no prisoners left. Try getting some more prisoners!";
     }

}

function tax(){
     if((Math.floor(Math.random() * 10) + 1) < prison.taxProb){
          if(prison.money >= 10000 && prison.money < 1000000){
               prison.money = prison.money * 0.5;
               locations.alerts.textContent = "TAXED! The government taxed you 50% of your money. Visit the upgrading section for the accountant upgrade to reduce your taxes.";
          }
          if(prison.money >= 1000000){
               prison.money = prison.money * 0.1;
               locations.alerts.textContent = "TAXED! The government taxed you 90% of your money. Visit the upgrading section for the accountant upgrade to reduce your taxes.";
          }
          else{
               prison.money = prison.money * 0.75;
               locations.alerts.textContent = "TAXED! The government taxed you 25% of your money. Visit the upgrading section for the accountant upgrade to reduce your tax visits.";
          }

     }
     updateVals();

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
          break;
          case 'luxury':
               if(upLevels.luxuryLvl <= 10 && prison.money >= upPrice.luxuryPrice){
                    prison.happiness = rounder(prison.happiness * 1.05, 1000);
                    prison.riotRate = rounder(prison.riotRate * 0.98, 100);
                    prison.money = rounder(prison.money - upPrice.luxuryPrice, 1);
                    upPrice.luxuryPrice = rounder(upPrice.luxuryPrice * 1.05, 1);
                    prison.income = prison.income - 100;
                    upLevels.luxuryLvl++;
               }
          break;
          case 'guard':
               if(prison.money >= upPrice.guardPrice){
                    prison.escapeRate = rounder(prison.escapeRate * 0.98, 1000);
                    prison.money = rounder(prison.money - upPrice.guardPrice, 1);
                    upLevels.guardLvl++;
                    prison.income = prison.income - 150;
                    prison.guards++;
               }
          break;
          case 'tax':
               if(prison.money >= upPrice.taxPrice && upLevels.taxLVL <= 6){
                    prison.taxProb--;
                    prison.money = rounder(prison.money - upPrice.taxPrice, 1);
                    upPrice.taxPrice = rounder(upPrice.taxPrice * 1.25, 1);
                    upLevels.taxLVL++;
                    prison.income = prison.income - 50;
               }
               break;
          case 'max':
               if(prison.money >= upPrice.maxPrisonerPrice && upLevels.maxPrisonerLVL <= 5){
                    prison.capacity = prison.capacity + 5;
                    prison.money = rounder(prison.money - upPrice.maxPrisonerPrice, 1);
                    upPrice.maxPrisonerPrice = rounder(upPrice.maxPrisonerPrice * 1.5, 1);
                    upLevels.maxPrisonerLVL++;
                    prison.income = prison.income - 500;
               }
               break;
          default:
               console.warn("Item, " + item + " is not valid. Contact help on Github.");
     }
     // setTimeout(updateVals,1000)
     updateVals();
}

function rounder(number, place){
     return (Math.round(number * place)/place);
}

function addPrisoner(amount){
     if((prison.prisonerLoad + amount) <= prison.capacity){
          prison.prisonerLoad = prison.prisonerLoad + amount;
     for(x=1; x<=prison.prisonerLoad; x++){
          prison.money = prison.money + 10000;
          prison.income = prison.income + 110;
          if(prison.prisoners + prison.prisonerLoad > prison.guards){
               prison.escapeRate = rounder(prison.escapeRate + 1.02, 1000);
               prison.riotRate = rounder(prison.riotRate*1.01, 1000);
          }
     }
     }
     updateVals();
}

function shakedown(){
     if((prison.prisoners * 6000) <= prison.money){
          prison.escapeRate = rounder(prison.escapeRate * 0.75, 1000);
          prison.riotRate = rounder(prison.riotRate * 0.75, 1000);
          prison.money = prison.money - prison.prisoners * 6000;
     }
     updateVals();
}

updateVals();
let message = "";
function roll(){

     if(prison.prisoners > 0){
          if(((Math.floor(Math.random() * 10000) + 1)/100) <= prison.escapeRate){
               if(prison.escapeRate >= 75 && prison.prisoners >= 5 && prison.escapeRate < 100){
                    prison.escapes = prison.escapes + 5;
                    prison.money = prison.money - 37500;
                    prison.prisoners = prison.prisoners - 5;
                    message = message + "There's five escapes today! ";
               }
               if(prison.escapeRate >= 100 && prison.prisoners >= 10){
                    prison.escapes = prison.escapes + 10;
                    prison.money = prison.money - 75000;
                    prison.prisoners = prison.prisoners - 10;
                    message = message + "There's 10 escapes today! ";
               }
               else{
                    prison.escapes++;
                    prison.money = prison.money - 7500;
                    prison.prisoners--;
                    message = message + "There's one escape today! ";
               }
          }
          if(((Math.floor(Math.random() * 10000) + 1)/100) <= prison.riotRate){
               if(prison.riotRate >= 50){
                    prison.riots = prison.riots + 5;
                    prison.money = prison.money - 50000;
                    message = message + "There's five riots today! ";
               }
               else{
                    prison.riots++;
                    prison.money = prison.money - 10000;
                    message = message + "There's one riot today!";
               }
          }
          if(Math.floor(Math.random() * 100) <= 50){
               if(prison.happiness >= 40 && prison.happiness <= 70){
                    prison.prisoners--;
                    rounder(prison.escapeRate = prison.escapeRate * 0.98, 10);
                    rounder(prison.riotRate = prison.riotRate * 0.99, 10);
                    prison.money = prison.money + 25000;
                    message = message + "There's a release! $25000 added";
               }
               if(prison.happiness >= 70){
                    prison.prisoners = prison.prisoners - 2;
                    rounder(prison.escapeRate = prison.escapeRate * 0.96, 10);
                    rounder(prison.riotRate = prison.riotRate * 0.98, 10);
                    prison.money = prison.money + 50000;
                    message = message + "There's a release! $50000 added";
               }
          }
     }
     locations.alerts.textContent = message;
     message = "";
}
