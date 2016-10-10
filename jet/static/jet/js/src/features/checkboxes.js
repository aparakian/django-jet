var $ = require('jquery');

var Checkboxes = function() { };

Checkboxes.prototype = {
    uniqueCheckboxIdCounter: 0,
    uniqueCheckboxIdPrefix: 'unique_checkbox_id_',
    _getCheckboxId: function($checkbox) {
        return $checkbox.attr('id')
            ? $checkbox.attr('id')
            : this.uniqueCheckboxIdPrefix + this.uniqueCheckboxIdCounter++;
    },
    addLabelToCheckbox: function($checkbox) {
        var checkboxId = this._getCheckboxId($checkbox);

        $checkbox.attr('id', checkboxId);
        $('<label>')
            .attr('for', checkboxId)
            .insertAfter($checkbox);
    },
    moveLabelAfterCheckbox: function($checkbox) {
        var checkboxId = this._getCheckboxId($checkbox);

        $checkbox.attr('id', checkboxId);
        $checkbox.prependTo($checkbox.parent().attr('for', checkboxId).parent());
    },
    addLabelToCheckboxes: function() {
        var self = this;

        $('input[type="checkbox"]').each(function() {
            var $checkbox = $(this);

            if ($checkbox.attr('id') != undefined && $('label[for="' + $checkbox.attr('id') + '"]').length != 0) {
                if ($checkbox.parent().prop("tagName") === "LABEL") {
                    self.moveLabelAfterCheckbox($checkbox);
                }
                return;
            }

            self.addLabelToCheckbox($checkbox);
        });
    },
    run: function() {
        try {
            this.addLabelToCheckboxes();
        } catch (e) {
            console.error(e, e.stack);
        }
    }
};

$(document).ready(function() {
    new Checkboxes().run();
});
