(function () {
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function () {
        // Execute the original method.
        var result = originalAddClassMethod.apply(this, arguments);

        // trigger a custom event
        jQuery(this).trigger('cssClassChanged');

        // return the original result
        return result;
    }
})();

$(function () { // DOM ready
    //$(window).resize(on_resize);
    //init_game();
    createTable(4, 4);
    createTableDragger(4, 4);
});

function createTable(rows, column) {
    var board = jQuery("<div>", {
        id: 'board',
        class: 'table board'
    });
    for (i = 0; i < rows; i++) {
        var row = jQuery("<div>", {
            class: 'row'
        });
        for (j = 0; j < column; j++) {
            var col = jQuery("<div>", {
                class: 'cell',
                text: 'A ' + i + '_' + j
            });
            var dragger = jQuery("<div>", {
                class: 'dragger'
            });
            //col.append(dragger);
            row.append(col);
        }
        board.append(row);
    }
    $('body').append(board);
}

function createTableDragger(rows, column) {
    var board = jQuery("<div>", {
        id: 'boardDragger',
        class: 'table board'
    });
    for (i = 0; i < rows; i++) {
        var row = jQuery("<div>", {
            class: 'row'
        });
        for (j = 0; j < column; j++) {
            var col = jQuery("<div>", {
                id: 'cell_' + i + '_' + j,
                class: 'cell'
            });
            var dragger = jQuery("<div>", {
                id: 'drag_' + i + '_' + j,
                class: 'dragger',
                text: 'B'
            });
            col.append(dragger);
            row.append(col);
        }
        board.append(row);
    }
    $('body').append(board);
    bindEvents();
}

function bindEvents() {
    $("#boardDragger").find('.dragger').bind('cssClassChanged', function () {
        //do stuff here
        console.log('on me ' + $(this).attr('id'));
    });

    $("#boardDragger").find(".dragger").draggable({
        revert: true,
        dragstart: function (event, ui) {
            console.log('drag start');
//            event.preventDefault(event);
            return true;
        }
    });

    $("#boardDragger").find('.dragger').droppable({
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            return false;
            $(this)
                    .addClass("ui-state-highlight")
                    .find("p")
                    .html("Dropped!");
        }
    });

    $('body').bind('touchstart', function (e) {
        console.log('Touch start');
    });

    $('body').bind('touchend', function (e) {
        console.log('Touch end');
    });
}


