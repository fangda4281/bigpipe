/*  
 * 读文件demo
*/
WScript.Echo("DEMO for Read File");
WScript.Echo("");

var fso = new ActiveXObject("Scripting.FileSystemObject");

var text = fso.OpenTextFile("testfile.txt"); //ForReading指只读

var line = null;

//AtEndOfLine 为TextStream属性
while(!text.AtEndOfLine){
  line = text.ReadLine();
  WScript.Echo(line);
}
WScript.Echo("");
WScript.Echo("end of while");
text.Close();

WScript.Echo( "\r\nPress Enter to exit");
WScript.StdIn.ReadLine();
