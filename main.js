$(document).ready(function (data) {
    $.get("https://gist.githubusercontent.com/QuincyLarson/2ff6892f948d0b7118a99264fd9c1ce8/raw/e9e12f154d71cf77fc32e94e990749a7383ca2d6/Twitch%2520sample%2520API%2520responses%2520in%2520array%2520form", function (rawData) {
        data = jQuery.parseJSON(rawData);
    });

    $('#first-link').click(function () {
        $('#first-link').removeClass('active');
        $('#second-link').removeClass('active');
        $('#third-link').removeClass('active');
        $('#first-link').addClass('active');
        generateContent(data, 'online');
    });
    $('#second-link').click(function () {
        $('#first-link').removeClass('active');
        $('#second-link').removeClass('active');
        $('#third-link').removeClass('active');
        $('#second-link').addClass('active');
        generateContent(data, 'offline');
    });
    $('#third-link').click(function () {
        $('#first-link').removeClass('active');
        $('#second-link').removeClass('active');
        $('#third-link').removeClass('active');
        $('#third-link').addClass('active');
        generateContent(data, 'all');

        if ($('#first-link').hasClass('active')) {
            generateContent(data, 'online');
        } else if ($('#second-link').hasClass('active')) {
            generateContent(data, 'offline');
        } else {
            generateContent(data, 'all');
        }
    });
});


function generateContent(data, status) {
    var content = '<div class="list-group">';
    switch (status) {
        case 'online':
            for (var i = 0; i < data.length; i++) {
                if (data[i].stream != null) {
                    content += '<a href="' + data[i]._links.channel + '" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + data[i].stream.display_name + '</h5><small>' + 'Online' + '</small></div><p class="mb-1"><img src="' + data[i].stream.logo + '"/></p><small>' + data[i].stream.status + '</small></a>';
                }
            }
            content += '</div>'
            $('.main').html(content);
            break;
        case 'offline':
            for (var i = 0; i < data.length; i++) {
                if (data[i].stream == null && data[i].display_name != null) {
                    content += '<a href="' + data[i]._links.channel + '" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + data[i].display_name + '</h5><small>' + 'Offline' + '</small></div><p class="mb-1">' + '' + '</p><small>' + '' + '</small></a>';
                }
            }
            content += '</div>'
            $('.main').html(content);
            break;
        case 'all':
            for (var i = 0; i < data.length; i++) {
                if (data[i].stream != null) {
                    content += '<a href="' + data[i]._links.channel + '" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + data[i].stream.display_name + '</h5><small>' + 'Online' + '</small></div><p class="mb-1"><img src="' + data[i].stream.logo + '"/></p><small>' + data[i].stream.status + '</small></a>';
                } else if (data[i].stream == null && data[i].display_name != null) {
                    content += '<a href="' + data[i]._links.channel + '" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + data[i].display_name + '</h5><small>' + 'Offline' + '</small></div><p class="mb-1">' + '' + '</p><small>' + '' + '</small></a>';
                }
            }
            content += '</div>'
            $('.main').html(content);
            break;
        default:
            for (var i = 0; i < data.length; i++) {
                if (data[i].stream != null) {
                    content += '<a href="' + data[i].stream.url + '" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + data[i].stream.display_name + '</h5><small>' + data[i].stream.followers + '</small></div><p class="mb-1"><img src="' + data[i].stream.logo + '"/></p><small>' + data[i].stream.status + '</small></a>';
                }
            }
            content += '</div>'
            $('.main').html(content);
            break;
    }
}