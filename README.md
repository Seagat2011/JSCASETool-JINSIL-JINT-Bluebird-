# JSCASETool-JINSIL-JINT-Bluebird-
HTML5/CSS3 inline javascript editor (fast)  Supports inline javascript, stacktracing, and inline macros

### WHY USE BLUEBIRD ?
 
- Bluebird allows javascript inlining, 
    allowing code to be instantiated as
    its conceived.  Bluebird requires no
    setup of objects, arrays, or functions, 
    or variables (its actually not allowed)
    
    Simply trace through the code as an
    object would and describe what 
    happens in every module, step-by-step,
    declaring variables and functions, as
    needed 

    Bluebird then converts the entire trace 
    to javascript
    
### RULES

- Bluebird considers ```[] === {}```
- Bluebird allows unique hasa attribs and vars to be fast-forwarded (```=>=>```)
- Bluebird maps all literals into vars
- Bluebird maps all vars and funcs into objs
- Bluebird maps all objs into larger encapsulating objs
- Bluebird exports all undefined, vars, literals, 
    & immediates into parameter-lists (ie. arity)
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
 
### GENERATED JAVASCRIPT ..

```javascript
  indent.push(obj) or indent["push"] (obj) 
```        

### EXAMPLE #2

```javascript
  indent <= callParentObj(obj)
```
  
### GENERATED JAVASCRIPT ..

```javascript
  var indent = callParentObj (obj)
```        

### EXAMPLE #3

```javascript
  indent <= archive => callParentObj(obj)
``` 
 
### GENERATED JAVASCRIPT ..

```javascript
  var indent = archive["callParentObj"] (obj)
```        

### EXAMPLE #4

```javascript
  gpi <= archive => godparent => indent <= w
``` 
 
### GENERATED JAVASCRIPT ..

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
 
### GENERATED JAVASCRIPT ..

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
 
### GENERATED JAVASCRIPT ..

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
 
### GENERATED JAVASCRIPT ..

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
    (!_){
        _ <= archive => w
        ( __ <= entity ) => [0] => push(['\nfunction _',w,'(',[],'){\n',[],'\n}\n_',w,'.prototype = new Object()\n',w,' = new _',w,'()'])
       _ => level <= __ => [0] => length-1
    }
    callstack <= updatecallstack( _,callstack,indent)
}
(indent<2) {
    (!_){
        _
        callstack <= updatecallstack(_,callstack,indent)
        __ => [gpi <= _ => godparent => indent <= callstack => [0] => indent] => [gpl <= _ => godparent => level <= callstack => [0] => level] => [gpc <= _ => godparent => codebody <= 5] => push([minor_tab+'this["',w,'"] => (',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    __ => [indent] => push([_ => parent => s_name <= callstack => [0] => s_name + '.',w,'(',[],')','\n'])
} 
(indent) {
    (!_){
        _
        callstack <= updatecallstack(_,callstack,indent)
        __ => [gpi] => [gpl] => [gpc] => unshift([minor_tab+'this["',w,'"] => (',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    __ => [gpi] => [gpl] <= set_gparent_codebody(_,__ => [gpi] => [gpl],w,[major_tab+'this.',w,'(',[],')','\n'],indent)
}
```
 
### GENERATED JAVASCRIPT ..

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
Parse
 find_global_axioms
 match_local_phrases
 generate_global_phrase
 split_local_phrase_obj
  replace_global_elements_with_delim_obj2
  replace_first_local_phrase_delim_obj2
  replace_remaining_delim_obj2
  replace_remaining_delim_obj2
Library
 Reload_local_vars
  serialize
Parse
 serializeFile
``` 
### GENERATED JAVASCRIPT ..

```javascript

function _Parse(){
  this["replace_remaining_delim_obj2"] = function(){

  }
  this["replace_first_local_phrase_delim_obj2"] = function(){

  }
  this["replace_global_elements_with_delim_obj2"] = function(){

  }
  this["find_global_axioms"] = function(){

  }
  this["match_local_phrases"] = function(){

  }
  this["generate_global_phrase"] = function(){

  }
  this["split_local_phrase_obj"] = function(){
    this.replace_global_elements_with_delim_obj2()
    this.replace_first_local_phrase_delim_obj2()
    this.replace_remaining_delim_obj2()

  }
  this["serializeFile"] = function(){

  }

}
_Parse.prototype = new Object()
Parse = new _Parse()
function _Library(){
  this["serialize"] = function(){

  }
  this["Reload_local_vars"] = function(){
    this.serialize()

  }

}
_Library.prototype = new Object()
Library = new _Library()

Parse.find_global_axioms()
Parse.match_local_phrases()
Parse.generate_global_phrase()
Parse.split_local_phrase_obj()
Library.Reload_local_vars()
Parse.serializeFile()
```
