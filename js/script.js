$(document).ready(function() {
/* -- Background image dynamic resize script call -- */
	$("top").ezBgResize({
		img : "../images/planet-words-1.jpg"
	});
	
/* -- Contact form stuff -- */
	$("#submit").click(function() { 
       
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields       
        $("#contactform input[required=true], #contactform textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ //if this field is empty 
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag              
            }   
        });
       
        if(proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            post_data = {
                'form_name'     : $('input[name=form_name]').val(), 
                'email'    : $('input[name=form_email]').val(), 
                'msg_text'           : $('textarea[name=msg_text]').val(),
				'g-recaptcha-response'	: grecaptcha.getResponse()
            };
            
            //Ajax post data to server
            $.post('php_de_contact.php', post_data, function(response){  
                if(response.type == 'error'){ //load json data from server and output message     
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $("#contactform  input[required=true], #contactform textarea[required=true]").val(''); 
                    //$("#contactform #contact_body").slideUp(); //hide form after success
					Recaptcha.reload();
                }
                $("#responsemessage").hide().html(output).slideDown();
            }, 'json');
        }
    });
	
	//reset previously set border colors and hide all message on .keyup()
    $("#contactform  input[required=true], #contact_form textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#responsemessage").slideUp();
    });
	
});


/* -- Larger Initial Top Section -- */

function InitialResize(){
  var lengthr = document.documentElement.clientWidth,
  heightr = document.documentElement.clientHeight;
  
  var source = document.getElementById('top'); 
  source.style.height = heightr+'px'; // uses current height of page
  source.style.width = lengthr+'px'; // Uses current width of page
}

function addEvent(element, type, listener){
  if(element.addEventListener){
    element.addEventListener(type, listener, false);
  }else if(element.attachEvent){
    element.attachEvent("on"+type, listener);
  }
}


addEvent(window, "load", InitialResize);

addEvent(window, "resize", InitialResize);

