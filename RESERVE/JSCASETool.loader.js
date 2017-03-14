/*

TITLE: 
  JSCASETOOL-LOADER.JS

AUTHOR: Seagat2011 ( Michelle Antonello )
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
    
REFERENCES:
  JSCASETool / README

DESCRIPTION: 
  JINSIL / JINT Bluebird convert stacktraces,
  inline macros, and vars to javascript

INPUT:
  entity => godparent => indent <= indent

OUTPUT:
  var entity = []
  entity["godparent"] = []
  entity["godparent"]["indent"] = indent
  
SCRIPT TYPE: 
  import- tool

*/

function include(file)
{
  var el;
	if("src" in file) // .endsWith(".js")
	{
    el = document.createElement("script"); 
  }
  else
  if("href" in file) // .endsWith(".css")
  {
    el = document.createElement("link");  
  }
  for(var key in file)
  {
    if(file.hasOwnProperty(key)){
      el[key] = file[key];   
    }
  }
  document.head.appendChild(el);
}

include({ rel:"stylesheet", media:"all", href:"CSS/JSCASETool.css" })
include({ id:"__theme__", rel:"stylesheet", media:"all", href:"EDITOR/theme/chrome.css" })
include({ id:"__theme__", rel:"stylesheet", media:"all", href:"EDITOR/main.css" })
include({ id:"__mode__", src:"EDITOR/mode/javascript_highlight_rules.js" })
include({ src:"EDITOR/main.js" })
include({ src:"JS/MD5.js" })
include({ src:"JS/Array.js" })
include({ src:"JS/Object.js" })
include({ src:"JS/Node.js" })
include({ src:"JS/MODULES/TEST.js" })
include({ src:"JS/MODULES/GLOBALS.js" })
include({ src:"JS/MODULES/javascript.js" })
include({ src:"JS/JSCASETool.js",  innerHTML:[  
    'srcCode = BLACK_SPADE_EDITOR.fromTextArea("txtarea_srcCode")',
    'srcCode.setLine("// Step 2: Enter code for module then PRESS UPDATE UI TOOLS or BULD MODULE")',
    'srcTranslated = BLACK_SPADE_EDITOR.fromTextArea("txtarea_srcTranslated")',
  ].join("; ")
})