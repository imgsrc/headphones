'use strict';

var btnMenu = document.querySelector('.header__menu-btn');
var menuList = document.querySelector('.header__menu');
var menuInfo = document.querySelector('.header__callback');
var btnLine = document.querySelector('.header__menu-btn-line');
var btnLine2 = document.querySelector('.header__menu-btn-line2');
var btnLine3 = document.querySelector('.header__menu-btn-line3');
var btnLineActive = 'header__menu-btn-line--active';
var btnLineActive2 = 'header__menu-btn-line2--active';
var btnLineActive3 = 'header__menu-btn-line3--active';
var menuOpen = 'header__menu-open';


var closeHeadMenu = function () {
  menuList.classList.remove(menuOpen);
  menuInfo.classList.remove(menuOpen);
  btnLine.classList.remove(btnLineActive);
  btnLine2.classList.remove(btnLineActive2);
  btnLine3.classList.remove(btnLineActive3);
};

var openHeadMenu = function () {
  menuList.classList.add(menuOpen);
  menuInfo.classList.add(menuOpen);
  btnLine.classList.add(btnLineActive);
  btnLine2.classList.add(btnLineActive2);
  btnLine3.classList.add(btnLineActive3);
};

var checkMenu = function () {
  if (!menuList.classList.contains(menuOpen)) {
    openHeadMenu();
  } else {
    closeHeadMenu();
  }
}

var checkSize = function () {
  if (window.innerWidth > 767) {
    openHeadMenu();
  } else if (window.innerWidth < 767) {
    closeHeadMenu();
  }
}

btnMenu.addEventListener('click', checkMenu);
window.addEventListener('load', checkSize);
window.addEventListener('resize', checkSize);


// Popup

// Form vars
var form = document.querySelector('.form-cb__form');
var formOpen = 'form-cb__form-open';


// header vars
var headerBtnCallBack = document.querySelector('.header__cb-btn');
var headerForm = document.querySelector('.header__form');
var headerCloseFormBtn = document.querySelector('.header__close-btn');
var headerFormWrap = document.querySelector('.header__form-wrap');
// footer vars
var footerBtnCallBack = document.querySelector('.footer__link');

// close form
var closeHeadForm = function (currentForm) {
  form.classList.remove(formOpen);
  headerFormWrap.classList.remove('form-cb__form-wrap-show');
  form.addEventListener('animationend', hideHeadForm);
};
// close form esc
var escCloseHeadForm = function (evt) {
  if (evt.keyCode === 27) {
    closeHeadForm();
  }
};
// remove reserve block
var hideHeadForm = function () {
  headerForm.classList.remove('form-cb__form-hide');
};

// open form
var headCallBack = function (evt) {
  evt.preventDefault();
  if (window.innerWidth < 768) {
    closeHeadMenu();
  }
  headerForm.classList.add(formOpen);
  form.classList.add('form-cb__form-hide');
  headerFormWrap.classList.add('form-cb__form-wrap-show');
  form.removeEventListener('animationend', hideHeadForm);
};

headerBtnCallBack.addEventListener('click', headCallBack);
footerBtnCallBack.addEventListener('click', headCallBack);
headerCloseFormBtn.addEventListener('click', closeHeadForm);
window.addEventListener('keydown', escCloseHeadForm);


///// ty window

//ty vars
var tyWindow = document.querySelector('.form-ty');
var closeTyWindowBtn = document.querySelector('.form-ty__close');
var openTyWindow = 'forn-ty__open';

// callback vars
var callBackSubmitBtn = document.querySelector('.callback__submit');

// show ty window
var showTyWindow = function () {
  tyWindow.classList.add(openTyWindow);
};

// close ty window
var closeTyWindow = function () {
  tyWindow.classList.remove(openTyWindow);
};

// esc close ty window
var escCloseTyWindow = function (evt) {
  if (evt.keyCode === 27) {
    tyWindow.classList.remove(openTyWindow);
  }
};


// catalog vars
var catalogItems = document.querySelector('.catalog__items');
var catalogForm = document.querySelector('.catalog__form');
var catalogAllForm = document.querySelectorAll('.catalog__form');
var catalogFormWrap = document.querySelector('.catalog__form-wrap');
var catalogItemsAnim = 'catalog__items--animation';

