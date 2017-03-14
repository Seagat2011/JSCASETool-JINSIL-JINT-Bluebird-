var op = {
  "\\/\\/.*\.[Jj][Ss]":function(u){
    return u.asModuleTag();
  },
  "^ga_":function(u){
    return u.asAttributeTag().asGlobalTag();
  },
  "^g_":function(u){/*
    var re = new RegExp("\\(.*\\)","");
    u = u.split(/^([^\s])+\s/).map(
    function(token)
    {
      if(token.match(re)){
        token = op["\\(.*\\)"](token);
      }
      return token;
    }).join(" ");*/
    return u.asGlobalTag();
  },
  "^a_":function(u){
    return u.asAttributeTag();
  },/*
  "\\(.*\\)":function(u){
    return u.asParamsTag();
  },*/
  "\\/\\/\\s*[Gg]raph ":function(u){
    return u.asGraphTag();
  },      
}

var exec = {
  "Enter":function(w){
    var code = ["<div>"];
    srcCode.textContent.split(/\n+/g).map(
    function(lines)
    {
      lines.split(/\n+/g).map(
      function(line){
        op.forEach(
        function(prop)
        {
          var re = new RegExp(prop,"");
          if(line.match(re))
          {
            line = op[prop](line);
          }
        });
        code.push(line);
        //line = line.asTag("div");
        //return line;
      });
    });
    code.push("</div>");
    srcCode.innerHTML = code.join("");
  },
  "default":function(e){
    
  },
}
		/*
		if(!(props in Object["current-workspace-data"][lib])){
			Object["current-workspace-data"][lib][props] = {};
		}
		*/
    
	/*
	if(!(params in Object["current-workspace-data"][lib][props])){
		Object["current-workspace-data"][lib][props][params] = {};
	}
	*/
	//if(!(details in Object["current-workspace-data"][lib])){
		Object["current-workspace-data"][lib][props] = details;
	//}
  
  //var lib_clean = lib.replace(/\s*/igm,"");
	
	//.replace(/\-p/igm,"").replace(/\-a/igm,"");//.split(/\s+/)[0].replace(/\-p/igm,"");
	
	
/*
function updateLibrary()
{
	srcLibraries.value.split(/\n+/g).map(function(lib)
	{	
		updateFeature(lib.hasFocus(), lib, function(lib_data)
		{
			if(!(lib_data in Object["current-workspace-data"])){
				Object["current-workspace-data"][lib_data] = {};
			}
			updateProperties(lib_data);
		});
	});
}
function focus_callback(e)
{
	updateLibrary();
}
/*
srcLibraries.addEventListener("focus", focus_callback,false);
srcProperties.addEventListener("focus", focus_callback,false);
srcParams.addEventListener("focus", focus_callback,false);
srcCode.addEventListener("focus", focus_callback,false);
srcTranslated.addEventListener("focus", focus_callback,false);
*/


function updateCallGraph(lib, props, params)
{
	var cg = srcCode.value.replace(/\s{2,}/gim," ");
	var details = params + " -- " + cg;
	Object["current-workspace-data"][lib][props] = details;
}


function updateFeature(flags, params, cb)
{
	if(flags){
		cb(params.replace(g_focusWildCardRE, ""));
	}
}
function updateParams(lib,props)
{
	var params = srcParams.value.replace(/\s{2,}/gm," ");
	var params_hasFocus = true;
	updateFeature(params_hasFocus, params, function(props_data)
	{
		updateCallGraph(lib, props, params);
	});	
}

function updateProperties(lib)
{
	srcProperties.value.split(/\n+/g).map(function(props)
	{
		
		var isNonPrototypeType = props.match(/\-p/gm);
		var requiresGlobalNamespace = (isNonPrototypeType && props.match(/\-g/gm));
		var isAttrib = props.match(/-a/gm);
		props = props.replace(/\s{2,}/gm," ").replace(/^\s+/gm,"").replace(/\s+$/gm,"");
		updateFeature(props.hasFocus(), props, function(props_data)
		{
			updateParams(lib,props_data);
		});
	});
}

