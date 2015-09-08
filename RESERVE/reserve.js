
function operatorNestedSQbrace(me,i){
    var stacktally = 0
    var lb = '['
    var rb = ']'
    var I = me.length
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var status = false
    if(me[i++]==lb){
        stacktally++
        while( stacktally && i<I ){
            if(me[i]==lb){
                stacktally++
            } else
            if(me[i]==rb){
                stacktally--
            } else
            if(
            me[i]==hasa ||
            me[i]==ffast ||
            me[i]==isa
            ){
                status = true
                break
            } 
            i++
        }
    }
    return status
}
function peekNext(me,i,pttn,r){
    var a = 1
    if(r){
        var I =-1
        while(i>I && me[i] && a){
            if(me[i]==pttn[0]){
                a++
            } else
            if(me[i]==pttn[1]){
                a--
                if(!a){
                    break
                }
            }
            i--
        }
    } else {
        var I = me.length
        while(i<I && me[i] && a){
            if(me[i]==pttn[0]){
                a++
            } else
            if(me[i]==pttn[1]){
                a--
                if(!a){
                    break
                }
            }
            i++
        }
    }
    return i
}
function peekSymbol(me,i,cnt,r){
    var a = []
    if(r){
        var I =-1
        var u = 0
        while(u<cnt && i>I){
            while(i>I && ( i in me ) && me[i].match(/^[\s\n]*$/)){
                i--
            }
            if(me[i]){
                a.push([me[i],i])
            }
            u++
            i--
        }
    } else {
        var I = me.length
        var u = 0
        while(u<cnt && i<I){
            while(i<I && (i in me) && me[i].match(/^[\s\n]*$/)){
                i++
            }
            if(me[i]){
                a.push([me[i],i])
            }
            i++
            u++
        }
    }
    return a
}
//
'[':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        (rhs[1][data]==']') &&
        (rhs[2][data]==OPS.isa)
        ){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = '['+rhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')+']'
            /*
            if(localstack[row][row_lhs]==''){
                localstack[row][row_lhs] += w
            } else {
                localstack.push([w,''])
            }
            */
            me[i] = ''
            //me[rhs[1][index]] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = w
        } else {
            this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        }
        return localstack
        },
//
bbmodules.map(function(u){
        var bblocals = [['',''],]
        /*
        u = u
            .replace(/(\n)/gm,'/n')
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
            .split(/\s+/)
        */
        return bbtojs([u,null,bblocals])
        //var ar = bbtojs([u,bbglobals,bblocals])
        //bbglobals = ar[1]
        //bblocals = ar[2]
        //ar[0] = findlocals(ar[0],bblocals)
        //return ar[0]
    })