// show catalog form
var showCatalogForm = function (evt) {
  checkCurrentCatalogForm(evt);
  showCatalogFormWithAnim(evt);
  if (catalogItems.classList.contains(catalogItemsAnim)) {
    catalogItems.classList.remove(catalogItemsAnim);
  } else {
    catalogItems.classList.add(catalogItemsAnim);
  }
};

var hideCatalogForm = function () {
  Array.prototype.forEach.call(catalogAllForm, function (item, i) {
    catalogAllForm[i].classList.remove(formOpen);
  });
};

var closeCatalogForm = function (evt) {
  if (evt.target.classList.contains('catalog__close-btn') || evt.keyCode === 27) {
    hideCatalogForm();
    catalogItems.addEventListener('animationend', closeReserveBlock);
    var catalogFormWrapShow = document.querySelector('.form-cb__form-wrap-show');
    catalogFormWrapShow.classList.remove('form-cb__form-wrap-show');
  }
};


// remove reserve block
var closeReserveBlock = function () {
  Array.prototype.forEach.call(catalogAllForm, function (item, i) {
    item.classList.remove('form-cb__form-hide');
  });
};

var checkCurrentCatalogForm = function (evt) {
  if (evt.target.id && !evt.target.classList.contains(formOpen)) {
    evt.preventDefault();
    var currentFormNumber = evt.target.id.slice(-1);
    Array.prototype.forEach.call(catalogAllForm, function (item, i) {
      if ((i + 1) == currentFormNumber) {
        catalogAllForm[i].classList.add(formOpen);
      }
    });
  }
};

var showCatalogFormWithAnim = function (evt) {
  if (evt.target.id && !evt.target.classList.contains(formOpen)) {
    evt.preventDefault();
    catalogItems.removeEventListener('animationend', closeReserveBlock);
    var currentFormNumber = evt.target.id.slice(-1);
    Array.prototype.forEach.call(catalogAllForm, function (item, i) {
      if ((i + 1) == currentFormNumber) {
        catalogAllForm[i].classList.add('form-cb__form-hide');
        var currentFormWrap = catalogAllForm[i].querySelector('.catalog__form-wrap');
        currentFormWrap.classList.add('form-cb__form-wrap-show');
      }
    });
  }
};

catalogItems.addEventListener('click', closeCatalogForm);
catalogItems.addEventListener('click', showCatalogForm);
window.addEventListener('keydown', closeCatalogForm);


//sliders


var saveItemAll = document.querySelectorAll('.save__item');
var saveItems = document.querySelector('.save__items');
var saveOwlContainer;
var saveID = document.getElementById('save__slider');
var saveDots = document.querySelector('.save__indicators');

var saveSlider = function () {
  var itemD = saveItemAll;
  var itemsD = saveItems;
  var id = saveID;
  var removeSlider = saveID.querySelector('.owl-stage-outer');

  if (itemsD.classList.contains('slider__carousel')) {
    saveOwlContainer = removeSlider;
  }

  if (window.innerWidth < 768) {
    if (!itemsD.classList.contains('slider__carousel')) {
      itemsD.classList.add('slider__carousel');
      itemsD.classList.add('owl-theme');
      itemsD.classList.add('owl-loaded');
      itemsD.classList.add('owl-carousel');
      if (saveOwlContainer != null) {
        itemsD.appendChild(saveOwlContainer);
        var owlItem = id.querySelectorAll('.owl-item');
        for (var i = 0; i < itemD.length; i++) {
          owlItem[i].appendChild(itemD[i]);
        }
        saveDots.style.display = 'flex';
      }
      $(".whyP__prev").click(function () {
        owl.trigger("prev.owl");
      });
      $(".whyP__next").click(function () {
        owl.trigger("next.owl");
      });

      var owl = $(".slider__carousel");
      $(document).ready(function () {
        owl.owlCarousel({
          items: 1,
          margin: 0,
          pagination: false,
          dotsContainer: '.save__indicators',
          pullDrag: true,
          mouseDrag: true
        });
      });
    }
  } else if (itemsD.classList.contains('slider__carousel') || itemsD.classList.contains('owl-carousel')) {
    itemsD.classList.remove('owl-carousel');
    itemsD.classList.remove('owl-theme');
    itemsD.classList.remove('owl-loaded');
    itemsD.classList.remove('slider__carousel');
    itemsD.removeChild(removeSlider);
    saveDots.style.display = 'none';
    Array.prototype.forEach.call(itemD, function (item) {
      itemsD.appendChild(item);
    });
  }
};

