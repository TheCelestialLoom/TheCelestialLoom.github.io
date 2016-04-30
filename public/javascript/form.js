// Form Module
var formCompiler = function($sourceForm, $paypalField, $modalField, formFieldArray) {
	
	var collectFieldValuesFromForm = function(fieldArrays) {
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
    	    fieldValues: mapFieldValues(fieldArrays.fields),
    	    dateFieldValues: mapFieldValues(fieldArrays.dateFields),
    	    timeFieldValues: mapFieldValues(fieldArrays.timeFields)
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
	
	var checkForFieldErrors = function(fieldValueArray, $submitButton) {
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
		        
		      	var formWarning = "<div class='alert alert-danger'>some required fields are missing</div>";
		        var fieldErrors = false;
		        var targetValueArray = [];
		        formFieldArray.forEach(function(formFields) {
		        	var fieldValues = collectFieldValuesFromForm(formFields);
			        if (checkForFieldErrors(fieldValues, $(element.target))) {
			           fieldErrors = true;
			        }
	        		targetValueArray.push(compileFields(fieldValues));
		        });
		        if (fieldErrors) {
	       			$checkoutButton.after(formWarning);
		        	return false;
		        }
		        var paypalFieldValues = targetValueArray.map(function(item) {
		        	return item.join('; ');
		        });
		        var modalFieldValues = targetValueArray.map(function(item) {
		        	return item.join('<br />');
		        });
		        $paypalField.val(paypalFieldValues.join(' / '));
		        $modalField.html(modalFieldValues.join('<hr />'));
		    });
		}
	};
	
};
