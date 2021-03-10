(function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    window.CustomEvent = CustomEvent;
})();

$modal = function (options) {
    var
        _elemModal,
        _eventShowModal,
        _eventHideModal,
        _hiding = false,
        _destroyed = false,
        _animationSpeed = 200;

    function _createModal(options) {
        var
            elemModal = document.createElement('div'),
            modalTemplate = '<div class="modal__backdrop" data-dismiss="modal"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">×</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>',
            modalFooterTemplate = '<div class="modal__footer">{{buttons}}</div>',
            modalButtonTemplate = '<button type="button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
            modalHTML,
            modalFooterHTML = '';

        elemModal.classList.add('modal');
        modalHTML = modalTemplate.replace('{{title}}', options.title || 'Новое окно');
        modalHTML = modalHTML.replace('{{content}}', options.content || '');
        if (options.footerButtons) {
            for (var i = 0, length = options.footerButtons.length; i < length; i++) {
                var modalFooterButton = modalButtonTemplate.replace('{{button_class}}', options.footerButtons[i].class);
                modalFooterButton = modalFooterButton.replace('{{button_handler}}', options.footerButtons[i].handler);
                modalFooterButton = modalFooterButton.replace('{{button_text}}', options.footerButtons[i].text);
                modalFooterHTML += modalFooterButton;
            }
            modalFooterHTML = modalFooterTemplate.replace('{{buttons}}', modalFooterHTML);
        }
        modalHTML = modalHTML.replace('{{footer}}', modalFooterHTML);
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }

    function _showModal() {
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add('modal__show');
            document.dispatchEvent(_eventShowModal);
        }
    }

    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('modal__show');
        _elemModal.classList.add('modal__hiding');
        setTimeout(function () {
            _elemModal.classList.remove('modal__hiding');
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }

    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            _hideModal();
        }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener('click', _handlerCloseModal),
                _destroyed = true;
        },
        setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};



var modal = $modal({
    content: '<iframe src="content.php" height="450px" width="400px">',
});
modal.show();

const animItems = document.querySelectorAll('.modal__content');

if (animItems.length > 0) {
  
    
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params){
    for (let index = 0; index < animItems.length;  index++) {
      const animItem = animItems[index];

      const animItemHeight = animItem.offsetHeight;  //ВЫСОТА МОДАЛЬНОГО ОКНА
      console.log(animItemHeight);

      const animItemOffset = offset(animItem).top;   //РАССТОЯНИЕ ОТ ВЫСШЕЙ ТОЧКИ МОДАЛЬНОГО ОКНА ДО ВЫСШЕЙ ТОЧКИ СТРАНИЦЫ
      console.log(animItemOffset);

      var body = document.body,
      html = document.documentElement;
      var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ); //ВЫСОТА ДОКУМЕНТА
      console.log(height-100);


      if ( (height - 100) <  (animItemOffset+animItemHeight)) {
        animItem.classList.add('_active');
        const _modal_content = document.querySelector('.modal__content');
        _modal_content.classList.add('_active');
        
      }else{
          animItem.classList.remove('_active');
          const _modal_content = document.querySelectorAll('.modal__content');
          //_modal_content.classList.remove('_active');
        
      }
    }
  }
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
}
animOnScroll();

var modal = $modal({
    content: '<div class="insta_content"><iframe src="https://www.instagram.com/p/CMCq-20HpHf/embed" height="400px" frameborder="0"></iframe></div>',
  });

  