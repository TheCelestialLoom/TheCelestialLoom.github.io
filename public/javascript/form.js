// Form Module
var formCompiler = function($sourceForm, $paypalField, $modalField) {
	var collectFieldValuesFromForm = function() {
	    var fields = ["#clientName", "#email", "#birthPlace"];
	    var dateFields = ["#birthMonth", "#birthDay", "#birthYear"];
	    var timeFields =  ["#birthTime", "#birthTimeAm"];
	    var mapFieldValues = function(fieldArray) {
    	    return fieldArray.map(function(field) {
    	        var $field = $sourceForm.find(field);
    	        return {
    	            $field: $field,
    	            value: $field.val()
    	        };
    	    });
	    };
	    return {
    	    fieldValues: mapFieldValues(fields),
    	    dateFieldValues: mapFieldValues(dateFields),
    	    timeFieldValues: mapFieldValues(timeFields)
	    };
	};
	
	var compileFields = function(fieldValueArray) {
	    var fieldValues = fieldValueArray.fieldValues.map(function(field) {
	        return field.value;
	    });
	    var dateValues = fieldValueArray.dateFieldValues.map(function(field) {
	       return field.value; 
	    });
	    var timeValues = fieldValueArray.timeFieldValues.map(function(field) {
	       return field.value; 
	    });
	    fieldValues.push(dateValues.join(' '));
	    fieldValues.push(timeValues.join(''));
	    
        return fieldValues;
	};
	
	var checkForFieldErrors = function(fieldValueArray) {
	   var errorsFlag = false;
	   var warning = "<div class='alert alert-danger'>required field</div>";
	   fieldValueArray.fieldValues.forEach(function(field) {
	      if (field.value == "" || field.value == null) {
	          if (field.$field.attr("data-optional") !== "true") {
	            field.$field.after(warning);
	            errorsFlag = true;
	          }
	      } 
	   }); 
	   for(var i = 0; i < fieldValueArray.timeFieldValues.length; i++) {
	       var field = fieldValueArray.timeFieldValues[i];
	       if (field.value == "" || field.value == null) {
	          if (field.$field.attr("data-optional") !== "true") {
	            field.$field.parent().after(warning);
	            errorsFlag = true;
	            break;
	          }
	      } 
	   }
   	   for(var i = 0; i < fieldValueArray.dateFieldValues.length; i++) {
	       var field = fieldValueArray.dateFieldValues[i];
	       if (field.value == "" || field.value == null) {
	          if (field.$field.attr("data-optional") !== "true") {
	            field.$field.parent().after(warning);
	            errorsFlag = true;
	            break;
	          }
	      } 
	   }
	   return errorsFlag;
	};
	
	var clearErrors = function() {
	    $(".alert.alert-danger").remove();
	};
	
	return {
		registerCheckoutClick: function($checkoutButton) {
		    $checkoutButton.click(function(element) {
		        element.preventDefault();
		        clearErrors();
		        var fieldValues = collectFieldValuesFromForm();
		        if (checkForFieldErrors(fieldValues)) {
		           return false;
		        }
		 
        		var targetValue = compileFields(fieldValues);
		        $paypalField.val(targetValue.join('; '));
		        $modalField.html(targetValue.join('<br />'));
		    });
		}
	};
	
};

// On jquery load
$(function() {
    $(".paypal-form table").hide();
	var paypalFormCompiler = formCompiler($("#order-form"), $("[name='os0']"), $(".birth-form-info"));
	paypalFormCompiler.registerCheckoutClick($("#checkoutButton"));
});