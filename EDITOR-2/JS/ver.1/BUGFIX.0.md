
SYMP: function declarations are dumped as key-entries in JSON file
SOLU: meta-obj.js: for(var i in arguments) .. ==> var I = arguments.length; for(var i=0;i<I;i++) ..

SYMP: prop-window.js:prop1.value == undefined
SOLU: index.js::getPropBodyHTML: <div class=cssPROPERTYICON id='prop" + refno ==> <div class=cssPROPERTYICON id='divProperty" + refno