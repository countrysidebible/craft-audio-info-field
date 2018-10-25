/**
 * Craft Audio Info Field plugin for Craft CMS
 *
 * AudioInfo Field JS
 *
 * @author    Andrew Hale
 * @copyright Copyright (c) 2018 Andrew Hale
 * @link      thisanimus.com
 * @package   CraftAudioInfoField
 * @since     1.0.0CraftAudioInfoFieldAudioInfo
 */

 ;(function ( $, window, document, undefined ) {

    var pluginName = "CraftAudioInfoFieldAudioInfo",
        defaults = {
        };

    // Plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function(id) {
            var _this = this;

            $(function () {

                var prefix = _this.options.prefix,
                    fieldTwuMediaCode = $('#fields-twuMediaCode-field').find('input'),
                    fieldFilesize = $('#fields-filesize-field').find('input'),
                    fieldDuration = $('#fields-duration-field').find('input');

                var programs = _this.options.s3 + 'programs/';

                var audioURL = programs + fieldTwuMediaCode.val() + '.mp3';

                function addAudio(audioURL) {
                    var audio = document.getElementById(prefix + 'audioFile');
                    console.log(audio);
                    audio.src = audioURL;
                    audio.load();

                    audio.onloadeddata = function() {
                        alert('loaded');
                        var date = new Date(null);
                        date.setSeconds(audio.duration);
                        var result = date.toISOString().substr(11, 8).replace(/^0+/, '').replace(/^:+/, '');
                        fieldDuration.val(result);
                    };
                }

                function filesize(size) {
                    fieldFilesize.val(size);
                }

                function xhr(url) {

                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.responseType = "blob";

                    function analyze_data(blob) {
                        var myReader = new FileReader();
                        myReader.readAsArrayBuffer(blob)

                        myReader.addEventListener("loadend", function(e) {
                            var buffer = e.srcElement.result;
                        });

                        if (blob.size > 0) {
                            filesize(blob.size);
                        } else {
                            alert('There is no audio file.');
                        }

                    }

                    xhr.onload = function() {
                        analyze_data(xhr.response);

                        if (xhr.status == 200) {
                            addAudio(xhr.responseURL);
                        } else {
                            alert('There is no audio file.');
                        }
                    }
                    xhr.send();
                }

                $("#" + prefix + "getAudioDetails").click(function(e) {
                    e.preventDefault();
                    xhr(audioURL);

                    alert(audioURL);
                });
                /* -- _this.options gives us access to the $jsonVars that our FieldType passed down to us */

            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
