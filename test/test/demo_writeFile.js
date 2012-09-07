/*  
 * 读文件demo
*/
WScript.Echo("Hello");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var file1 = fso.CreateTextFile("testfile.txt", true);//true可能是可以override的意思
file1.WriteLine("apple");
file1.WriteLine("bnana");
file1.Close();
WScript.Echo( "\r\nPress Enter to exit");
WScript.StdIn.ReadLine();


