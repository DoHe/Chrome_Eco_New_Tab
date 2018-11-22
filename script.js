var settings;/*={"mostViewed":0 ,"bookmarks":0 };*/



chrome.storage.sync.get(["mostViewed","bookmarks"],function(obj){
	settings=obj;
	console.log(settings);
});
/*chrome.storage.sync.get("bookmarks",function(obj){
	settings["bookmarks"]=obj["bookmarks"];
	console.log(settings);
});

chrome.storage.sync.get("",function(obj){
	console.log(obj);
});

console.log(settings);*/

	$(document).ready(function(){
		
		displayBookmarks("1");
		displayTopSites();

		$( "#bookmarks-bar" ).delegate( ".bookmark-folder", "click", function(){
			console.log($(this).attr('data-idnode'));
			displayBookmarks($(this).attr('data-idnode'));
		});



	    $("#btn_settings").click(function(){
			$("#settings").toggle();
		});


	    $("#settings .switch").each(function() {
		    $(this).html("<span></span>");
		    var attr=$(this).attr("dataset");
		    if(settings[attr]==1){
		    	console.log(attr);
		    	$(this).addClass("switch-on");
		    	$("#" + attr + "-bar").css('display','flex');
		    }
		});


	    $(".setting .switch").click(function(){
	    	$(this).toggleClass( "switch-on" );

	    	var attr=$(this).attr("dataset");
	    	settings[attr] = 1 - settings[attr];
	    	chrome.storage.sync.set(settings,function(){
	    		console.log("saved");
	    	});
	    	
	    	/*var display = $( "#" + attr + "-bar" ).css("display");
    		if ( display === true ) {
			  $( "#" + attr + "-bar" ).css("display","flex");
			} else if ( display === false ) {
			  $( "#" + attr + "-bar" ).css("display","none");
			}*/
	    	
	    	$( "#" + attr + "-bar" ).toggle();
	    	
	    });



		
	


	$(document).keypress(function(e) {
	    if(e.which == 13) {

	    	url='https://www.ecosia.org/search?q='+$("#searchbox").val();
	    	window.location.href = url;
	        
	    }
	});


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
		BookmarksTree.forEach(function(element) {
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


function displayTopSites(){
	$("#mostViewed-bar").html("");
	chrome.topSites.get(function(topSites){
		
		topSites.forEach(function(element, index){
			console.log(element);
			if (element['title'].length > 16){
			  	var title = element['title'].substring(0,12) + "...";
			} else {
			  	var title = element['title'];
			}
			$( "#mostViewed-bar" ).append( "<p class=\"link\"><a href=\"" + element['url']+"\"><img src=\"https://api.faviconkit.com/"+element['url'].split("/")[2]+"/144\" alt=\""+element['url'].split("/")[2]+"\" title=\""+element['title']+"\" /><br />" + title + "</a></p>" );
		});
	})
}




	/* below are debug function or function that have been tested and kept for later development */

	$("#test").ready(function(){
		chrome.storage.sync.set({color: '#FF0000'});
	});


	

	
