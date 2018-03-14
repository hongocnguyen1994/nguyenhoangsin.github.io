function viewSearchResultList() {
	var subResult = document.getElementsByClassName('sponsored-by-box-search-result');
	subResult[0].style.display = 'block';
}

function viewSearchResultGrid() {
	var subResult = document.getElementsByClassName('sponsored-by-box-search-result');
	subResult[0].style.display = 'none';
}

function unDisabled() {
	var checkRadio = document.getElementById('input-radio-check');
	var checkTextarea = document.getElementById('input-textarea-check');
	if (checkRadio.checked == false) {
		checkTextarea.disabled = true;
	} else {
		checkTextarea.disabled = false;
	}
}

//  appy for modal - Wholesales - minisite-owner-review-waiting.html
var checkSingleRangeWholesales = true;
function singleRangeWholesales() {
	var objectArr = document.getElementsByClassName('single-range-wholesales');
	var lenObjectArr = objectArr.length;
    for (var i = 0; i < lenObjectArr; i++) {
		var inputs = [objectArr[i].nextElementSibling];
		var valueOuput = function(inputs) {
			return function (values, handle, positions) {
		        inputs[handle].value = positions[handle].toFixed(1);
		    }
		}
		if (checkSingleRangeWholesales) {
			noUiSlider.create(objectArr[i], {
		        start: 10,
		        connect: true,
		        range: {
		            'min': 0,
		            'max': 10
		        }
		    });
		    objectArr[i].noUiSlider.on('update', valueOuput(inputs));
		}
		if (i == lenObjectArr - 1) checkSingleRangeWholesales = false;
    }
}