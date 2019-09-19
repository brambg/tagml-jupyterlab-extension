// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
import * as CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';

// "use strict";

CodeMirror.defineSimpleMode("tagml",{
  // The start state contains the rules that are initially used
  start: [
    // Comments
//    {regex: /\[\!/, token: 'comment', push: 'comments_block'},

//    // Open tags
//    {regex: /\[/, token: 'tag', push: 'open_tag'},
//
//    // Close tags
//    {regex: /\</, token: 'tag', push: 'close_tag'},


//    // Strings
//    {regex: /"/, token: 'string', push: 'string_regular'},
//    {regex: /`"/, token: 'string', push: 'string_compound'},
//
//    // Macros
//    {regex: /`/, token: 'variable-2', push: 'macro_local'},
//    {regex: /\$/, token: 'variable-2', push: 'macro_global'},

    // Decimal Numbers
    {regex: /\b[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+|\.)(?:[eE][+-]?[0-9]+)?[i]?\b/,
      token: 'number'},

    {regex: /-|==|<=|>=|<|>|&|!=/, token: 'operator'},
    {regex: /\*|\+|\^|\/|!|~|=|~=/, token: 'operator'},
  ],

  open_tag: [
  ],

  close_tag: [
  ],

  comments_block: [
    {regex: /\/\*/, token: 'comment', push: 'comments_block'},
    // this ends and restarts a comment block. but need to catch this so
    // that it doesn't start _another_ level of comment blocks
    {regex: /\*\/\*/, token: 'comment'},
    {regex: /(\*\/\s+\*(?!\/)[^\n]*)|(\*\/)/, token: 'comment', pop: true},
    // Match anything else as a character inside the comment
    {regex: /./, token: 'comment'},
  ],

  string_compound: [
    {regex: /`"/, token: 'string', push: 'string_compound'},
    {regex: /"'/, token: 'string', pop: true},
    {regex: /`/, token: 'variable-2', push: 'macro_local'},
    {regex: /\$/, token: 'variable-2', push: 'macro_global'},
    {regex: /./, token: 'string'}
  ],

  string_regular: [
    {regex: /"/, token: 'string', pop: true},
    {regex: /`/, token: 'variable-2', push: 'macro_local'},
    {regex: /\$/, token: 'variable-2', push: 'macro_global'},
    {regex: /./, token: 'string'}
  ],

  meta: {
    closeBrackets: {pairs: "{}''\"\""},
    dontIndentStates: ['start','comment'],
    electricInput: /^\s*\}$/,
    blockCommentStart: '[!',
    blockCommentEnd: '!]'
  }
});

CodeMirror.defineMIME('text/tagml', 'tagml');

// When I paste this file in Jupyter, it won't work unless I include the
// following code, but when I leave this as a separate module, it won't work and
// raises an error.
CodeMirror.modeInfo.push({
  ext: ['tagml', 'tag'],
  mime: "text/tagml",
  mode: 'tagml',
  name: 'TAGML'
});