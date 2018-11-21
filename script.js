	


	$(document).ready(function(){
		
		displayBookmarks("1");

		$( "#bookmarks-bar" ).delegate( ".bookmark-folder", "click", function(){
			console.log($(this).attr('data-idnode'));
			displayBookmarks($(this).attr('data-idnode'));
		});



	    $("#btn_home").click(function(){
			chrome.tabs.create({url: "https://www.ecosia.org"});
		});

	});

	


	$(document).keypress(function(e) {
	    if(e.which == 13) {

	    	url='https://www.ecosia.org/search?q='+$("#searchbox").val();
	    	window.location.href = url;
	        
	    }
	});


	


function displayBookmarks(idNode){
	$("#bookmarks-bar").html("");
	if(idNode!=="1"){
		chrome.bookmarks.get(idNode, function(BookmarksTree){
				console.log(BookmarksTree[0]['parentId']);
				$( "#bookmarks-bar" ).append( "<p class=\"bookmark-folder\" data-idnode=\""+BookmarksTree[0]['parentId']+"\"><img src=\"img/folder.png\" title=\"..\" alt=\"..\" /><br />..</p>" );
		});
		
	}
	chrome.bookmarks.getChildren(idNode, function(BookmarksTree){
		/* console.log(BookmarksTree);*/
		BookmarksTree.forEach(function(element) {
		  console.log(element['title']);
		  if (element['title'].length > 16){

		  	var title = element['title'].substring(0,12) + "...";
		  } else {
		  	var title = element['title'];
		  }


		  if (element['url']){
		  	$( "#bookmarks-bar" ).append( "<p class=\"link\"><a href=\"" + element['url']+"\"><img src=\"https://api.faviconkit.com/"+element['url'].split("/")[2]+"/144\" alt=\""+element['url'].split("/")[2]+"\" title=\""+element['title']+"\" /><br />" + title + "</a></p>" );
		  } else {
		  	$( "#bookmarks-bar" ).append( "<p class=\"bookmark-folder\" data-idnode=\""+element['id']+"\"><img src=\"img/folder.png\" title=\""+ element['title'] +"\" alt=\""+ element['title'] +"\" /><br />"+ title +"</p>" );
		  }
		  
		});
	});


}



	/* below are debug function or function that have been tested and kept for later development */

	$("#test").ready(function(){
		chrome.storage.sync.set({color: '#FF0000'});
	});


	chrome.bookmarks.getChildren("0", function(BookmarksTree){
		console.log(BookmarksTree);
		BookmarksTree.forEach(function(element) {
		  console.log(element['title']);
		});
	});

	
