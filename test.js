/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 */


( function( window ) {

    'use strict';
    
    // class helper functions from bonzo https://github.com/ded/bonzo
    
    function classReg( className ) {
      return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    
    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;
    
    if ( 'classList' in document.documentElement ) {
      hasClass = function( elem, c ) {
        return elem.classList.contains( c );
      };
      addClass = function( elem, c ) {
        elem.classList.add( c );
      };
      removeClass = function( elem, c ) {
        elem.classList.remove( c );
      };
    }
    else {
      hasClass = function( elem, c ) {
        return classReg( c ).test( elem.className );
      };
      addClass = function( elem, c ) {
        if ( !hasClass( elem, c ) ) {
          elem.className = elem.className + ' ' + c;
        }
      };
      removeClass = function( elem, c ) {
        elem.className = elem.className.replace( classReg( c ), ' ' );
      };
    }
    
    function toggleClass( elem, c ) {
      var fn = hasClass( elem, c ) ? removeClass : addClass;
      fn( elem, c );
    }
    
    var classie = {
      // full names
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass,
      toggleClass: toggleClass,
      // short names
      has: hasClass,
      add: addClass,
      remove: removeClass,
      toggle: toggleClass
    };
    
    // transport
    if ( typeof define === 'function' && define.amd ) {
      // AMD
      define( classie );
    } else {
      // browser global
      window.classie = classie;
    }
    
    })( window );
    
    //fake jQuery
    var $ = function(selector){
      return document.querySelector(selector);
    }
    var accordion = $('.acc');
    
    
    
    
    
    //add event listener to all anchor tags with accordion title class
    accordion.addEventListener("click",function(e) {
      e.stopPropagation();
      e.preventDefault();
      if(e.target && e.target.nodeName == "A") {
        var classes = e.target.className.split(" ");
        if(classes) {
          for(var x = 0; x < classes.length; x++) {
            if(classes[x] == "acc_title") {
              var title = e.target;
    
              //next element sibling needs to be tested in IE8+ for any crashing problems
              var content = e.target.parentNode.nextElementSibling;
              
              //use classie to then toggle the active class which will then open and close the accordion
             
              classie.toggle(title, 'acc_title_active');
              //this is just here to allow a custom animation to treat the content
              if(classie.has(content, 'acc_panel_col')) {
                if(classie.has(content, 'anim_out')){
                  classie.remove(content, 'anim_out');
                }
                classie.add(content, 'anim_in');
    
              }else{
                 classie.remove(content, 'anim_in');
                 classie.add(content, 'anim_out');
              }
              //remove or add the collapsed state
              classie.toggle(content, 'acc_panel_col');
    
    
    
              
            }
          }
        }
        
      }
    });