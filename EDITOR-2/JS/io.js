/*

TITLE:
  io.JS

AUTHOR: Seagat2011
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION:
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE:
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml

REFERENCES:
  N/A

DESCRIPTION:
  file io (js) shell

INPUT:
  _

OUTPUT:
  _

*/

function LoadFile(ext,cb)
{
  chooseFile(function(files)
  {
    readFile(files[0], function(_data_)
    {
			cb(files[0].name, _data_);
    });
  }, ext);
}
function chooseFile(callback, filter)
{
	var chooser = document.createElement("input");
	chooser.type = "file";
	chooser.accept = (filter !== undefined) ? filter : "";
	chooser.onchange = function(event)
	{
		if(callback !== undefined)
		{
			callback(chooser.files);
		}
	};
	chooser.click();
}
function SaveFile(fn, data, ext, cb)
{
  cb(writeFile(fn , data, ext));
}
function SaveAsFile(data, ext, cb)
{
  cb(writeFile("", data, ext));
}
function writeFile(fn, data, ext)
{
	var success = false;
	var fileExt = ext;
  if(!fn)
  {
    fn = prompt("Project - SaveAs","default");
  }
	if(fn){
		success = fn;
    updateProjectTitle(fn);
		var blob = new Blob([data],{type:"text/javascript"});
		var url = URL.createObjectURL(blob);
		var m_Link = document.createElement("a");
		m_Link.href = url;
		m_Link.download = fn + fileExt;
		document.body.appendChild(m_Link);
		m_Link.click();
	}
	return success;
}
function readFile(file,callback)
{
	if(file instanceof Object)
	{
		var reader = new FileReader();
		reader.addEventListener( 'load', function ( event )
		{
			 if(callback)
			 {
				 callback(event);
			 }
		}, false);
		reader.readAsText(file);
	}
	else
	{
		var reader = new XMLHttpRequest();
		reader.open("GET", file);
		reader.overrideMimeType("text/plain; charset=x-user-defined");
		reader.onreadystatechange = function ()
		{
			if(reader.status == reader.DONE)
			{
				if(callback)
				{
					callback(reader.responseText);
				}
			}
		}
		reader.send();
	}
}