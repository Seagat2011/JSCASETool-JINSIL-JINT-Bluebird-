/*

TITLE:
  INDEX.JS

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
  js shell

INPUT:
  _

OUTPUT:
  _

*/

function previewTool()
{

}
function loader()
{
  Object["current-workspace-property-window"] = new PropertySelectWindow();
	Object["current-workspace-property-window"].init();
	Object["current-workspace-property-window"].addWindowOKListener(graphCallback);
	Object["current-workspace-property-window"].addWindowCANCELListener(graphCallback);
}
function clear_window()
{
  srcTranslated.value = "";
}
function MD5()
{
  srcTranslated.value = Math.MD5(srcCode.value);
}
function updateProjectTitle(fn)
{
  Object["current-workspace-filename"] = fn.replace(/\..*$/,"");
  Object["current-workspace-project-title"] = Object["default-workspace-project-title"] + " ( " + fn.replace(/\..*$/,"") + Object["current-workspace-file-extension"] + " )";
  document.title = Object["current-workspace-project-title"] ;
}
function loadFile()
{
  chooseFile(function(files)
  {
    readFile(files[0], function(_data_)
    {
      var data = JSON.parse(_data_.target.result);
      Object["current-workspace-data"] = data;
      updateProjectTitle(files[0].name);
    });
  }, Object["current-workspace-file-extension"]);
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
function saveFile()
{
  var data = JSON.stringify(Object["current-workspace-data"],2,"  ");
  writeFile(Object["current-workspace-filename"] , data);
}
function saveAsFile()
{
  var data = JSON.stringify(Object["current-workspace-data"],2,"  ");
  writeFile("", data);
}
function writeFile(fn, data)
{
	var success = false;
	var fileExt = Object["current-workspace-file-extension"];
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
function getGraphBodyHTML(w,ti,ci)
{
	var asHTML = "<div class='cssICON' style='padding-left:0px;'><span title='add to call graph +' onclick='updateGraph(\"add\"," +
		ti + "," + ci + ")'>(" + ci + ") " + w + "<img style='padding-left:12px;' src='IMG/addTrace.png'/></span><img onclick='updateGraph(\"remove\"," +
		ti + "," + ci + ")' title='remove from call graph -' src='IMG/removeTrace.png'/></div>";
	return asHTML
}
function updatePropertyName(lib,prop_name)
{
	var nn = prompt("edit property / attribute",prop_name);
	if(nn)
	{
		if(
		(nn in Object["current-workspace-data"].lib[lib].prop) &&
		!(confirm("An entry already exists for \""+nn+"\". Do you wish to overwrite this entry ?"))
		){
			return;
		}
		var new_name = nn.match(/^(\w+)/)[0];
		var refno = Object["current-workspace-global-refno"]++;
		var idx = Object["current-workspace-data"].lib[lib].props.indexOf(prop_name);
		var params = Object["current-workspace-data"].lib[lib].prop[prop_name].params || "()";
		Object["current-workspace-data"].lib[lib].props[idx] = new_name;
		Object["current-workspace-data"].lib[lib].prop[new_name] = new PropertyObject(nn,getPropBodyHTML(refno,lib,new_name),params);
		delete Object["current-workspace-data"].lib[lib].prop[prop_name];
		srcLibraries.invalidate();
	}
}
function getPropBodyHTML(refno,lib,prop_name)
{
	var asHTML = "<div class=cssPROPERTYICON id='divProperty" + refno + "'><span onclick=updatePropertyName('" + lib + "','" + prop_name + "') title='edit property name'> " +
		prop_name + " </span><span id='span_parameterList" + refno + "' onclick=addParams('" + lib + "','" + prop_name + 
		"') title='parameter-list'>() (edit parameter-list)</span><span title='Remove property / attribute' onclick=removeProperty('" +
		lib + "','" + prop_name + "')> ( remove ) </span></div>";
	return asHTML
}
function getLibBodyHTML(refno,lib)
{
	var asHTML = "<div class=cssLIBRARYICON id='divLibrary" + refno + "' ><span onclick=updateLibraryName('" + lib + "') title='edit library name') >// " +
		lib + " </span><img style='padding-left:24px;padding-right:24px;' onclick=addProperty('" + lib + "') title='Insert property / attribute' src='IMG/32x14/addProperty.png'/><span title='Remove library' onclick='removeLibrary(" + lib + ")'> ( remove ) </span></div>";
	return asHTML
}
function graphCallback(obj)
{
	var params = Object["current-workspace-property-window"].params;
	var perform = {
		"spawnNewTrace":function(o){
			var gname = o.gname;
			if(gname){
				Object["current-workspace-data"]["graph"].push([]);
				var ti = Object["current-workspace-data"]["graph"].length-1;
				Object["current-workspace-data"]["graph"][ti].push(getGraphBodyHTML(gname,ti,0));
				this.default();
			}
			},
		"insertAt":function(o){
			var gname = o.gname;
			if(gname)
			{
				var ti = params.ti;
				var i = params.ti;
				var j = params.ci_next;
				var graphObj = Object["current-workspace-data"]["graph"][ti];
				var asHTML = getGraphBodyHTML(gname,i,j);
				Object["current-workspace-data"]["graph"][ti] = graphObj.insertAt(j,asHTML.prepad(j));
				this.default();
			}
			},
		"add":function(o){
			var gname = o.gname;
			if(gname)
			{
				var ti = params.ti;
				var i = params.ti;
				var j = params.ci_next;
				var graphObj = Object["current-workspace-data"]["graph"][ti];
				var asHTML = getGraphBodyHTML(gname,i,j);
				graphObj.push(asHTML.prepad(j));
				this.default();
			}
			},
		"default":function(){
			srcCode.invalidate();
			},
	};
	perform[params.op](obj);
}
function updateLibraryName(lib)
{
	var new_lib = prompt("edit library name",lib)
	if(new_lib && (new_lib != lib)){
		var refno = Object["current-workspace-global-refno"]++;
		Object["current-workspace-data"].lib[new_lib] = Object["current-workspace-data"].lib[lib];
		Object["current-workspace-data"].lib[new_lib].asHTML = getLibBodyHTML(refno,new_lib);
		var idx = Object["current-workspace-data"].libs.indexOf(lib);
		Object["current-workspace-data"].libs[idx] = new_lib;
		delete Object["current-workspace-data"].lib[lib];
		srcLibraries.invalidate();
	}
}
function updateGraph(op,ti,ci)
{
	var ci_next = ci+1;
	var ti_length = Object["current-workspace-data"]["graph"][ti].length;
	var graphObj = Object["current-workspace-data"]["graph"][ti];
	var edit_ci = "add";
	((op == "add") && ((ci < (ti_length-1)) && (edit_ci = "insertAt"))) || ((op == "remove") && (edit_ci = "removeAt"));
	var perform = {
		"removeAt":function(i,j){
			if(confirm("Remove graph / trace ("+i+","+j+") - Are you sure ?")){
			graphObj.removeAt(j);
			this.default();
			}
			},
		"callPropSelectWindow":function(){
			Object["current-workspace-property-window"].params = {
				op:edit_ci,
				ti:ti,
				ci:ci,
				ci_next:ci_next,
				msg:"Select property / attribute to import",
				params:"",
			}
			Object["current-workspace-property-window"].showWindow();
			},
	}
	if(edit_ci in perform)
	{
		perform[edit_ci](ti,ci_next);
	}
	else
	{
		perform["callPropSelectWindow"](ti,ci_next);
	}
}
function addTrace()
{
	var ti = Object["current-workspace-data"]["graph"].length;
	Object["current-workspace-property-window"].params = {
		op:"spawnNewTrace",
		ti:ti,
		ci:"unset",
		ci_next:"unset",
		msg:"Select property / attribute to import",
		params:"",
	}
	Object["current-workspace-property-window"].attachKeywordList(Object["current-workspace-data"].asKeywordList("lib","libs"));
	Object["current-workspace-property-window"].showWindow();
}
function addParams(lib,prop)
{
	var params = Object["current-workspace-data"].lib[lib].prop[prop].params || "()";
	params = prompt("Add parameter-list", params);
	if(params)
	{
		Object["current-workspace-data"].lib[lib].prop[prop].params = params;
		srcLibraries.invalidate();
	}
}
function removeProperty(lib,prop_name)
{
	delete Object["current-workspace-data"].lib[lib].prop[prop_name];
	var idx = Object["current-workspace-data"].lib[lib].props.indexOf(prop_name);
	Object["current-workspace-data"].lib[lib].props.removeAt(idx);
	srcLibraries.invalidate();
}
function addProperty(lib)
{
	var refno = Object["current-workspace-global-refno"];
	var prop = prompt("Add property / attribute", "property" + (refno));
	if(prop)
	{
		var prop_name = prop.match(/^(\w+)/)[0];
		Object["current-workspace-global-refno"]++;
		Object["current-workspace-data"].lib[lib].props.push(prop);
		Object["current-workspace-data"].lib[lib].prop[prop_name] = new PropertyObject(prop,getPropBodyHTML(refno,lib,prop_name));
		srcLibraries.invalidate();
	}
}
function removeLibrary(lib)
{
	var idx = Object["current-workspace-data"].libs.indexOf(lib);
	Object["current-workspace-data"].libs.removeAt(idx);
	delete Object["current-workspace-data"].lib;
	srcLibraries.invalidate();	
}
function addLibrary()
{	
	var refno = Object["current-workspace-global-refno"];
	var lib = prompt("Add library file", "default" + (refno) + ".js");
	if(lib && !(lib in Object["current-workspace-data"]))
	{
		Object["current-workspace-global-refno"]++;
		Object["current-workspace-data"].libs.push(lib);
		Object["current-workspace-data"].lib[lib] = new MetaObj("prop");
		Object["current-workspace-data"].lib[lib].asHTML = getLibBodyHTML(refno,lib);
		srcLibraries.invalidate();
	}
}