//
function peekNext(me,i,pttn,r){
    var a = 1
    if(r){
        var I =-1
        while(i>I && me[i] && a){
            if(escape(me[i]).match(escape(pttn[0]))){
                a++
            } else
            if(escape(me[i]).match(escape(pttn[1]))){
                a--
                if(!a){
                    break
                }
            }
            i--
        }
    } else {
        var I = me.length
        while(i<I && me[i] && a){
            if(escape(me[i]).match(escape(pttn[0]))){
                a++
            } else
            if(escape(me[i]).match(escape(pttn[1]))){
                a--
                if(!a){
                    break
                }
            }
            i++
        }
    }
    return i
}
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[1] && rhs[1][data]==OPS.hasa){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data]
            if(localstack[row][row_lhs] == ''){
                localstack[row][row_lhs] += w
            } else {
                localstack.push([w,''])
            }
        } else {
            if(rhs[0][data].match(/\{/)){
                localstack = buildscope(this,me,i,localstack,'{}')
            } else
            if(rhs[0][data].match(/\(/)){
                localstack = buildscope(this,me,i,localstack,'()')
            } else
            if(rhs[0][data].match(/\[/)){
                localstack = buildscope(this,me,i,localstack,'[]')
            } else {
                var row = localstack.length-1
                var row_lhs = 0
                var row_rhs = 1
                var w = lhs[0][data]
                var v = rhs[0][data]
                if(localstack[row][row_lhs] == ''){
                    localstack[row][row_lhs] += v
                } else {
                    localstack.push([w,v])
                }
                if(lhs[2] && lhs[1] && lhs[1][data] == OPS.isa){
                    localstack.push([lhs[2][data],w])
                    me[i] = ''
                    me[rhs[0][index]] = ''
                } else {
                    me[i] = '='
                }
            }
        }
    
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(this,me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(this,me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')
            if(localstack[row][row_lhs]==''){
                localstack[row][row_lhs] = w
            }
            me[lhs[0][index]] = ''
            me[i] = ''
            localstack = buildscope(this,me,i,localstack,'[]')
        } else {
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data].replace(/[^\[\]\w+\d+\"\']+/gm,'')
            var lbrack = '["'
            var rbrack = '"]'
            if(this["6B189E262D7D28EF1FBF946FDFF08716"].length){
                lbrack = lbrack.replace(/\"/,'')
                rbrack = rbrack.replace(/\"/,'')
            }
            var v = lbrack+rhs[0][data].replace(/\W+/gm,'')+rbrack
            me[i] = ''
            me[lhs[0][index]] = ''
            /*
            if(lhs[1] && lhs[1][data] && lhs[1][data]==OPS.hasa){
                w = '["'+w+'"]'
            }
            */
            var u = w + v
            if(localstack[row][row_rhs] == ''){
                localstack[row][row_rhs] += u
            } else {
                localstack[row][row_rhs] += v
            }
            //if(rhs[1] && rhs[1][data] && rhs[1][data]!=OPS.isa){
                //me[rhs[0][index]] = u
            //}
            if(
            (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data]==OPS.isa) &&
            (!rhs[1] || (rhs[1] && rhs[1][data] && rhs[1][data]!=OPS.hasa && rhs[1][data]!=OPS.isa))
            ){
                me[lhs[1][index]] = ''
                me[rhs[0][index]] = ''
                //localstack[row][row_lhs] += lhs[2][data]
            } else
            if(
            (lhs[2] && lhs[1] && lhs[1][data] && lhs[1][data]==OPS.isa) &&
            (rhs[1] && rhs[1][data] && rhs[1][data]==OPS.isa)
            ){
                localstack.push([u,rhs[2][data]])
                me[lhs[1][index]] = ''
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = ''
                var next = peekSymbol(me,rhs[2][index]+1,2)
                if(!next[0] || (next[0] && next[0][data]!=OPS.hasa && next[0][data]!=OPS.isa)){
                    me[rhs[2][index]] = ''
                    localstack.push([rhs[2][data],'__local__'])
                }
            } else {
                me[rhs[0][index]] = u
            }
        }
        //this["B2FAE65A017B97031EFB1C6DB2AE3658"]("9ACC23D8765224A84121BC737E6C1836", i) // ffast //
        return localstack
            
        },
    '[':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("6B189E262D7D28EF1FBF946FDFF08716", i) // lbrack //
        return localstack
        },
    ']':function(me,i,localstack){
        //this["B2FAE65A017B97031EFB1C6DB2AE3658"]("B89B9AC07070CF76C97B285EC04D982C", i) // rbrack //
        if(this["6B189E262D7D28EF1FBF946FDFF08716"].length){
            this["6B189E262D7D28EF1FBF946FDFF08716"].pop()
        }
        return localstack
        },
    '(':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("152370721853AF95444F2F05AB29D4CC", i) // lparen //
        return localstack
        },
    ')':function(me,i,localstack){
        //this["B2FAE65A017B97031EFB1C6DB2AE3658"]("EC9962F64DBBC61B566D4D3478A4902A", i) // rparen //
        if(this["152370721853AF95444F2F05AB29D4CC"].length){
            this["152370721853AF95444F2F05AB29D4CC"].pop()
        }
        return localstack
        },
        /*
    ',':function(me,i,localstack){
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("B6D00DC1BA038E5901CD6C06B2DAA192", i) // comma //
        return localstack
        },
        */
    "7714F8C839428D0E184EAF11464D3A6E":[['','']], // md5(operationstack) //
    "6B189E262D7D28EF1FBF946FDFF08716":[], // md5(lbrack) //
    "B89B9AC07070CF76C97B285EC04D982C":[], // md5(rbrack) //
    "152370721853AF95444F2F05AB29D4CC":[], // md5(lparen) //
    "EC9962F64DBBC61B566D4D3478A4902A":[], // md5(rparen) //
    "B6D00DC1BA038E5901CD6C06B2DAA192":[], // md5(comma) //
    "9ACC23D8765224A84121BC737E6C1836":[], // md5(ffast) //
    "165A1761634DB1E9BD304EA6F3FFCF2B":[], // md5(isa) //
    "B2FAE65A017B97031EFB1C6DB2AE3658":function(v,i){ // md5(addtostack) //
        this[v].unshift(i)
        /*
        while(this[v].length>9){
            this[v].pop()
        }
        */
        },
}
//
'<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            if(!rhs[1][data].match(OPS.hasa)){
                me[i] = '='
            } else {
                var w = lhs[0][data].replace(/\W+/gm,'')
                localstack.push([w,''])
                me[i] = ''
            }
        } else
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+\W{1,3}[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[0][data].replace(/\W+/gm,'')
            me[lhs[0][index]]+=me[rhs[0][index]]
            me[i] = ''
            me[rhs[0][index]] = ''
            localstack.push([w,v])
            if(
            rhs[1][data].match(/\)/) &&
            rhs[2][data].match(/\{/)
            ){
                var x = w+'='+v+'\n'
                var f = rhs[2][data].match(/^\{[\n\s]*/)[0]
                f = f.replace(/\w/,x)
                me[rhs[2][index]] = me[rhs[2][index]].replace(/^[\n\s]*(\{)/,f)
            }
        } else 
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\s\n]*\(/) &&
       !rhs[1][data].match(/,/) &&
        rhs[2][data].match(/^[\s\n]*\)/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[1][data].replace(/\W+/gm,'')
            me[i] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = ''
            me[rhs[2][index]] = ''
            localstack.push([w,v])
        } 
        this["B2FAE65A017B97031EFB1C6DB2AE3658"]("165A1761634DB1E9BD304EA6F3FFCF2B", i) // isa //
        return localstack
        },
