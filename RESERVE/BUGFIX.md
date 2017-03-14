
SYMP: srcStackTrace changes fails to update (eg listView)
SOLU: intf["__main__"] always does "force" update
      "__main__": function(params,force) => "__main__": function(params)

SYMP: code not saved in modules
SOLU: var buffer = params.replace(/^\s+/g, '').split(/\n+/gm) => var buffer = params.split(/\n+/gm).map(function(v){ var u = v.replace(/^\s+/g, '') .. 

SYMP: BLAZE_EDITOR.getLine returns an extra newline
SOLU: o.replace(/<\s*\\?\s*br\s*>/gmi, '\n')  => o.innerHTML.replace(/<\s*\\?\s*br\s*>$/i, '').replace(/<\s*\\?\s*br\s*>/gmi, '\n') // replace final newline //

SYMP: intf["callstack"].REGEX[g_reModule]() undefined
SOLU: intf["callstack"].REGEX = [] => intf["callstack"].REGEX.length = 0