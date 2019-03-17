var basebet, maxbet, increaseRateAtLoss, betOdds, WinChance, betTimes, SimuRounds;
var stoploss =0, stop_profit=0;


function getAllSettings()
{
	basebet = deleteComma(document.getElementById("basebet").value);
	maxbet = deleteComma(document.getElementById("maxbet").value);
	increaseRateAtLoss = deleteComma(document.getElementById("increaseRateAtLoss").value);
	
	betOdds = deleteComma(document.getElementById("betOdds").value);
	WinChance = deleteComma(document.getElementById("WinChance").value);
	
	stoploss = deleteComma(document.getElementById("stoploss").value);
	stop_profit = deleteComma(document.getElementById("stop_profit").value);	
	
	betTimes = deleteComma(document.getElementById("betTimes").value);
	SimuRounds = deleteComma(document.getElementById("SimuRounds").value);		
}


function AdjustForm()
{
	getAllSettings();
	
	document.getElementById("basebet").value = thousandComma(basebet);
	document.getElementById("maxbet").value = thousandComma(maxbet);
	document.getElementById("increaseRateAtLoss").value = thousandComma(increaseRateAtLoss);
	
	document.getElementById("betOdds").value = thousandComma(betOdds);
	document.getElementById("WinChance").value = thousandComma(WinChance);
	
	document.getElementById("stoploss").value = thousandComma(stoploss);
	document.getElementById("stop_profit").value = thousandComma(stop_profit);	
	
	document.getElementById("betTimes").value = thousandComma(betTimes);	
	document.getElementById("SimuRounds").value= thousandComma(SimuRounds);		
}

var thousandComma = function(number)
{
 var num = number.toString();
 var pattern = /(-?\d+)(\d{3})/;
  
 while(pattern.test(num))
 {
  num = num.replace(pattern, "$1,$2");
  
 }
 return num;
 
}

var deleteComma = function(number2)
{
	 number2 = number2.replace(/,/g, '');
	 return number2;
}