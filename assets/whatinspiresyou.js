var okuma = {
    reponsiveVideo: function() {
        fluidvids.init({});
    },
}

jQuery(document).ready(function($) {
    for (var func in okuma) {
        if (okuma[func] instanceof Function) {
            okuma[func]();
        }
    }
});