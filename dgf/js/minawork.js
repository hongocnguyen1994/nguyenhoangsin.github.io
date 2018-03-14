var _token = $('meta[name="csrf-token"]').attr('content');

$('.baseProduct').show();

function nl2br (str) {   
    var breakTag = '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

function ucwords(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// Uppercase every first letter of a word
jQuery.fn.setUcwords = function() {
    return this.each(function(){
        var val = $(this).text(), newVal = '';
        newVal = ucwords(val);
        $(this).text(newVal);
    });
}

function truncateString(str, num = 120) {
    if (num > str.length){
        return str;
    } else{
        str = str.substring(0,num);
        return str+"...";
    }
}

/*View PDF File*/
$('.showPdf').on('click',function(){
    var pdf_link = $(this).attr('attr-href');
    var iframe = '<div class="iframe-container" style="min-height: 400px;"><iframe class="embed-container allowfullscreen webkitallowfullscreen" src="'+pdf_link+'"></iframe></div>'
    $('#pdf .modal-body').html(iframe);
    $('#pdf .modal-footer .download').attr('href', pdf_link);
    $('.jsPDF').trigger('click');
    return false;        
}); 
