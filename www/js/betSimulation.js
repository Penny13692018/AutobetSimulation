/**
We have these variables get ready:
var basebet, maxbet, increaseRateAtLoss, betOdds, WinChance, betTimes, SimuRounds;
var stoploss =0, stop_profit=0;
**/

var i=0,j=0, thisBet, accuReturn;	
var betReturn = new Array();

//For statistics
var MaxLoss = new Array();
var TotalProfit = new Array();
var WinCount, maxLossTestCount,totalBetAmount;


function StartSimu()
{
	getAllSettings();
	var testmessage = "";
	testmessage += "basebet: "+basebet+"  ,maxbet:  "+maxbet+"\n";
	testmessage += "increaseRateAtLoss: "+increaseRateAtLoss+"\n";
	testmessage += "betOdds: "+betOdds+"  ,WinChance:  "+WinChance+"\n";
	testmessage += "stoploss: "+stoploss+"  ,stop_profit:  "+stop_profit+"\n";	
	testmessage += "betTimes: "+betTimes+"\n";
	testmessage += "SimuRounds: "+SimuRounds+"\n";	
	
	//alert(testmessage);
	WinCount = 0;	maxLossTestCount = 0;	totalBetAmount = 0;
	MaxLoss = []; TotalProfit = [];
	
	//Show Waiting Image	
	$("#TitlePic").hide();
	$("#WaitingLine").show();
	$("#WaitingFor").show();
	$("#resultBar").hide();
	$("#NoData").show();
	$("#StatTableHead").hide();
	$("#StatTable").hide();
	
	setTimeout(startRun,1000);
}

function startRun()
{
	for(j = 0; j < SimuRounds; j++)
	{	
		aRoundBet();
		TotalProfit[j] = accuReturn;
		if(TotalProfit[j]>0)	WinCount++;
		if(MaxLoss[j]<-10000)	maxLossTestCount++;
	}
	
	const arrMin = arr => Math.min(...arr);
	var maxMaxLoss = Math.round(arrMin(MaxLoss));
	document.getElementById("mxls").innerHTML = thousandComma(maxMaxLoss);
	
	const arrSum = arr => arr.reduce((a,b) => a + b, 0);
	var expectedPF = Math.round(arrSum(TotalProfit)/SimuRounds);
	document.getElementById("expectedPF").innerHTML =  thousandComma(expectedPF);
	
	var ProbOfWin = WinCount/SimuRounds;
	document.getElementById("probwin").innerHTML = ProbOfWin*100 + "%";
	
	var ProbLossTest = maxLossTestCount/SimuRounds;
	document.getElementById("losstest").innerHTML = ProbLossTest*100 + "%";
	
	document.getElementById("BetAmt").innerHTML = thousandComma(Math.round(totalBetAmount));
	
	//Debug Table
	//changeShow();
	
	$("#TitlePic").show();
	$("#WaitingLine").hide();
	$("#WaitingFor").hide();
	$("#resultBar").show();		
	$("#NoData").hide();
	$("#StatTableHead").show();	
	$("#StatTable").show();	
	self.location.href = '#result';
}

function aRoundBet()
{
	//Initiate variables
	thisBet = basebet;	MaxLoss[j] = 0;
	accuReturn = 0;	betReturn.splice(0,betReturn.length)
	
	for (i = 0; i < betTimes; i++) 
	{
		var win_lose = Math.random()*100;
		totalBetAmount += Number(thisBet);
		
		if(win_lose < WinChance)
		{
			betReturn[i] = thisBet*betOdds-thisBet;
			thisBet = basebet;
		}
		
		else
		{
			betReturn[i] = -thisBet;
			thisBet = thisBet*increaseRateAtLoss;
			if(thisBet>maxbet)	thisBet = basebet;
		}
		
		accuReturn +=Number(betReturn[i]);
		
		if(accuReturn>=stop_profit) break;
		else if(accuReturn<=-stoploss) break;
		
		if(accuReturn<0)
		{
			if(accuReturn<MaxLoss[j])
			{
				MaxLoss[j] = accuReturn;
			}
		}
		
		//for Debug
		if(Number(betReturn[i])<(thisBet*betOdds-thisBet) && Number(betReturn[i])>0)
		{alert("error Occurs! \n"+betReturn[i]); break;}
	}
			
	
}

function changeShow() {
  document.writeln("<table>");
  document.writeln("<tr><th>Number of Times<th>Max Loss<th>Total Profit");
  for (var i = 0; i < TotalProfit.length; i++) {
    aTimes = i+1;
    aMaxLoss = MaxLoss[i];
	aTProfit = TotalProfit[i];
    document.writeln("<tr><td>" + aTimes + "</td><td>" + aMaxLoss + "</td><td>"+ aTProfit + "</td>");
  }
  document.writeln("</table>");
}

function jump(h){
    var url = location.href;               //Save down the URL without hash.
    location.href = "#"+h;                 //Go to the target element.
    history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}