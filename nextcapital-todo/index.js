angular.module('todo', ['ionic'])

$.wait = function( callback, seconds){
   return window.setTimeout( callback, seconds * 1000 );
}

function handleKeyPress(e){
 var key=e.keyCode || e.which;
  if (key==13){
     logIn();
  }
}

var todoArray;

function logIn(){

	$('#errorBox1').hide();

	var theEmail = $('#emailInput').val();
	var thePassword = $('#passwordInput').val();

	Todo.startSession({
      email:    theEmail,
      password: thePassword,
      success:  function(user) { getTodos(); logInDisplay(); $('#emailInput').val(""); $('#passwordInput').val("");},
      error:    function(xhr)  { var r = $.parseJSON(xhr.responseText); $('#errorBox1').html(r.error); $('#errorBox1').show(); }
    });
}

function signUp(){

	$('#errorBox1').hide();

	var theEmail = $('#emailInput').val();
	var thePassword = $('#passwordInput').val();

	if(theEmail == "" || theEmail.indexOf('@') == -1)
	{
		$('#errorBox1').html("Enter a valid email"); 
		$('#errorBox1').show();
		return;
	}

	if(thePassword == "" || thePassword.length < 6)
	{
		$('#errorBox1').html("Enter a password with at least 6 characters"); 
		$('#errorBox1').show();
		return;
	}

	Todo.createUser({
	    email:    theEmail,
	    password: thePassword,
	    success:  function(user) { getTodos(); welcome(); },
	    error:    function(xhr)  { var r = $.parseJSON(xhr.responseText); $('#errorBox1').html(theEmail + " " + r.email[0]); $('#errorBox1').show(); }
	  });
}

function welcome(){
	$('#loginPage').fadeOut(1000);
	$('#welcome').fadeIn(1000);

	$.wait( function(){ 
		$('#welcome').fadeOut(1000);
		$('#container').animate({backgroundColor: '#4ECDC4'}, 'slow');
		$('#mainContent').fadeIn(1000); }, 2);
}

function logInDisplay(){
	$('#loginPage').fadeOut(1000);
	$('#container').animate({backgroundColor: '#4ECDC4'}, 'slow');
	$('#mainContent').fadeIn(1000);
}

function getTodos(){

	var tryOnceAgain = false;

	Todo.loadTodos({
      success: function(todos) { updateTodoContainer(todos);},
      error:   function(xhr)   { if(!tryOnceAgain)
      								getTodos();
      							 else
      							 	alert('Update failed');
      						   }
    });

}

function updateTodoContainer(todos){

	todoArray = todos;
	$('#todoList').empty();

	var not = "";
	var yes = "<div style='padding-top:40px; padding-bottom:10px; margin-left:10px;font-size:30px;'>completed</div>";

	if(todos.length == 0)
		not += "<div class='card itemCustom'><div class='item item-text-wrap'>No todos here!</div></div>";

	else
	{
		for(var i = 0; i < todos.length; i++)
		{
			if(todos[i].is_complete == false)
				not += "<div class='card itemCustom moveable' id='" + todos[i].id + "-1'><div class='item item-text-wrap'><span id='"+ todos[i].id +"'>" + todos[i].description + "</span><div class='orgButtons'><i class='icon ion-chevron-up placeholder-icon' onclick=' moveUp(" + todos[i].id + ") '></i>&nbsp;&nbsp;<i class='icon ion-chevron-down placeholder-icon' onclick=' moveDown(" + todos[i].id + ") '></i>&nbsp;&nbsp;<i class='icon ion-checkmark-round placeholder-icon' onclick='checkedOff("+ todos[i].id +")'></i></div></div></div>";
			else
				yes += "<div class='card itemCustom moveable' id='" + todos[i].id + "-1'><div class='item item-text-wrap'><span id='"+ todos[i].id +"'>" + todos[i].description + "</span><div class='orgButtons'><i class='icon ion-chevron-up placeholder-icon' onclick=' moveUp(" + todos[i].id + ") '></i>&nbsp;&nbsp;<i class='icon ion-chevron-down placeholder-icon' onclick=' moveDown(" + todos[i].id + ") '></i></div></div></div>";
		}
	}

	if(not == "")
		not += "<div class='card itemCustom'><div class='item item-text-wrap'>No todos here!</div></div>";

	if(yes == "<div style='padding-top:40px; padding-bottom:10px; margin-left:10px;font-size:30px;'>completed</div>")
		yes += "<div class='card itemCustom'><div class='item item-text-wrap'>No todos here!</div></div>";

	not += "<div class='card item-input itemCustom' id='newBox' style='padding:10px;'><input type='text' id='newInput' placeholder='create new'><div class='orgButtons'><i class='icon ion-plus placeholder-icon' style='font-size:18px;' onclick='createNewTodo();'></i></div></div>";

	$('#todoList').append("" + not + "" + yes);
}

function createNewTodo(){
	
	var todoData = $('#newInput').val();

	if(todoData == "")
	{
		return;
	}

	else
	{
		Todo.createTodo({
	      todo: {description: todoData},
	      success: function(todo) {  getTodos(); },
	      error:   function(xhr)  {  }
	    });
	}
}

function checkedOff(id)
{

	var todoData = $('#' + id).text();

	Todo.updateTodo({
      todoId: id,
      data: {description:todoData, is_complete: true},
      success: function(todo) { getTodos(); },
      error:   function(xhr)  { alert('Update failed'); }
    });

}

function moveUp(id){
	$('#'+id+'-1').insertBefore($('#'+id+'-1').prev('.moveable'));
}

function moveDown(id){

	$('#'+id+'-1').insertAfter($('#'+id+'-1').next('.moveable'));
}

function logOut(){

	Todo.endSession({
      success: function(todo) {	$('#mainContent').fadeOut(1000);
								$('#container').animate({backgroundColor: '#00A8C6'}, 'slow');
								$('#loginPage').fadeIn(1000);
							  },

      error:   function(xhr)  {alert('Logout error');}
    });

	

}