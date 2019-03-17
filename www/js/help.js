function showhide(numberOfQuestions) 
{	
	var i = 0;
	for(i=0;i<=1;i++) 
	{
		var div = document.getElementsByName("hideable")[i];
		var btn = document.getElementsByName("questions")[i];
		
		if(i==numberOfQuestions)
		{
			div.style.display = "block";
			btn.className = "button primary";
		}
	
		else
		{
			div.style.display = "none";
			btn.className = "button";
		}
			
	}
}
