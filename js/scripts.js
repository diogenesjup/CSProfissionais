           new WOW().init();

            // FORMULÁRIO DE PESQUISA  APENAS COM JAVASCRIPT          
            //
            
            $('#btnPesquisar').click(function(){  
             
                var tipoProfPesquisa = $('tipoProfissionalPesquisa').val();
                var cepPesquisa = $('cepPesquisa').val();
                
                $('.sub-header').hide();
                $('.work').html('<p class="text-center"><img src="images/loading.gif" style="margin-top:100px;"/></p>');

                 $.get("json/listaProfissionais.php",  function(html){ $(".work").html(html);}); 


               initialize();
                
                
            });             
       


             //  CARREGAR ITENS PARA AUTOCOMPLETE APENAS COM JAVASCRIPT
             // 
             /*
             var itensAutoComplete = Array;
             var itensAutoCompleteId = Array;

             var autoComplete = $.getJSON("http://api.mdanave.com.br/api/especializacao/listar", function(result){

                    $.each(result, function(i, key){
                        var totEspecs = key.List.length;

                        for (var u = 0; u < totEspecs; u++) { 
                           
                            itensAutoComplete[u] = key.List[u].Nome;
                            //itensAutoCompleteId[u] = key.List[u].GrupoEspecializacaoId;
                        }


                    });

                });
              */
           

             // CARREGAR BANNERS DE ANUNCIOS
             //
             var bannersAnuncios = $.getJSON("http://api.mdanave.com.br/api/MediaBox/Listar", function(result){

                    $.each(result, function(i, key){
                        var totBanners = key.List.length;

                        for (var v = 1; v < totBanners; v++) { 
                           
                            $('#areaBannerAnuncio'+v).html('<a href="#"><img src="http://www.csprofissionais.com.br/upload/'+key.List[v].Arquivo+'" /></a>')
                        }

                    });

                });



            // ATUALIZAR PERFIL DO CLIENTE

            var ajaxSubmit = function(form) {
                // fetch where we want to submit the form to
                var url = $(form).attr('action');
                var flag = 9;
                // fetch the data for the form
                var data = $(form).serializeArray();

                // setup the ajax request
                $.ajax({
                    url: url,
                    data: data,
                    dataType: 'json',
                    type:'POST'
                });
              //$('#sucesso').html('<div class="alert alert-success"><b>Mensagem enviada com <b>sucesso</b>!</div>');
                swal("Muito bem!", 'Suas informações foram atualizadas com sucesso', "success");
                           //$("#formE").fadeOut(0);
                // return false so the form does not actually
                // submit to the page
                return false;
            }



            // CONFIRMAÇÃO DE SOLICITAÇÃO DE CONTATO
            function solicContato(){
               $.get("json/solicContato.php");
               swal("Muito bem!", 'Sua solicitação de contato foi feita. Em breve o usuário entrara em contato', "success");

            }








            // AVALIAÇÂO DOS USUÁRIO
            (function(e){var t,o={className:"autosizejs",append:"",callback:!1,resizeDelay:10},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o;"getComputedStyle"in window?(t=window.getComputedStyle(u,null),o=u.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){o-=parseInt(t[i],10)}),s.style.width=o+"px"):s.style.width=Math.max(p.width(),0)+"px"}function a(){var a={};if(t=u,s.className=i.className,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",f&&i.callback.call(u,u))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}})(window.jQuery||window.$);

              var __slice=[].slice;(function(e,t){var n;n=function(){function t(t,n){var r,i,s,o=this;this.options=e.extend({},this.defaults,n);this.$el=t;s=this.defaults;for(r in s){i=s[r];if(this.$el.data(r)!=null){this.options[r]=this.$el.data(r)}}this.createStars();this.syncRating();this.$el.on("mouseover.starrr","span",function(e){return o.syncRating(o.$el.find("span").index(e.currentTarget)+1)});this.$el.on("mouseout.starrr",function(){return o.syncRating()});this.$el.on("click.starrr","span",function(e){return o.setRating(o.$el.find("span").index(e.currentTarget)+1)});this.$el.on("starrr:change",this.options.change)}t.prototype.defaults={rating:void 0,numStars:5,change:function(e,t){}};t.prototype.createStars=function(){var e,t,n;n=[];for(e=1,t=this.options.numStars;1<=t?e<=t:e>=t;1<=t?e++:e--){n.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"))}return n};t.prototype.setRating=function(e){if(this.options.rating===e){e=void 0}this.options.rating=e;this.syncRating();return this.$el.trigger("starrr:change",e)};t.prototype.syncRating=function(e){var t,n,r,i;e||(e=this.options.rating);if(e){for(t=n=0,i=e-1;0<=i?n<=i:n>=i;t=0<=i?++n:--n){this.$el.find("span").eq(t).removeClass("glyphicon-star-empty").addClass("glyphicon-star")}}if(e&&e<5){for(t=r=e;e<=4?r<=4:r>=4;t=e<=4?++r:--r){this.$el.find("span").eq(t).removeClass("glyphicon-star").addClass("glyphicon-star-empty")}}if(!e){return this.$el.find("span").removeClass("glyphicon-star").addClass("glyphicon-star-empty")}};return t}();return e.fn.extend({starrr:function(){var t,r;r=arguments[0],t=2<=arguments.length?__slice.call(arguments,1):[];return this.each(function(){var i;i=e(this).data("star-rating");if(!i){e(this).data("star-rating",i=new n(e(this),r))}if(typeof r==="string"){return i[r].apply(i,t)}})}})})(window.jQuery,window);$(function(){return $(".starrr").starrr()})

              $(function(){

                $('#new-review').autosize({append: "\n"});

                var reviewBox = $('#post-review-box');
                var newReview = $('#new-review');
                var openReviewBtn = $('#open-review-box');
                var closeReviewBtn = $('#close-review-box');
                var ratingsField = $('#ratings-hidden');

                openReviewBtn.click(function(e)
                {
                  reviewBox.slideDown(400, function()
                    {
                      $('#new-review').trigger('autosize.resize');
                      newReview.focus();
                    });
                  openReviewBtn.fadeOut(100);
                  closeReviewBtn.show();
                });

                closeReviewBtn.click(function(e)
                {
                  e.preventDefault();
                  reviewBox.slideUp(300, function()
                    {
                      newReview.focus();
                      openReviewBtn.fadeIn(200);
                    });
                  closeReviewBtn.hide();
                  
                });

                $('.starrr').on('starrr:change', function(e, value){
                  ratingsField.val(value);
                });
              });


           // DESENHAR O MAPA DO GOOGLE
           //
            function initialize() {

                var latLng = new google.maps.LatLng(-23.568071,-46.649074); 
                var mapOptions = {
                    zoom: 17,
                    center: latLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById('GoogleMapa'), mapOptions);

                var image = {
                 url: 'images/custom.png',
                  size: new google.maps.Size(33, 51),
                  origin: new google.maps.Point(0,0),
                  anchor: new google.maps.Point(40, 84)
                };

                var marker = new google.maps.Marker({
                    icon: image,
                    position: latLng,
                    map: map,
                    title:"Ver perfil do profissional"
                });

                google.maps.event.addListener(marker,'click',function(){
                    window.open('http://goo.gl/398JDk','_blank');
                });

            }

            google.maps.event.addDomListener(window, 'load', initialize);  