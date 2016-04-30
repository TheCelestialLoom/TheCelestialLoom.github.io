$(function() {
    $(".paypal-form table").hide();
    var formFieldArray = [
        {
    	    fields: ["#clientName", "#email", "#birthPlace"],
    	    dateFields: ["#birthMonth", "#birthDay", "#birthYear"],
    	    timeFields: ["#birthTime", "#birthTimeAm"]
        },
        {
    	    fields: ["#clientName2", "#birthPlace2"],
    	    dateFields: ["#birthMonth2", "#birthDay2", "#birthYear2"],
    	    timeFields: ["#birthTime2", "#birthTimeAm2"]
        }
    ];
	var paypalFormCompiler = formCompiler($("#order-form"), $("[name='os0']"), $(".birth-form-info"), formFieldArray);
	paypalFormCompiler.registerCheckoutClick($("#checkoutButton"));
});