//
//.replace(/(<=|=>)/gm,'##$1##')
//.split(/#+/)
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        me[i] = ''
        if(rhs[0][data].match(/^\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/^\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/^\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
            me[lhs[0][index]] = ''
            localstack.push([lhs[0][data],rhs[0][data]])
            if(rhs[1][data]!=OPS.hasa){
                me[rhs[0][index]] = ''
            }
        }
    
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        me[i] = ''
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
            me[lhs[0][index]] = ''
            localstack.push([lhs[0][data],rhs[0][data]])
            if(
            (rhs[1][data]!=OPS.isa) &&
            (rhs[1][data]!=OPS.hasa)
            ){
                me[rhs[0][index]] = ''
            }
        
        }
    
        return localstack
            
        },
}
//
            //.replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,'##$1##')
            //.replace(/(\w+|\d+|\[|\]|\(|\)|\,|<=|=>)/gm,'  $1  ')
            //.split(/\s+/)
            //.replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
//
    '=>=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
        
        }
    
        return localstack
            
        },
//
bbmodules.map(function(u){
        u = u
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,'##$1##')
            //.replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,' $1 ')
            //.replace(/\s+/gm,' ')
            //.split(/\s+/)
            .split(/\#+/)
        var ar = bbtojs([u,bbglobals,bblocals])
        bbglobals = ar[1]
        bblocals = ar[2]
        ar[0] = findlocals(ar[0],bblocals)
        return ar[0]
    })
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        var N = xfe.length-1
        if(xfe[N]){
            //xfe[N][0] += lhs[0][data]
            if(rhs[1][data]!=OPS.hasa){
                xfe[N][1] += rhs[0][data]
            }
        }
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        var N = xfe.length-1
        if(xfe[N]){
            xfe[N][1] += rhs[0][data]
            if(lhs[1][data]==OPS.isa){
                xfe.push([rhs[0][data],''])
            }
        }
    
        return localstack
            
        },
    '=>=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
    
        return localstack
            
        },
}
//
var operator = {
    '<=':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            if(!rhs[1][data].match(OPS.hasa)){
                me[i] = '='
            } else {
                var w = lhs[0][data].replace(/\W+/gm,'')
                localstack.push([w,''])
                me[i] = ''
            }
        } else
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+\W{1,3}[\s\n]*$/) &&
        rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[0][data].replace(/\W+/gm,'')
            me[lhs[0][index]]+=me[rhs[0][index]]
            me[i] = ''
            me[rhs[0][index]] = ''
            localstack.push([w,v])
            if(
            rhs[1][data].match(/\)/) &&
            rhs[2][data].match(/\{/)
            ){
                var x = w+'='+v+'\n'
                var f = rhs[2][data].match(/^\{[\n\s]*\w/)[0]
                f = f.replace(/\w/,x)
                me[rhs[2][index]] = me[rhs[2][index]].replace(/^[\n\s]*(\{)/,f)
            }
        } else 
        if(
        lhs[0][data] &&
        rhs[0][data] &&
        rhs[1][data] &&
        rhs[2][data] &&
        lhs[0][data].match(/\w+[\s\n]*$/) &&
        rhs[0][data].match(/^[\s\n]*\(/) &&
       !rhs[1][data].match(/,/) &&
        rhs[2][data].match(/^[\s\n]*\)/)
        ){
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = rhs[1][data].replace(/\W+/gm,'')
            me[i] = ''
            me[rhs[0][index]] = ''
            me[rhs[1][index]] = ''
            me[rhs[2][index]] = ''
            localstack.push([w,v])
        } 
        return localstack
        },
    '=>':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        if(rhs[0][data].match(/\{/)){
            localstack = buildscope(me,i,localstack,'{}')
        } else
        if(rhs[0][data].match(/\(/)){
            localstack = buildscope(me,i,localstack,'()')
        } else
        if(rhs[0][data].match(/\[/)){
            localstack = buildscope(me,i,localstack,'[]')
        } else {
            var row = localstack.length-1
            var row_lhs = 0
            var row_rhs = 1
            var w = lhs[0][data].replace(/\W+/gm,'')
            var v = '['+rhs[0][data].replace(/\W+/gm,'')+']'
            me[i] = ''
            me[lhs[0][index]] = ''
            if(lhs[1][data]==OPS.hasa){
                w = '['+w+']'
            }
            localstack[row][row_rhs] += w + v
            if(rhs[1][data]!=OPS.isa){
                me[rhs[0][index]] = ''
            }
        }
        return localstack
            
        },
    '=>=>':function(me,i,localstack){
        return localstack
            
        },
}
//
    /*
    '[':function(me,i,localstack){
        var data = 0
        var index = 1
        var lhs = peekSymbol(me,i-1,3,'rev')
        var rhs = peekSymbol(me,i+1,3)
        var row = localstack.length-1
        var row_lhs = 0
        var row_rhs = 1
        if(lhs[0][data]==isa){
            var w = lhs[1][data].replace(/\W+/gm,'')
            localstack.push([w,''])
        }
        return localstack
            
        },
    ']':function(me,i,localstack){
        return localstack
    
        },
    '(':function(me,i,localstack){
        return localstack
            
        },
    ')':function(me,i,localstack){
        return localstack
            
        },
    ',':function(me,i,localstack){
        return localstack
            
        },
    */
//
function buildscope(me,i,r,l,localstack){
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = l
    var result_rhs = []
    var data = 0
    var index = 1
    var isaFirstCall = false
    //for(var i=i;i<I;i+=2){
    while(i<I){
        var rhs = peekSymbol(me,i,3)
        if(
        ((me[rhs[0][index]]==hasa) || (me[rhs[0][index]]==ffast)) &&
        me[rhs[1][index]].replace(/\W+/gm,'').match(/^[\n\s]*\[/) &&
        me[rhs[2][index]].replace(/\W+/gm,'').match(/^[\n\s]*\]/) 
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            if(isaFirstCall){
                result_rhs += '["'+w+'"]'
            } else {
                result += '["'+w+'"]'
            }
            me[rhs[0][index]] = me[rhs[1][index]] = me[rhs[2][index]] = ''
            i+=3
        } else
        if(
        ((me[rhs[0][index]]==hasa) || (me[rhs[0][index]]==ffast)) &&
        me[rhs[1][index]].replace(/\W+/gm,'').match(/[\w\d]+/)
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            if(isaFirstCall){
                result_rhs += '["'+w+'"]'
            } else {
                result += '["'+w+'"]'
            }
            me[rhs[0][index]] = ''
            if(!rhs[2][data].match(isa)){
                me[rhs[1][index]] = ''
            } else {
                i--
            }
            i+=2
        } else
        if(
        (me[rhs[0][index]].replace(/\W+/gm,'').match(/[\w\d]+/)) &&
        (me[rhs[1][index]]==isa)
        ){
            if(isaFirstCall==false){
                isaFirstCall = true
                result_rhs = ''
                me[rhs[1][index]] = ''
                result_rhs += rhs[2][data].replace(/\W+/gm,'')
                me[rhs[2][index]] = ''
                i+=3
            } else {
                localstack.push([result,result_rhs])
                result_rhs = rhs[0][data]
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = ''
                i+=2
            }
        } else {
            break
        }
    }
    if(isaFirstCall){
        localstack.push([result,result_rhs])
    } else {
        localstack.push([r,result])
    }
    return localstack
}
//
a[0].map(function(u,i,me){
        switch(u){
        case isa:
            var data = 0
            var index = 1
            var lhs = peekSymbol(me,i-1,3,'rev')
            var rhs = peekSymbol(me,i+1,3)
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            rhs[1][data] &&
            lhs[0][data].match(/\w+[\s\n]*$/) &&
            rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
            ){
                if(!rhs[1][data].match(hasa)){
                    me[i] = '='
                } else {
                    var w = me[lhs[0][index]].replace(/\W+/gm,'')
                    var v = me[rhs[0][index]].replace(/\W+/gm,'')
                    a[bblocals] = buildscope(me,rhs[1][index],w,v,a[bblocals])
                    me[i] = ''
                    me[rhs[0][index]] = ''
                }
            } else
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            rhs[1][data] &&
            rhs[2][data] &&
            lhs[0][data].match(/\w+\W{1,3}[\s\n]*$/) &&
            rhs[0][data].match(/^[\n\s]*[\w+\d+]/)
            ){
                var w = lhs[0][data].replace(/\W+/gm,'')
                var v = rhs[0][data].replace(/\W+/gm,'')
                me[lhs[0][index]]+=me[rhs[0][index]]
                me[i] = ''
                me[rhs[0][index]] = ''
                a[bblocals].push([w,v])
                if(
                rhs[1][data].match(/\)/) &&
                rhs[2][data].match(/\{/)
                ){
                    var x = w+'='+v+'\n'
                    var f = rhs[2][data].match(/^\{[\n\s]*\w/)[0]
                    f = f.replace(/\w/,x)
                    me[rhs[2][index]] = me[rhs[2][index]].replace(/^[\n\s]*(\{)/,f)
                }
            } else 
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            rhs[1][data] &&
            rhs[2][data] &&
            lhs[0][data].match(/\w+[\s\n]*$/) &&
            rhs[0][data].match(/^[\s\n]*\(/) &&
           !rhs[1][data].match(/,/) &&
            rhs[2][data].match(/^[\s\n]*\)/)
            ){
                var w = lhs[0][data].replace(/\W+/gm,'')
                var v = rhs[1][data].replace(/\W+/gm,'')
                me[i] = ''
                me[rhs[0][index]] = ''
                me[rhs[1][index]] = ''
                me[rhs[2][index]] = ''
                a[bblocals].push([w,v])
            } 
            
            break
        case hasa:
            var data = 0
            var index = 1
            var lhs = peekSymbol(me,i-1,3,'rev')
            var rhs = peekSymbol(me,i+1,3)
            if(
            lhs[0][data] &&
            rhs[0][data] &&
            lhs[0][data].match(/\w+[\s\n]*$/) &&
            rhs[0][data].match(/^[\s\n]*\[/)
            ){
                var w = lhs[0][data].replace(/\W+/gm,'')
                var v = rhs[1][data].replace(/\W+/gm,'')
                if(operatorNestedSQbrace(me,rhs[0][index])){
                    a[bblocals] = buildscope(me,rhs[1][index],w,v,a[bblocals])
                } else {
                    
                    //a[bblocals] = buildHASAscope(me,w,rhs[0][index],a[bblocals])
                }
            }
            
            break
        case ffast:
            
            break
        default:
            break
        }
        return u
    })
//

function matchCURLbrace(){

}
function buildISAscope(){

}
function buildHASAscope(){

}
function buildFFASTscope(){

}
//
            if(isaFirstCall==false){
                isaFirstCall = true
                result_rhs = ''
                me[rhs[1][index]] = ''
                result_rhs += rhs[2][data].replace(/\W+/gm,'')
                me[rhs[2][index]] = ''
                i+=3
            } else {
                localstack.push([result,result_rhs])
                result_rhs = rhs[0][data]
                i++
            }
            //var w = rhs[0][data].replace(/\W+/gm,'')
            //result_rhs += w
            //me[rhs[0][index]] = ''
            //if(!rhs[2][data].match(isa)){
            //    me[rhs[1][index]] = ''
            //}
            //me[rhs[2][index]] = ''
            //result_rhs += rhs[2][data].replace(/\W+/gm,'')
            //i+=3//i++//i+=2
//
function buildISAscope(me,i,r,l,localstack){
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = l
    var data = 0
    var index = 1
    //for(var i=i;i<I;i+=2){
    //while(i<I){
        //var lhs = peekSymbol(me,i-1,3)
        var rhs = peekSymbol(me,i+1,1)
        if(
        (me[rhs[0][index]]==isa) &&
        me[rhs[1][index]].replace(/\W+/gm,'').match(/[\w\d]+/)
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            result += '["'+w+'"]'
            me[rhs[0][index]] = ''
            if(!rhs[2][data].match(hasa)){
                me[rhs[1][index]] = ''
            }
            //i+=2
        } /*else {
            break
        }*/
    //}
    localstack.push([r,result])
    return localstack
}
function buildscope(){

}
//
function matchSQbrace(me,lhs,i,localstack){
    var stacktally = 0
    var lb = '['
    var rb = ']'
    var I = me.length
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    if(me[i++]==lb){
        stacktally++
        while( stacktally && i<I ){
            if(me[i]==lb){
                stacktally++
            } else
            if(me[i]==rb){
                stacktally--
            } else
            if(me[i]==hasa || me[i]==ffast){
                var data = 0
                var index = 1
                var lhs = peekSymbol(me,i-1,3,'rev')
                var rhs = peekSymbol(me,i+1,3)
                var w = lhs[0][data]
                var s = rhs[0][data]
                //localstack = buildISAscope(me,rhs[1][index],w,s,localstack)
                //localstack = buildHASAscope(me,rhs[1][index],w,s,localstack)
                //v = buildHASAscope(me,rhs[1][index],w,s,localstack)
                //localstack.push([w,s+v])
                //me[i] = ''
               // me[rhs[1][index]] = ''
            } else 
            if(me[i]==isa){
            
            }
            i++
        }
    }
    return localstack
}
//
a.match(/\w+[\n\s]*<=[\n\s]*[\w+\d+]+/gm) // ["callstack <= updatecallstack", "_ <= archive"]
a.match(/(\[?\w+\]?[\n\s]*=>[\n\s]*\[?[\w+\d+]+\]?)+/gm) // ["__ => [gpi]", "[gpl] => [gpc]"]
//
function buildISAscope(me,i,r,l,localstack){
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = l
    var data = 0
    var index = 1
    //for(var i=i;i<I;i+=2){
    while(i<I){
        var lhs = peekSymbol(me,i-1,3)
        var rhs = peekSymbol(me,i+1,3)
        if(
        ((me[rhs[0][index]]==isa) &&
        (me[rhs[1][index]].replace(/\W+/gm,'').match(/[\w\d]+/))
        ){
            var w = rhs[1][data].replace(/\W+/gm,'')
            result += '["'+w+'"]'
            me[rhs[0][index]] = ''
            if(!rhs[2][data].match(isa)){
                me[rhs[1][index]] = ''
            }
            i+=2
        } else {
            break
        }
    }
    localstack.push([r,result])
    return localstack
}
//
    bbmodules.map(function(u){
        u = u
            .replace(/(\[|\]|\(|\)|\,|<=|=>)/gm,'##$1##')
            //.replace(/(<=|=>)+/gm,'##$1##')
            //.replace(/^\s*\(\s*(\w+|\d+)\s*((\W{1,3})\s*(\w+|\d+))?\s*\)/gm,'if($1$2)')
            //.replace(/([\[\]\(\)\,\{\}]|<=|=>)+/gm,'##$1##')
            //.Repack()
            .split(/#+/)
        var ar = bbtojs([u,bbglobals,bblocals])
        bbglobals = ar[1]
        bblocals = ar[2]
        //ar[0] = ar[0].join('')
        ar[0] = findlocals(ar[0],bblocals)
        return ar[0]
    })
//
var w = me[i-1].replace(/\W+/gm,'') // /(.*)\w+(.*)$/
//
function buildhasascope(me,i){
    var hasa = '=>'
    var ffast = '=>=>'
    var I = me.length
    var result = ''
    for(var i=i;i<I;I+2){
        if(
            ((me[i]==hasa) || (me[i]==ffast)) &&
            (me[i+1].match(/,/))
        ){
            var w = me[i+1].split(/,/)
            result += '['+w[0].replace(/\s+/g,'')+']'
            me[i] = ''
            me[i+1] = me[i+1].replace(w[0],'')
            break
        } else {
            break
        }
    }
    return result
}
//
function bbtojs(a){
    var bbglobals = 1
    var bblocals = 2
    //var s = ''
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    a[0].map(function(u,i,me){
        switch(u){
        case isa:
            if(
            me[i-1] && 
            me[i+1] && 
            me[i-1].match(/\([^\)]+$/) &&
            me[i+1].match(/^[^\)]+$/)
            //((me[i+2]==hasa)||(me[i+2]==ffast))
            ){
                var w = me[i-1].split(/\(/g)
                var v = me[i+1] + buildhasascope(me,i+2)
                a[bblocals].push([w[1],v])
                me[i-1] = w[0] + '(' + v
                me[i] = ''
                me[i+1] = ''
            } else
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\(\s*\w+\s*\W{1,3}\s*$/) &&
            //me[i-1].match(/\w+\W{1,3}$/) //&&
            me[i+1].match(/^\s*\w+|\d+\s*\)/)
            ){
                me[i] = ''
                var v = me[i-1].split(/\(/g)
                var w = me[i+1].split(/\)/g)
                me[i-1] += w[0]+')\n'+v[v.length-1].replace(/\W+/,'')+'='+w[0]
                me[i+1] = me[i+1].replace(w[0],'')
                a[bblocals].push([w[0]])
            } else 
            if(
            me[i-1] &&
            me[i+1] &&
            //me[i-1].match(/\)\n*\s*\w+$/) &&
            //me[i-1].match(/.*\)\n*\s*\w+$/) //&&
            me[i-1].match(/\w+\s*$/) &&
            me[i+1].match(/^\s*\n*\(\s*\w+|\d+\s*\)/)
            //me[i-1].match(/\)\n*\s*\w+\s*$/) 
            ){
                var v = me[i-1].split(/\)/)
                var w = me[i+1].match(/\((\w+|\d+)\)/)
                v[1] = v[1].replace(/\W+/g,'')
                me[i-1] = me[i-1].replace(v[1],'')
                me[i] = ''
                me[i+1] = v[1]
                a[bblocals].push([v[1],w[1]])
            } else {
                me[i] = '='
            }
            break
        case hasa:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        case ffast:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        default:
            break
        }
        return u
    })
    return a.join('')
}
//
a[0].map(function(u,i,me){
        switch(u){
        case isa:
            if(
            me[i-1] && 
            me[i+1] && 
            me[i-1].match(/\([^\)]+$/) &&
            me[i+1].match(/^[^\)]+$/)
            //((me[i+2]==hasa)||(me[i+2]==ffast))
            ){
                var w = me[i-1].split(/\(/g)
                var v = me[i+1] + buildhasascope(me,i+2)
                a[bblocals].push([w[1],v])
                me[i-1] = w[0] + '(' + v
                me[i] = ''
                me[i+1] = ''
            } else
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\(\s*\w+\s*\W{1,3}\s*$/) &&
            //me[i-1].match(/\w+\W{1,3}$/) //&&
            me[i+1].match(/^\s*\w+|\d+\s*\)/)
            ){
                me[i] = ''
                var v = me[i-1].split(/\(/g)
                var w = me[i+1].split(/\)/g)
                me[i-1] += w[0]+')\n'+v[v.length-1].replace(/\W+/,'')+'='+w[0]
                me[i+1] = me[i+1].replace(w[0],'')
                a[bblocals].push([w[0]])
            } else 
            if(
            me[i-1] &&
            me[i+1] &&
            //me[i-1].match(/\)\n*\s*\w+$/) &&
            //me[i-1].match(/.*\)\n*\s*\w+$/) //&&
            me[i-1].match(/\w+\s*$/) &&
            me[i+1].match(/^\s*\n*\(\s*\w+|\d+\s*\)/)
            //me[i-1].match(/\)\n*\s*\w+\s*$/) 
            ){
                var v = me[i-1].split(/\)/)
                var w = me[i+1].match(/\((\w+|\d+)\)/)
                v[1] = v[1].replace(/\W+/g,'')
                me[i-1] = me[i-1].replace(v[1],'')
                me[i] = ''
                me[i+1] = v[1]
                a[bblocals].push([v[1],w[1]])
            } else {
                me[i] = '='
            }
            break
        case hasa:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        case ffast:
            if(
            me[i-1] &&
            me[i+1] &&
            me[i-1].match(/\([\w+\d+]$/) &&
            me[i+1].match(/^[\w+\d+]\)/)
            ){
                
            }
            break
        default:
            break
        }
        return u
    })
