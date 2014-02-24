var tree = null;
var currentFolder = null;
$(document).ready(function() {
    // Hard token
    var token = '1251c7c2c9f48e2e8ff80a77c5ec103c';
    // Get global tree from database
    $.ajax({
	   url: 'http://dev.pierrechanel-gauthier.com/bookmarks-ws/folders?last=&token='+token
    }).done(function(data) {
	   tree = {'id': 0, 'name': '<i class="fa fa-home"></i>', 'folders': data.folders};
//	   console.log(JSON.stringify(tree));
    // Fake
//    tree = {
//	   'id': 1,
//	   'name': '<i class="fa fa-home"></i>',
//	   'folders': [
//		  {
//			 'id': 2,
//			 'name': 'Sciences',
//			 'folders': [
//				{
//				    'id': 3,
//				    'name': 'Biologie',
//				    'folders': [
//					   {
//						  'id': 12,
//						  'name': 'Neurologie',
//						  'folders': []
//					   }
//				    ]
//				},
//				{
//				    'id': 4,
//				    'name': 'Astrophysique',
//				    'folders': [
//					   {
//						  'id': 8,
//						  'name': 'Cosmologie',
//						  'folders': [
//							 {
//								'id': 10,
//								'name': 'Système solaire',
//								'folders': []
//							 }
//						  ]
//					   },
//					   {
//						  'id': 9,
//						  'name': 'Trous noirs',
//						  'folders': []
//					   }
//				    ]
//				},
//				{
//				    'id': 5,
//				    'name': 'Mathématiques',
//				    'folders': []
//				}
//			 ]
//		  },
//		  {
//			 'id': 6,
//			 'name': 'Actualités',
//			 'folders': [
//				{
//				    'id': 11,
//				    'name': 'Monde',
//				    'folders': []
//				}
//			 ]
//		  },
//		  {
//			 'id': 7,
//			 'name': 'Bandes-dessinées',
//			 'folders': [
//				{
//				    'id': 13,
//				    'name': 'Comics',
//				    'folders': []
//				}
//			 ]
//		  }
//	   ]
//    };
	   currentFolder = {'id': 0, 'name': '<i class="fa fa-home"></i>'};
	   displayFolders();
	   displayBreadcrumb(getBreadcrumb(tree, currentFolder.id, []));
    });
    
    $(document).on("click", ".goFolder", function() { 
	   currentFolder = {'id': parseInt($(this).attr('data-id')), 'name': $(this).html()};
	   displayFolders();
	   displayBreadcrumb(getBreadcrumb(tree, currentFolder.id, []));
    });
});

function displayFolders() {
    $('.folder').remove();
    var folders = getChildrenFromCurrentFolder(tree, currentFolder.id);
    $('#currentFolder').html(currentFolder.name);
    if (folders !== null)
	   for (var i = folders.length-1; i >= 0; i--)
		  $('#folderWrapper').prepend('<div data-id="'+folders[i]['id']+'" class="btn folder goFolder">'+folders[i]['name']+'</div>');
//    console.log(getBreadcrumb(tree, currentFolder.id, []));
}

function displayBreadcrumb(breadcrumb) {
    // Display the breadcrumb from root to current folder
    $('.breadcrumb').html('');
    for (var i = 0; i < breadcrumb.length; i++) {
	   if (i === breadcrumb.length-1)
		  $('.breadcrumb').append('<li class="active">'+breadcrumb[i].name+'</li>');
	   else
		  $('.breadcrumb').append('<li><a data-id="'+breadcrumb[i].id+'" class="goFolder">'+breadcrumb[i].name+'</a> <span class="divider">/</span></li>');
    }
}

function getChildrenFromCurrentFolder(tree, targetFolder) { 
    // Find recursivly all direct children of targeted folder
    if (targetFolder === tree.id) {
	   return tree.folders;
    } else if (tree.folders.length > 0) {
	   var folders = [];
	   for (var i = 0; folders.length === 0 && i < tree.folders.length; i++) {
		  folders = getChildrenFromCurrentFolder(tree.folders[i], targetFolder);
	   }
	   return folders;
    }
    return [];
}

function getBreadcrumb(tree, targetFolder, breadcrumb) {
    // Get the breadcrumb from root to current folder
    if (targetFolder === tree.id) {
	   breadcrumb.unshift({'id': tree['id'], 'name': tree['name']});
	   return breadcrumb;
    } else if (tree.folders.length > 0) {
	   var tmp = [];
	   for (var i = 0; i < tree.folders.length; i++) {
		  tmp = getBreadcrumb(tree.folders[i], targetFolder, breadcrumb);
		  if (tmp.length > 0) {
			 breadcrumb.unshift({'id': tree['id'], 'name': tree['name']});
			 return breadcrumb;
		  }
	   }
    }
    return [];
}