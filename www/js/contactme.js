var form = document.getElementById('contactform');
   form.addEventListener('submit',contact,false);
   function contact(e) {
      // Prevent Default Form Submission
      e.preventDefault();

      var target = e.target || e.srcElement;
      var i = 0;
      var message = '';

      // Loop Through All Input Fields
      for(i = 0; i < target.length; ++i) {
         // Check to make sure it's a value. Don't need to include Buttons
         if(target[i].type != 'text' && target[i].type != 'textarea') {
                // Skip to next input since this one doesn't match our rules
            continue;
         }

         // Add Input Name and value followed by a line break
         message += target[i].name + ': ' + target[i].value + "\r\n";
      }
      // Modify the hidden body input field that is required for the mailto: scheme
	  
		cordova.plugins.email.open
		({
			to:      'wormy@boun.cr',
			subject: '[Help]Autobet Simulator',
			body:    message
		});

   }