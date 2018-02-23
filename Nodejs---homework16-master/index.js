var CalcNutriens = require('./CalcNutriens');

//arguments = [weight, gender, age]
var calcNutriens = new CalcNutriens(70, 'MAN', 33);

calcNutriens.countBasalMetabolism();

//arguments: low - low activity(passive activity), middle - moderate activity, high - high activity (your work is a constant movement)
calcNutriens.countDailyEnergyMetabolism('middle');

calcNutriens.countProportionNutrients();