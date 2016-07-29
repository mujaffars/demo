$(function () {
    
    $(".elemLookAt").keyup(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            $(".btnLookAt").trigger('click');
        }
    });
    
    $(".btnLookAt").click(function () {
        $.ajax({
            url: 'http://api.onelook.com/words?v=ol_gte3&max=50&k=ol_clue&sp=*&ml=' + $('.elemLookAt').val(),
            type: 'GET',
            dataType: 'json',
            async: true,
            error: function () {
            },
            success: function (resp) {
                $('.apiWordsArea .secs').html('');
                $.each(resp, function (index, val) {
                    var theWord = val.word;
                    if (theWord.length === 3)
                        $('.apiWordsArea .threes').append('<div class="divParent"><div class="clsApiWord alert alert-warning">' + val.word + ' </div>' + theWord.length + '</div>');
                    else if (theWord.length === 4)
                        $('.apiWordsArea .fours').append('<div class="divParent"><div class="clsApiWord alert alert-info">' + val.word + ' </div>' + theWord.length + '</div>');
                    else if (theWord.length === 5)
                        $('.apiWordsArea .fives').append('<div class="divParent"><div class="clsApiWord alert alert-warning">' + val.word + ' </div>' + theWord.length + '</div>');
                    else if (theWord.length > 6 && theWord.length <= 20)
                        $('.apiWordsArea .other'+theWord.length).append('<div class="divParent"><div class="clsApiWord alert alert-success">' + val.word + ' </div>' + theWord.length + '</div>');
                    else if (theWord.length > 20)
                        $('.apiWordsArea .other_more').append('<div class="divParent"><div class="clsApiWord alert alert-block">' + val.word + ' </div>' + theWord.length + '</div>');
                })
                $('.apiWordsArea .clsApiWord').click(function(){
                    $(this).toggleClass('alert-selected');
                })
            }
        });
    });

    $(".btnPassOn").click(function () {
        $('.div-lookup').hide();
        $('.wordsSelected').html('');
        $('.clsApiWord').each(function(){
            if($(this).hasClass('alert-selected')){ alert(88)
                $('.wordsSelected').append($(this));
            }
        })
        createCustomTables(4, 4);
    });
});