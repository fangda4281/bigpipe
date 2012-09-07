/* Page Check Javascript 
 * For Firefox 3.6 
*/
var fso = new ActiveXObject("Scripting.FileSystemObject");
var file_global = fso.CreateTextFile("global.log", true);
var file_summary = fso.CreateTextFile("summary.log", true);
var file_time = fso.CreateTextFile("time.log", true);

WScript.Echo("\nEnter the URL of the page to check (press enter for www.baidu.com):\n");
var url = WScript.StdIn.ReadLine();//windows内部对象, 可能返回一个string

if ( url.length == 0 )
	//url = "www.baidu.com";
    url = "http://lbsnss.sinaapp.com/lbsns/index.php/nor_app/";
    //url = "http://lbsnss.sinaapp.com/lbsns/index.php/bp_app/";

WScript.Echo("\nChecking " + url + "...\n");

// Create a new instance of HttpWatch in Firefox
var control = new ActiveXObject('HttpWatch.Controller');

for(var index=0; index < 1;index++){

var plugin = control.Firefox.New();

// Start Recording HTTP traffic
plugin.Log.EnableFilter(false);
plugin.Record();

// Goto to the URL and wait for the page to be loaded
plugin.GotoURL(url);
control.Wait(plugin, -1);//Wait(plugin, myTimeOutValue), -1 means infinite time

// Stop recording HTTP
plugin.Stop();
			
if ( plugin.Log.Pages.Count != 0 )
{			
    // Display summary statistics for page
    var summary = plugin.Log.Pages(0).Entries.Summary;
    //for Render Start, HTTPLoad, PageLoad, DOMLoad
    var pageEvents = plugin.Log.Pages(0).Events;
    
    //Summary
    /*
    WScript.Echo("Index:"+index);
    WScript.Echo("Total time to load page (secs):      " + summary.Time);
    WScript.Echo("Number of bytes received on network: " + summary.BytesReceived);
    */
    file_global.WriteLine(""+index+" "+summary.Time+" "+summary.BytesReceived);
    
    //Page Summary
    /*
    WScript.Echo("TIme to DOM Load:                    "+pageEvents.DOMLoad.Value);
    WScript.Echo("Time to Load HTTP:                   "+pageEvents.HTTPLoad.Value);
    WScript.Echo("Time to Load Page:                   "+pageEvents.PageLoad.Value);
    WScript.Echo("Time to Sart Render:                 "+pageEvents.RenderStart.Value);
    */
    file_summary.WriteLine(""+pageEvents.DOMLoad.Value+" "
                            +pageEvents.HTTPLoad.Value+" "
                            +pageEvents.PageLoad.Value+" "
                            +pageEvents.RenderStart.Value);

    //Timings
    /*
    WScript.Echo("Time to be blocked:                  " + summary.TimingSummaries.Blocked.Total);
    WScript.Echo("Time to read cache:                  " + summary.TimingSummaries.CacheRead.Total);
    WScript.Echo("Time to connect:                     " + summary.TimingSummaries.Connect.Total);
    WScript.Echo("Time to lookup DNS:                  " + summary.TimingSummaries.DNSLookup.Total);
    WScript.Echo("Time on network:                     " + summary.TimingSummaries.Network.Total);
    WScript.Echo("Time to receive bytes:               " + summary.TimingSummaries.Receive.Total);
    WScript.Echo("Time to send bytes:                  " + summary.TimingSummaries.Send.Total);
    WScript.Echo("Time of TTFB:                        " + summary.TimingSummaries.TTFB.Total);
    WScript.Echo("Time to wait:                        " + summary.TimingSummaries.Wait.Total);
    WScript.Echo("\n");
    */
    file_time.WriteLine(""+summary.TimingSummaries.Blocked.Total+" "
                        +summary.TimingSummaries.CacheRead.Total+" "
                        +summary.TimingSummaries.Connect.Total+" "
                        +summary.TimingSummaries.DNSLookup.Total+" "
                        +summary.TimingSummaries.Network.Total+" "
                        +summary.TimingSummaries.Receive.Total+" "
                        +summary.TimingSummaries.Send.Total+" "
                        +summary.TimingSummaries.TTFB.Total+" "
                        +summary.TimingSummaries.Wait.Total);
    //save hwl log file
    plugin.Log.Save("hwl/"+"NOR-"+ index + ".hwl");
}


//Clear Browser Cache, through BytesReceived can see wether cache is work
plugin.ClearCache();
// Close down Firefox
plugin.CloseBrowser();

}


file_global.Close();
file_summary.Close()
file_time.Close();
WScript.Echo( "\r\nPress Enter to exit");
WScript.StdIn.ReadLine();
