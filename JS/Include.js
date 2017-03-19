/*

TITLE: 
  JSCASETOOL.JS

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
  Include javacript or css file

INPUT:
  _

OUTPUT:
  _
  
SCRIPT TYPE: 
  import tool

*/

function include(file, onload)
{
	var document_body = document.head || document.getElementsByTagName("head")[0]
	if(file.endsWith(".js"))
	{
		var js = document.createElement("script");
		js.src = file;
		js.type = "text/javascript";
		js.async = false;
		if(onload)
		{
			js.onload = onload;
		}
		document_body.appendChild(js);
	}
	else 
  if(file.endsWith(".css"))
	{
		var css = document.createElement("link");
		css.href = file;
		css.rel = "stylesheet";
		document_body.appendChild(css);
	}
}