window.addEventListener('load', saveSlider);
window.addEventListener('resize', saveSlider);

var advgItemAll = document.querySelectorAll('.advgs__item');
var advgItems = document.querySelector('.advgs__items');
var advgOwlContainer;
var advgID = document.getElementById('advgs__slider');

var advgsSlider = function () {
  var itemD = advgItemAll;
  var itemsD = advgItems;
  var id = advgID;
  var owlContainer = advgOwlContainer;
  var removeSlider = id.querySelector('.owl-stage-outer');
  var advgsDots = document.querySelector('.advg__indicators');

  if (itemsD.classList.contains('slider__carousel')) {
    advgOwlContainer = removeSlider;

  }

  if (window.innerWidth < 768) {
    if (!itemsD.classList.contains('slider__carousel')) {
      itemsD.classList.add('slider__carousel');
      itemsD.classList.add('owl-theme');
      itemsD.classList.add('owl-loaded');
      itemsD.classList.add('owl-carousel');
      advgsDots.style.display = 'flex';
      if (owlContainer != null) {
        itemsD.appendChild(owlContainer);
        var owlItem = id.querySelectorAll('.owl-item');
        for (var i = 0; i < itemD.length; i++) {
          owlItem[i].appendChild(itemD[i]);
        }
      }
      $(".whyP__prev").click(function () {
        owl.trigger("prev.owl");
      });
      $(".whyP__next").click(function () {
        owl.trigger("next.owl");
      });

      var owl = $(".slider__carousel");
      $(document).ready(function () {
        owl.owlCarousel({
          items: 1,
          margin: 0,
          pagination: false,
          dotsContainer: '.advg__indicators',
          pullDrag: true,
          mouseDrag: true
        });
      });
    }
  } else if (itemsD.classList.contains('slider__carousel') || itemsD.classList.contains('owl-carousel')) {
    itemsD.classList.remove('owl-carousel');
    itemsD.classList.remove('owl-theme');
    itemsD.classList.remove('owl-loaded');
    itemsD.classList.remove('slider__carousel');
    itemsD.removeChild(removeSlider);
    advgsDots.style.display = 'none';
    Array.prototype.forEach.call(itemD, function (item) {
      itemsD.appendChild(item);
    });
  }
};

window.addEventListener('load', advgsSlider);
window.addEventListener('resize', advgsSlider);

var reviewsItems;
var reviewsSlider = function () {
  $(".reviews__prev").click(function () {
    owl.trigger("prev.owl");
  });
  $(".reviews__next").click(function () {
    owl.trigger("next.owl");
  });
  if (window.innerWidth < 768) {
    reviewsItems = 1;
  } else {
    reviewsItems = 3;
  }

  var owl = $(".reviews__items");
  $(document).ready(function () {
    owl.owlCarousel({
      items: reviewsItems,
      margin: 0,
      pagination: false,
      dotsContainer: '.advgs__indicators',
      pullDrag: true,
      mouseDrag: true,
      loop: true
    });
  });
};

window.addEventListener('load', reviewsSlider);
window.addEventListener('resize', reviewsSlider);

