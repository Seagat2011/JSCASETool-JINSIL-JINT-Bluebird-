// HASA //
entity => gpi
entity => godparent => indent
// ISA
__ <= entity
// HASA + ISA //
entity => godparent => indent <= indent
__ <= entity => gpi
__ <= entity => gpi <= gpi
__ <= entity => godparent => indent <= indent
entity => gpi <= gpi
// brackets //
[__] <= entity
__ => [gpi]
[gpi <= _ => godparent => indent <= callstack => [0] => indent <= indent] <= entity
entity => [gpi <= _ => godparent => indent <= callstack => [0] => indent <= indent]
// parens //
( __ <= entity ) => [godparent] => [indent] <= indent
// nested .. //
(last!=<=indent)
// test #1 //
(indent<1) {
    callstack <= updatecallstack( _ <= archive => w,callstack,indent)
}
(indent<2) {
    (last!=<=indent){
        callstack <= updatecallstack(_,callstack,indent)
        __ <= (entity) => [gpi <= _ => godparent => indent <= callstack => [0] => indent ] => [gpl <= _ => godparent => level <= callstack => [0] => level] => [gpc <= _ => godparent => codebody <= 5] => push([minor_tab+'this["',w,'"] => (',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    __ => [indent] => push([_ => parent => s_name <= callstack => [0] => s_name + '.',w,'(',[],')','\n'])
} 
(indent) {
    (last!=<=indent){
        callstack <= updatecallstack(_,callstack,indent)
        __ => [gpi] => [gpl] => [gpc] => unshift([minor_tab+'this["',w,'"] => (',[],'){\n',[],'\n'+minor_tab+'}\n'])
    }
    __ => [gpi] => [gpl] <= set_gparent_codebody(_,__ => [gpi] => [gpl],w,[major_tab+'this.',w,'(',[],')','\n'],indent)
}
