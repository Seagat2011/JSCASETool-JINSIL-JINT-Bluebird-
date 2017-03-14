# JSCASETool-JINSIL-JINT-Bluebird-
HTML5 / CSS3 inline javascript editor  Supports inline javascript, stacktracing, and inline macros

### ABOUT BLUEBIRD
 
- Bluebird allows javascript inlining, 
    allowing code to be instantiated as
    its conceived.  Bluebird requires no
    setup of objects, arrays, or functions, 
    or variables (its actually not allowed)
    
    Simply trace through your code as an
    object would and describe what 
    happens in every module, step-by-step,
    declaring variables and functions, as
    needed 

    Bluebird then converts the trace 
    to javascript
    
### RULES

- Bluebird considers ```[] === {}```
- Bluebird allows unique hasa attribs and vars to be fast-forwarded (```=>=>```)
- Bluebird maps all literals into vars
- Bluebird maps all vars and funcs into objs
- Bluebird maps all objs into larger encapsulating objs
- Bluebird exports all undefined, vars, literals, 
    & immediates into parameter-lists (ie. arity manifesting)
- Bluebird resolves all macros inline
- Bluebird resolves all vars inline
- Bluebird: hasa always evaluates to true

### RULES OF INDIRECTION 

```javascript
    hasa 
        => or =>=> (fast-foward) 
    isa 
        <=  
```

### SYNTACTIC SUGAR

```javascript
- x=>(){..}, function
- x=>(..){..}, for-each|for-in|map
- x=>{,..}, object|array
- x=>[,..], array|object
- (..){..}, if-then-else|switch
- ([opt];..;[opt]){..}, for-loop|while
- {..}([opt];..;[opt]), do|while
- a <= x, assignment or macro, equivalent to, var a = x
- a => x <= w, property assignment, equivalent to, a.x = w
- a => x, property assignment (sugar), equivalent to, a => x <= x, equivalent to, a.x = x
- a <= new x, assignment or macro (copyof), equivalent to, var a = x; var b = a
- new a => x, property assignment, equivalent to, new a => x <= x, 
  equivalent to, var b = new a(); b.x = x        
```

### EXAMPLE #1 

```javascript
  indent => push(obj)
```  
 
#### GENERATED JAVASCRIPT ..

```javascript
  indent.push(obj) or indent["push"] (obj) 
```        

### EXAMPLE #2

```javascript
  indent <= callParentObj(obj)
```
  
#### GENERATED JAVASCRIPT .. 

```javascript
  var indent = callParentObj (obj)
```        

### EXAMPLE #3

```javascript
  indent <= archive => callParentObj(obj)
``` 
 
#### GENERATED JAVASCRIPT .. 

```javascript
  var indent = archive["callParentObj"] (obj)
```        

### EXAMPLE #4

```javascript
  gpi <= archive => godparent => indent <= w
``` 
 
#### GENERATED JAVASCRIPT .. 

```javascript
  var archive = []
  archive["godparent"] = []
  archive["godparent"]["indent"] = w
  var gpi = archive["godparent"]["indent"]
```        

### EXAMPLE #5

```javascript
  gpi <= archive => godparent => indent
```  
 
#### GENERATED JAVASCRIPT .. 

```javascript
  var archive = []
  archive["godparent"] = []
  archive["godparent"]["indent"] = indent
  var gpi = archive["godparent"]["indent"]
```  
  
### EXAMPLE #6

```javascript
  gpi <= archive => godparent => indent
  gpl <= archive => godparent => level
  entity => [gpi] => [gpl] => push(obj)
```  
 
#### GENERATED JAVASCRIPT .. 

```javascript
  var archive = []
  archive["godparent"] = []
  archive["godparent"]["indent"] = indent
  archive["godparent"]["level"] = level
  var gpi = archive["godparent"]["indent"]
  var gpl = archive["godparent"]["level"]
  var entity = []
  entity[gpi] = []
  entity[gpi][gpl] = []
  entity[gpi][gpl].push(obj) or entity[gpi][gpl]["push"](obj)
```
  
### EXAMPLE #7

```javascript
  entity => [gpi <= archive => godparent => indent] => [gpl <= archive => godparent => level] => push(obj)
```  
 
#### GENERATED JAVASCRIPT .. 

```javascript
  var archive = []
  archive["godparent"] = []
  archive["godparent"]["indent"] = indent
  archive["godparent"]["level"] = level
  var gpi = archive["godparent"]["indent"]
  var gpl = archive["godparent"]["level"]
  var entity = []
  entity[gpi] = []
  entity[gpi][gpl] = []
  entity[gpi][gpl].push(obj) or entity[gpi][gpl]["push"](obj)
```  

### EXAMPLE #8