!function (factory) {
  "function" == typeof define && define.amd ? define(["jquery"], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function ($) {
  var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua),
      android = /android/i.test(ua);
  $.mask = {
    definitions: {
      "9": "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, $.fn.extend({
    caret: function (begin, end) {
      var range;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin,
          this.each(function () {
            this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(),
                    range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin),
                    range.select());
          })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(),
              begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length),
          {
            begin: begin,
            end: end
          });
    },
    unmask: function () {
      return this.trigger("unmask");
    },
    mask: function (mask, settings) {
      var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
      if (!mask && this.length > 0) {
        input = $(this[0]);
        var fn = input.data($.mask.dataName);
        return fn ? fn() : void 0;
      }
      return settings = $.extend({
        autoclear: $.mask.autoclear,
        placeholder: $.mask.placeholder,
        completed: null
      }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length,
          firstNonMaskPos = null, $.each(mask.split(""), function (i, c) {
        "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])),
        null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
      }), this.trigger("unmask").each(function () {
        function tryFireCompleted() {
          if (settings.completed) {
            for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
            settings.completed.call(input);
          }
        }

        function getPlaceholder(i) {
          return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
        }

        function seekNext(pos) {
          for (; ++pos < len && !tests[pos];) ;
          return pos;
        }

        function seekPrev(pos) {
          for (; --pos >= 0 && !tests[pos];) ;
          return pos;
        }

        function shiftL(begin, end) {
          var i, j;
          if (!(0 > begin)) {
            for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
              if (!(len > j && tests[i].test(buffer[j]))) break;
              buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
            }
            writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
          }
        }

        function shiftR(pos) {
          var i, c, j, t;
          for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
            if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
            c = t;
          }
        }

        function androidInputEvent() {
          var curVal = input.val(), pos = input.caret();
          if (oldVal && oldVal.length && oldVal.length > curVal.length) {
            for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1];) pos.begin--;
            if (0 === pos.begin) for (; pos.begin < firstNonMaskPos && !tests[pos.begin];) pos.begin++;
            input.caret(pos.begin, pos.begin);
          } else {
            for (checkVal(!0); pos.begin < len && !tests[pos.begin];) pos.begin++;
            input.caret(pos.begin, pos.begin);
          }
          tryFireCompleted();
        }

        function blurEvent() {
          checkVal(), input.val() != focusText && input.change();
        }

        function keydownEvent(e) {
          if (!input.prop("readonly")) {
            var pos, begin, end, k = e.which || e.keyCode;
            oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(),
                begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1),
                end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1),
                e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText),
                    input.caret(0, checkVal()), e.preventDefault());
          }
        }

        function keypressEvent(e) {
          if (!input.prop("readonly")) {
            var p, c, next, k = e.which || e.keyCode, pos = input.caret();
            if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
              if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)),
                      p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                  var proxy = function () {
                    $.proxy($.fn.caret, input, next)();
                  };
                  setTimeout(proxy, 0);
                } else input.caret(next);
                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
              }
              e.preventDefault();
            }
          }
        }

        function clearBuffer(start, end) {
          var i;
          for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
        }

        function writeBuffer() {
          input.val(buffer.join(""));
        }

        function checkVal(allow) {
          var i, c, pos, test = input.val(), lastMatch = -1;
          for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
            for (buffer[i] = getPlaceholder(i); pos++ < test.length;) if (c = test.charAt(pos - 1),
                    tests[i].test(c)) {
              buffer[i] = c, lastMatch = i;
              break;
            }
            if (pos > test.length) {
              clearBuffer(i + 1, len);
              break;
            }
          } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
          return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""),
              clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))),
              partialPosition ? i : firstNonMaskPos;
        }

        var input = $(this), buffer = $.map(mask.split(""), function (c, i) {
          return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
        }), defaultBuffer = buffer.join(""), focusText = input.val();
        input.data($.mask.dataName, function () {
          return $.map(buffer, function (c, i) {
            return tests[i] && c != getPlaceholder(i) ? c : null;
          }).join("");
        }), input.one("unmask", function () {
          input.off(".mask").removeData($.mask.dataName);
        }).on("focus.mask", function () {
          if (!input.prop("readonly")) {
            clearTimeout(caretTimeoutId);
            var pos;
            focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function () {
              input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
            }, 10);
          }
        }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function () {
          input.prop("readonly") || setTimeout(function () {
            var pos = checkVal(!0);
            input.caret(pos), tryFireCompleted();
          }, 0);
        }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent),
            checkVal();
      });
    }
  });
});

$(document).ready(function(){
  $(".phone_here").mask("+7 (999) 999-99-99");
  $(document).on('click', '.header__menu-link', function(event){
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top - 10
    }, 500);
  });
  $('form').submit(function(){
    var button = $(this);
    if($(this).closest('form').find( "input[name='Телефон']" ).val()==''){
      if($(this).data('shown')!='1'){
        $(this).attr('data-shown', '1');
        $(this).closest('form').find( "input[name='Телефон']" ).css('border', '2px solid red');
      }
    }
    else{
      var email = $(this).closest('form').find( "input[name='Телефон']" ).val();
      if(email != ''){
        $.ajax({
          type: "POST",
          url: 'mail.php',
          data: button.closest('form').serialize(),
          success: function(data)
          {
              swal({
                type: 'success',
                title: 'Спасибо!',
                html: 'Наш менеджер свяжется с вами в ближайшее время!'
              });
          }
        });
      }
    }
    return false;
  });
});