function CalcNutriens(weight, gender, age) {
  this.weight = weight;
  this.gender = gender.toLowerCase();
  this.age = age;
};

CalcNutriens.prototype.countBasalMetabolism = function() {
  if(this.gender == 'man' && (18 <= this.age && this.age <= 30)) {
    this.nutriens = Math.round((0.0630 * this.weight + 2.8957) * 240);
  }else if (this.gender == 'man' && (31 <= this.age && this.age <= 60)) {
    this.nutriens = Math.round((0.0491 * this.weight + 2.4587) * 240);
  }else if (this.gender == 'woman' && (18 <= this.age && this.age <= 30)) {
    this.nutriens = Math.round((0.0621 * this.weight + 2.0357) * 240);
  }else if (this.gender == 'woman' && (31 <= this.age && this.age <= 60)) {
    this.nutriens = Math.round((0.0342 * this.weight + 3.5377) * 240);
  }else if (this.gender == 'woman' && this.age > 60) {
    this.nutriens = Math.round((0.0377 * this.weight + 2.7545) * 240);
  }
  console.log('Basic metabolism (OO), that is, the number of calories that the body needs per day to maintain the minimum vital activity - breathing and palpitation (physical and mental stress is not taken into account here) = ' + this.nutriens + 'kilocalories');
  console.log('***********************************************************************');
  return this.nutriens;
};

CalcNutriens.prototype.countDailyEnergyMetabolism = function(yourActivity) {
  var activity = {
    'low' : 1.1,
    'middle': 1.3,
    'high' : 1.5
  };
  this.dailyEnergyMetabolism = Math.round(this.nutriens * activity[yourActivity]);
  console.log('Daily energy exchange - the amount of energy needed not only to lie in bed, but also to physical activity = ' + this.dailyEnergyMetabolism + 'kilocalories');
  console.log('***********************************************************************');
};

CalcNutriens.prototype.countProportionNutrients = function() {
  var proportion = Math.round(this.dailyEnergyMetabolism/6);
  console.log('Daily amount of proteins = ' + Math.round(proportion/4) + 'g');
  console.log('Daily amount of fats = ' + Math.round(proportion/9) + 'g');
  console.log('Daily amount of carbohydrates = ' + Math.round(proportion*4/4) + 'g');
};

module.exports = CalcNutriens;