```javascript
(indent<1) {
    ( !( _ <= archive => [w] ) ){
        _  => indent <= 0
        ( __ <= entity ) => [0] => push(['\nfunction _',w,'(',[],'){\n',[],'\n}\n_',w,'.prototype = new Object()\n',w,' = new _',w
    }
    callstack <= updatecallstack(_,callstack,indent)
}
(indent<2) {
    (!_){
        _  => indent
        callstack <= updatecallstack(_,callstack,indent)
        __ => [gpi <= _ => godparent => indent <= callstack => [0] => indent] => [gpl <= _ => godparent => level <= callstack => [0] => level] => [gpc <= _ => godparent => codebody <= 5] => push([minor_tab+'this["',w,'"] => (',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    __ => [indent] => push([_ => parent => s_name <= callstack => [0] => s_name + '.',w,'(',[],')','\n'])
} 
(indent>1) {
    (!_){
        _  => indent
        callstack <= updatecallstack(_,callstack,indent)
        __ => [gpi] => [gpl] => [gpc] => unshift([minor_tab+'this["',w,'"] => (',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    __ => [gpi] => [gpl] <= set_gparent_codebody(_,__ => [gpi] => [gpl],w,[major_tab+'this.',w,'(',[],')','\n'],indent)
}
```
 
#### GENERATED JAVASCRIPT .. 

```javascript
if(indent<1){
    if(!archive[w]){
        archive[w] = {}
        archive[w].indent = 0
        archive[w].s_name = w
        archive[w].name = 1
        archive[w].codebody = 5
        entity[0].push(['\nfunction _',w,'(',[],'){\n',[],'\n}\n_',w,'.prototype = new Object()\n',w,' = new _',w,'()'])
        archive[w].level = entity[0].length-1
    }
    callstack = updatecallstack(archive[w],callstack,indent)
} else 
if(indent<2){
    if(!archive[w]){
        archive[w] = {}
        archive[w].indent = indent
        archive[w].s_name = w
        archive[w].name = 1
        archive[w].codebody = 5
        archive[w].level = entity[0].length-1
        callstack = updatecallstack(archive[w],callstack,indent)
        archive[w].parent = { s_name:callstack[indent-1].s_name,indent:callstack[indent-1].indent,level:callstack[indent-1].level }
        archive[w].godparent = { s_name:callstack[0].s_name,indent:callstack[0].indent, level:callstack[0].level }
        var gpi = archive[w].godparent.indent
        var gpl = archive[w].godparent.level
        var gpc = archive[w].codebody
        entity[gpi][gpl][gpc].push([minor_tab+'this["',w,'"] = function(',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    indent = archive[w].indent
    var parent = archive[w].parent.s_name 
    entity[indent].push([parent+'.',w,'(',[],')','\n'])
} else 
if(indent){
    if(!archive[w]){
        archive[w] = {}
        archive[w].s_name = w
        archive[w].name = 1
        archive[w].codebody = 5
        archive[w].indent = indent
        archive[w].level = entity[0].length-1
        callstack = updatecallstack(archive[w],callstack,indent)
        archive[w].parent = { s_name:callstack[indent-1].s_name,indent:callstack[indent-1].indent,level:callstack[indent-1].level }
        archive[w].godparent = { s_name:callstack[0].s_name,indent:callstack[0].indent, level:callstack[0].level }
        var gpi = archive[w].godparent.indent
        var gpl = archive[w].godparent.level
        var gpc = archive[w].codebody
        entity[gpi][gpl][gpc].unshift([minor_tab+'this["',w,'"] = function(',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    var gpi = archive[w].godparent.indent
    var gpl = archive[w].godparent.level
    entity[gpi][gpl] = set_gparent_codebody(archive,entity[gpi][gpl],w,[major_tab+'this.',w,'(',[],')','\n'],indent)
} 
```

### TIPS
- If you're not sure which indirection to use, 
    try isa or hasa in a sentence 
- Use multiple newlines to separate unrelated conditional-blocks 

# STACKTRACING

### EXAMPLE STACKTRACE

```javascript
// Parse.js
find_global_axioms
match_local_phrases
generate_global_phrase
split_local_phrase_obj
 replace_global_elements_with_delim_obj2
 replace_first_local_phrase_delim_obj2
 replace_remaining_delim_obj2
 replace_remaining_delim_obj2
// Library.js
Reload_local_vars
  serialize
// Parse.js
serializeFile
``` 

#### GENERATED JAVASCRIPT .. 

```javascript
// Parse.js

function Parse()
{
  var self = this
}
Parse.prototype.replace_remaining_delim_obj2 = function()
{

}
Parse.prototype.replace_first_local_phrase_delim_obj2 = function()
{

}
Parse.prototype.replace_global_elements_with_delim_obj2 = function()
{

}
Parse.prototype.find_global_axioms = function()
{

}
Parse.prototype.match_local_phrases = function()
{

}
Parse.prototype.generate_global_phrase = function()
{

}
Parse.prototype.split_local_phrase_obj = function()
{
  this.replace_global_elements_with_delim_obj2()
  this.replace_first_local_phrase_delim_obj2()
  this.replace_remaining_delim_obj2()
  this.replace_remaining_delim_obj2()
}
Parse.prototype.serializeFile = function()
{

}

// Library.js

function Library()
{
  var self = this
}
Library.prototype.serialize = function()
{

}
Library.prototype.Reload_local_vars = function()
{
  this.serialize()
}
```

