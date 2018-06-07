$(document).ready(function() {
  $.getJSON("api/todos")
    .then(addTodos)
    .catch(function(err) {
      console.log(err);
    });
  $("#todoInput").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      createTodo();
    }
  });
  $(".list").on("click", ".task", function() {
    updateTodo($(this));
  });
  $(".list").on("click", ".btn-delete", function(e) {
    e.stopPropagation();
    deleteTodo($(this).parent());
  });
});

function addTodos(todos) {
  todos.map(todo => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  const newTodo = $(
    "<li class='task'>" +
      todo.name +
      "<span class='btn-delete'>X</span>" +
      "</li>"
  );
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  $(".list").append(newTodo);
  if (todo.completed) {
    newTodo.addClass("done");
  }
}

function createTodo() {
  const userInput = $("#todoInput").val();
  if (userInput !== "") {
    $.post("/api/todos", { name: userInput })
      .then(function(newTodo) {
        addTodo(newTodo);
        $("#todoInput").val("");
      })
      .catch(function(err) {
        console.log(err);
      });
  } else {
    alert("Todo can't be empty.");
  }
}

function deleteTodo(todo) {
  const todoId = todo.data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/todos/" + todoId
  })
    .then(function() {
      todo.remove();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function updateTodo(todo) {
  const todoId = todo.data("id");
  const isDone = !todo.data("completed");
  const updatedata = { completed: isDone };
  $.ajax({
    method: "PUT",
    url: "/api/todos/" + todoId,
    data: updatedata
  })
    .then(function() {
      todo.toggleClass("done");
      todo.data("completed", isDone);
    })
    .catch(function(err) {
      console.log(err);
    });
}
