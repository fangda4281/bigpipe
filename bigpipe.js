/*
*In bigpipe, javascript file will load at the last
*so, we need an array to buffer javascript file path
*/
var js_filepath_queue = Array();

/*
*load a css file
*/
function bp_loadCssFile(full_file_path){
  var bp_head = document.getElementsByTagName('head').item(0);
  var bp_style = document.createElement('link');
  bp_style.href = full_file_path;
  bp_style.rel = 'stylesheet';
  bp_style.type = 'text/css';
  bp_head.appendChild(bp_style);
} 

/*
*load a js file
*/  
function bp_loadJsFile(full_file_path){
  var bp_head = document.getElementsByTagName('head').item(0);
  var bp_script = document.createElement('script');
  bp_script.lang = 'javascript';
  bp_script.type = 'text/javascript';
  bp_script.src = full_file_path;
  bp_head.appendChild(bp_script);
}

/*
*load all javascript files
*/
function bp_loadAllJsFiles(){
  //global javascript filepath queue
  js_filepath_queue.reverse();
  while(js_filepath_queue.length != 0){
    js_file_path = js_filepath_queue.pop();
    bp_loadJsFile(js_file_path);
  }
}

/*
*print pagelet's json object
*object structure:
*EX:var json_obj = {
  'obj_id':'obj_id_content',
  'html_content':'html_content_content',
  'css_paths':[
    'css_path_1',
    'css_path_2',
    'css_path_3'
  ],
  'js_paths':[
    'js_path_1',
    'js_path_2',
    'js_path_3'
  ],
  'is_last_pagelet':false
}
Notice:the last pagelet is a *empty* pagelet, only 'is_last_pagelet' is false
*/
function bp_printPageletObj(pagelet_obj){
  console.log(pagelet_obj.obj_id);
  console.log(pagelet_obj.html_content);
  for(index in pagelet_obj.css_paths){
    console.log(pagelet_obj.css_paths[index]);
  }
  for(index in pagelet_obj.js_paths){
    console.log(pagelet_obj.js_paths[index]);
  }
}

//TODO:bp_dealNormalPageletObj()
function bp_dealNormalPageletObj(pagelet_obj){
  for(index in pagelet_obj.css_paths){
    var css_file_path = pagelet_obj.css_paths[index];
    bp_loadCssFile(css_file_path); 
  }
  
  var pagelet_id = pagelet_obj.obj_id;
  var pagelet_html_content = pagelet_obj.html_content;
  document.getElementById(pagelet_id).innerHTML = pagelet_html_content;
  
  for(index in pagelet_obj.js_paths){
    var js_file_path = pagelet_obj.js_paths[index];
    //bp_loadJsFile(js_file_path);
    //push js file path to queue
    js_filepath_queue.push(js_file_path);
  }
}

function bp_dealPageletObj(pagelet_obj){ 
  if(pagelet_obj.is_last_pagelet == false){
    bp_dealNormalPageletObj(pagelet_obj);
  }else{
    bp_loadAllJsFiles();
  }
}
