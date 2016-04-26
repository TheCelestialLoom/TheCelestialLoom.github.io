// Form Module
var formCompiler = function($sourceForm, $targetField) {
	var collectFieldValuesFromForm = function() {
	    var fieldValues = [];
		fieldValues.push($sourceForm.find("#clientName").val());
		fieldValues.push($sourceForm.find("#email").val());
		var birthDate = $sourceForm.find("#birthMonth").val()
		    + " "
		    + $sourceForm.find("#birthDay").val()
		    + ", "
		    + $sourceForm.find("#birthYear").val();
		var birthTime = $sourceForm.find("#birthTime").val()
		    + $sourceForm.find("#birthTimeAm").val();
		fieldValues.push(birthDate);
		fieldValues.push(birthTime);
		fieldValues.push($sourceForm.find("#birthPlace").val());
		return fieldValues;
	};
	
	var compileFields = function(fieldValues) {
		var targetValue = fieldValues.join('; ');
		$targetField.val(targetValue);
	};
	
	return {
		registerCompilation: function() {
			$sourceForm.find("input, select").each(function() {
				$(this).on("input change blur keyup keydown", function() {
					compileFields(collectFieldValuesFromForm());
				});
			});
		},
	};
	
};

// On jquery load
$(function() {
    $(".paypal-form table").hide();
	var paypalFormCompiler = formCompiler($("#order-form"), $("[name='os0']"));
	paypalFormCompiler.registerCompilation();
});