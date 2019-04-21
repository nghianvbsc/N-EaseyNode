function get(url, data, success, error) {
    $.ajax({
        url: url,
        data: data,
        type: 'get',
        success: function (response) {
            success(response);
        },
        error: function (err) {
            if (error) error(err);
        }
    })
}

function objectifyForm(formArray) {//serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function post(url, data, success, error) {
    $.ajax({
        url: url,
        data: data,
        type: 'post',
        success: function (response) {
            success(response);
        },
        error: function (err) {
            if (error) error(err);
        }
    })

}

function displayAlert(text) {
    $('#fail-noti').fadeIn('slow', function () {
        $('#success-noti').addClass('hidden');
        $('#fail-noti').removeClass('hidden');
        $('.toast__message').text(text)
        setTimeout(() => {
            $('#fail-noti').addClass('hidden');
        }, 5000);
    });
}

function displaySuccess(text) {
    $('#success-noti').fadeIn('slow', function () {
        $('#success-noti').removeClass('hidden');
        $('.toast__message').text(text)

        setTimeout(() => {
            $('#success-noti').addClass('hidden');
        }, 5000)

    });
}


function ajaxFile(url, data, success, error) {
    $.ajax({
        url: url,
        data: data,
        type: 'post',
        processData: false,
        contentType: false,
        success: function (response) {
            success(response);
        },
        error: function (err) {
            error(err);
        }
    })
}

function numberFormat(number, fixLength = 0) {
    if (fixLength == null) {
        let stringNum = number + '';
        let arrInc = stringNum.split('.');
        let fixNum = 0;
        if (arrInc.length == 2) {
            fixNum = arrInc[1].length;
        }

        fixNum = fixNum > 3 ? 3 : fixNum;

        return (Number(number)).toLocaleString('en-US', {minimumFractionDigits: fixNum});
    } else {
        return (Number(number)).toLocaleString('en-US', {minimumFractionDigits: fixLength});
    }
}

$(document).ajaxStart(function () {
    showLoading();
});


$(document).ajaxComplete(function () {
    hideLoading();
});

$(document).ajaxStop(function () {
    hideLoading();
});

function showLoading() {
    if ($('#loading-full-screen').length > 0) {
        $('#loading-full-screen').show()
    } else if ($('#loading-full-screen').length > 0) {
        $('#loading-full-screen').show()
    }
}

function hideLoading() {
    if ($('#loading-full-screen').length > 0) {
        $('#loading-full-screen').hide()
    } else if ($('#loading-full-screen').length > 0) {
        $('#loading-full-screen').hide()
    }
}

function randomStringFixLengthOnlyAlphabet(count) {

    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

function copyToClipboard(elementId) {
    // Create a "hidden" input
    var aux = document.createElement("input");

    aux.setAttribute("value", $(elementId).val());
    // Append it to the body
    document.body.appendChild(aux);
    // Highlight its content
    aux.select();
    // Copy the highlighted text
    document.execCommand("copy");
    // Remove it from the body
    document.body.removeChild(aux);

}

function removeUtf8(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // str = str.replace(/\W+/g, ' ');
    str = str.replace(/\s/g, '-');
    str = str.replace(/[^a-zA-Z0-9]/g, '_');

    let max = 10;
    for (let index = max; index >= 0; index--) {
        let inc_ = "";
        for (let index2 = 0; index2 <= index; index2++) {
            inc_ += "_";
        }
        str = str.replace(inc_, '_');
    }
    return str;
};

$(function () {
    if ($('#currentTime').length > 0) {
        setInterval(() => {
            let day = new Date().getDay() + 1;
            if (day == 1) day = 'Chủ nhật'; else day = `Thứ ` + day;
            let time = moment(new Date().getTime()).format('DD/MM/YY, HH:mm:ss');
            $('#currentTime').text(day + ", " + time);
        }, 1000);
    }
})