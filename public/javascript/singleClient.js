$(function() {
    $(".paypal-form table").hide();
    var formFieldArray = [
        {
    	    fields: ["#clientName", "#email", "#birthPlace"],
    	    dateFields: ["#birthMonth", "#birthDay", "#birthYear"],
    	    timeFields: ["#birthTime", "#birthTimeAm"]
        }
    ];
	var paypalFormCompiler = formCompiler($("#order-form"), $("[name='os0']"), $(".birth-form-info"), formFieldArray);
	paypalFormCompiler.registerCheckoutClick($("#checkoutButton"));
});