//
function buildhasascope(me,i){
    var hasa = '=>'
    var ffast = '=>=>'
    //var base = i
    var I = me.length
    var result = ''
    for(var i=i;i<I;I+2){
        if(
            ((me[i]==hasa) || (me[i]==ffast)) &&
            (me[i+1].match(/,/))
        ){
            var w = me[i+1].split(/,/)
            result += '['+w[0].replace(/\s+/g,'')+']'
            //me[i] = ''
            //me[i+1] = ''
            me[i+1] = me[i+1].replace(w[0],'')
            /*
            if(i!=base){
                
            }
            */
            break
        } else {
            break
        }
    }
    return result
}
//
function bbtojs(a){
    var bbglobals = 1
    var bblocals = 2
    var s = ''
    var isa = '<='
    var hasa = '=>'
    var ffast = '=>=>'
    a[0].map(function(u,i,me){
        /*
        if(me[i+1] && (me[i+1] == isa)){
            s += u + '=' + me[i+2]
        }
        */
        if((u==isa) && me[i-1] && me[i-1].match(/\([^\)]+$/)){
            var w = me[i-1].split(/\(/)
            var v = me[i+1] + buildhasascope(me,i+2)
            a[bblocals].push([w[1],v])
            me[i-1] = w[0] + '(' + v
            me[i] = ''
            me[i+1] = ''
        } else
        if((u==isa)){
            me[i] = '='
        }
        return u
    })
    return a.join('')
}