### EXAMPLE 2

```javascript
// JS_BLAZE_EDITOR.js
g_global(a, b)
 attachEvent(id, obj)
 m_show()
 showResults()
ga_globalAttribute
JS_BLAZE_EDITOR(a, b, c)
a_attribute
refresh()
ma_memberAttribute
m_member(id)
 getDocumentID(id)
 attachListener(id, obj)
```

#### GENERATED JAVASCRIPT .. 

```javascript
// JS_BLAZE_EDITOR.js

var ga_globalAttribute = 0;

function g_global(a,b)
{
  var __m = new JS_BLAZE_EDITOR(a, b)
  __m.attachEvent(id,obj)
  __m.m_show()
  __m.showResults()
}

function JS_BLAZE_EDITOR(a,b,c)
{
  var self = this;
  this.ma_memberAttribute = 0;
  this.m_show = function()
  {
  
  }
  this.m_member = function(id)
  {
    self.getDocumentID(id)
    self.attachListener(id,obj)
  }
}
JS_BLAZE_EDITOR.prototype.refresh = function()
{

}
JS_BLAZE_EDITOR.prototype.attachEvent = function(id,obj)
{

}
JS_BLAZE_EDITOR.prototype.getDocumentID = function(id)
{

}
JS_BLAZE_EDITOR.prototype.attachListener = function(id,obj)
{

}
JS_BLAZE_EDITOR.prototype.showResults = function()
{

}
JS_BLAZE_EDITOR.prototype.a_attribute = 0
```

Use numbered line-comment(s) (eg //0, //0-5) or the wildcard (//_) as substitution macros: 

Example 

```javascript

// Stacktrace window 

g_global(a, b) 
 attachEvent(id, obj) 
 m_show() 
 showResults() 
 showMoreResults() 

// Function definition window for g_global(a, b) 

[code] 
//0 
[code]
//1-2 
[code] 
//_


// Build Module window 

function g_global(a, b)
{
  var _m = new JS_BLAZE_EDITOR(a,b,c)
  [code]
  _m.attachEvent(id, obj) 
  [code] 
  _m.m_show() 
  _m.showResults() 
  [code] 
  _m.showMoreResults()
} 
```

## CONDENSED OBJECT LOADING 

Bluebird supports condensed object loading, as well as internal operator overloading 

### EXAMPLE #1 (condensed object loading : ortho-map)  

```javascript
a => {
  [0,1,3] <= 1,
}
```

#### GENERATED JAVASCRIPT .. 

```javascript
var a = function(){
  var __tmp00 = []
  [0,1,3].map(function(v){
    __tmp00[v] = 1
  })
  return __tmp00
}()
```

### EXAMPLE #2  (condensed object loading : ortho-map)

```javascript
a => {
  [0,1,3] <= [2,6,4],
}
```

#### GENERATED JAVASCRIPT .. 

```javascript
var a = function(){
  var __tmp00 = []
  [0,1,3].map(function(v){
    __tmp00[v] = [2,6,4]
  })
  return __tmp00
}()
```

### EXAMPLE #3  (condensed object loading : linear-map)

```javascript
a => {
  [0, 1, 3] <= 1,
}
```

#### GENERATED JAVASCRIPT .. 

```javascript
var a = function(){
  var __tmp00 = []
  var __tmp01 = [1]
  [0,1,3].map(function(v,idx){
    if (__tmp01[idx]) {
      __tmp00[v] = __tmp01[idx]
    }
  })
  return __tmp00
}()
```

### EXAMPLE #4  (condensed object loading : linear-map)

```javascript
a => {
  [0, 1, 3] <= [2, 6, 4],
}
```

#### GENERATED JAVASCRIPT .. 

```javascript
var a = function(){
  var __tmp00 = []
  var __tmp01 = [2,6,4]
  [0,1,3].map(function(v,idx){
    if (__tmp01[idx]) {
      __tmp00[v] = __tmp01[idx]
    }
  })
  return __tmp00
}()
```
## INTERNAL OPERATOR OVERLOADING

### EXAMPLE #1

```javascript
a => {
  [0, 2, 3] <= [2, 6, 4],
}

b => {
  [2, 5, 8] <= [1, 9, 0],
}

console.log(a+b) // { 0:2, 2:7, 3:4, 5:9, 8:0 }
```

### EXAMPLE #2

```javascript
a => {
  [0,2,3] <= [2 6 4],
}

b => {
  [2,5,8] <= [1 9 0],
}

console.log(a+b) // { [0, 3] <= [2 6 4], [2] <= [2 6 4 1 9 0], [5, 8] <= [1 9 0]  }
```