function addParams(lib,props)
{
	var params = srcParams.value.replace(/\s{2,}/gm," ");
	var params_hasFocus = true;
	updateFeature(params_hasFocus, params, function(props_data)
	{
		updateCallGraph(lib, props, params);
	});	
}

true && (console.log("Well.."),console.log("Hello World!"))

function initPropWindow()
{
  var code = [];
  KEYWORD.forEach(
  function(_name_)
  {
    var members = KEYWORD[_name_];
    var name = _name_.replace(/^_/,"");
    code.push(name.asPropHTML());
    /*
    (members != null) && members.map(
    function(prop)
    {
      code.push((name + "." + prop).asPropHTML());
      return prop;
    });
    */
  });
  propSelBox.innerHTML = code.join("");
  prop1.addEventListener("keydown",
  function(e)
  {
    var ignore = {
      "ArrowHome":1,//e.keyCode(36)
      "ArrowLeft":1,//e.keyCode(37)
      "ArrowUp":1,//e.keyCode(38)
      "ArrowRight":1,//e.keyCode(39)
      "ArrowDown":1,//e.keyCode(40)
      "Control":1,//e.keyCode(17)
    }
    if(
    (e.target.id == "prop1") &&
    !(e.key in ignore)
    ){
    {
      var keys = prop1.value.split(/\./g);
      var I = keys.length;
      function next(k,i,buff)
      {
        var code = [buff] || [];
        var I = k.length;
        var w = k[i];
        if(
        (i==0) &&
        (KEYWORD["_"+w])
        ){
          if(I==1)
          {
            KEYWORD["_"+w].map(
            function()
            {
              
            });
            propSelBox.innerHTML = code.join("");w.asPropHTML();
          }
          else
          {
            buff = w;
            next(k,i+1,buff);
          }
        }
        else
        if(i<I)
        {
          var re = new RegExp("^"+keys[i],"");
          KEYWORD.forEach(
          function(_name_)
          {
            var name = _name_.replace(/^_/,"");
            if(name.match(re))
            {
              code.push(name.asPropHTML());
            }
          })
        }
      }
      next(keys,0,"");
      
      for(var i=0;i<I;i++)
      {
        var key = keys[i];
        if(KEYWORD["_"+key]){
          
        }
        var re = new RegExp(keys[i],"");
      }
      var re = new RegExp(prop1.value,"");
    }
    console.log(e);
  }, false);
  code = null;
  delete code;
}

<div id="divPropSelectWindow" class="cssOuterPropSelectWindow">
<div class="cssInnerPropSelectWindow">
<p>
Add property / attribute
<br><br>
<input id=prop1 onclick="" type="input"><br>
<select id=propSelBox>
<option default onclick="javascript:prop1.value = 'None';">  None  </option>
</select>
<br><br>
<input value="Cancel" onclick="" type="button">&nbsp;&nbsp;<input value="OK" onclick="" type="button">
</p>
</div>
</div>


  propSelBoxCancel.addEventListener("click",
  function(e)
  {
    if(e.target.id = "propSelBoxCancel")
    {
      divPropSelectWindow.style.display = "none";
      cb
    }
  }, false);
  propSelBoxOk.addEventListener("click",
  function(e)
  {
    if(e.target.id = "propSelBoxOk")
    {
      divPropSelectWindow.style.display = "none";
      cb
    }
  }, false);
  
function addProperty(lib)
{
	var refno = Object["current-workspace-global-refno"];
	var prop = prompt("Add property / attribute", "property" + (refno));
	if(prop)
	{
		var prop_name = prop.match(/^([\w-]+)/)[0];
		Object["current-workspace-global-refno"]++;
		Object["current-workspace-data"].lib[lib].props.push(prop_name);
		Object["current-workspace-data"].lib[lib].prop[prop_name] = { 
			flags:prop,
			asHTML:getPropBodyHTML(refno,lib,prop_name),
			params:"()" 
		}; 
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
	//var refno = Object["current-workspace-global-refno"];
	//var gname = p + refno
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
	perform[edit_ci || "callPropSelectWindow"](ti,ci_next);	
}
function addTrace()
{
	var refno = Object["current-workspace-global-refno"];
	var gname = "property" + refno;
	gname = prompt("Select property / attribute to insert",gname);
	if(gname)
	{
		Object["current-workspace-global-refno"]++;
		Object["current-workspace-data"]["graph"].push([]);
		var ti = Object["current-workspace-data"]["graph"].length-1;
		Object["current-workspace-data"]["graph"][ti] || (Object["current-workspace-data"]["graph"][ti] = []);
		Object["current-workspace-data"]["graph"][ti].push(getGraphBodyHTML(gname,ti,0));
		srcCode.invalidate();
	}
}
<img title='Remove property / attribute' onclick='removeProperty(" + lib + "," +  + ")' src='IMG/removeProperty.png'/>

/*
srcCodeTxt.addEventListener("keyup",
function(e)
{
  if(e.target.id == "srcCodeTxt")
  {
    //var key = e.key;
    //if(key in exec)
    //{
    //  exec[key](e);
    //}
    //console.log(e);
    editor.onEditorKey["Enter"](e);
  }
},false);
srcCode.spellcheck = false;
srcCodeTxt.spellcheck = false;
*/



  this.editorState["expandEditor"] = function(lines){
    var i = lines.length;
    var j = self.cache.length;
    self.editorState["updateEditor"](lines);
    while(i>j)
    {
      var line = document.createElement("div");
      line.id = "line"+self.lineRefno++;
      self.srcCode.appendChild(line);
      j = self.cache.push(line);
      self.invalidateEditor(j,"add",lines[j]);
    }
  }
  this.editorState["trimEditor"] = function(lines){
    var i = lines.length;
    var j = self.cache.length;
    self.editorState["updateEditor"](lines.splice(0,i));
    while(i<j)
    {
      var line = document.creatElement("div");
      var div = self.cache[i];
      self.srcCode.removeChild(div.id);
      j = self.cache.removeAt(line);
      self.invalidateEditor(j,"remove",lines[j]);
    }    
  }
  this.editorState["updateEditor"] = function(lines){
    lines.map(
    function(line,i)
    {
      self.invalidateEditor(i,"read",line);
      return line;
    })
  }
  
      var code = ["<div>"];
      code.push(srcCodeTxt.value.split(/\n/g).map(
      function(line,i)
      {
        var entryNotFound = (!(i in self.cache) || ((i in self.cache) && (line != self.cache[i].txt)));
        if(entryNotFound)
        {
          self.cache[i] = { txt:line, src:"" };
          var matchFound;
          self.op.forEach(
          function(prop)
          {
            var re = new RegExp(prop,"");
            if(!matchFound && line.match(re))
            {
              matchFound = true;
              line = self.op[prop](line);
            }
            return prop;
          });
          self.cache[i].src = line;
        }
        else
        {
          line = self.cache[i].src;
        }
        return line;
      }).join("<br>").replace(/\s/g,"&nbsp;"),"</div>");
      srcCode.innerHTML = code.join("");
      

  this.onEditorKey = {
    "Enter":function(e){
      self.srcCodeTxt.value.split(/\n/g).map(
      function(lines,i)
      {
        
      })
      
      var lines = self.srcCodeTxt.value.split(/\n/g);
      var I = lines.length;
      var i = self.cache.length;
      
      var action = "updateEditor";
      (i<I) && (action = "expandEditor");
      (i>I) && (action = "trimEditor");
      if(action in self.editorState)
      {
        self.editorState[action](lines,e);
      }
    },      