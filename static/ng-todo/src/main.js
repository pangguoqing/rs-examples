  var angular = require('angularjs')
  var common = require('./common.json')
  var todoService = require('./service')

  var todo = angular.module('TodoApp', [])

  todo.service('todoService', todoService)

  //TDDO Angular master code has been implemented
  todo.directive('ngBlur', function() {
    return function( scope, elem, attrs ) {
      elem.bind('blur', function() {
        scope.$apply(attrs.ngBlur)
      })
    }
  })

  todo.controller('MainCtrl', ['$scope', 'todoService', function($scope, todoService) {
    $scope.todoService = todoService
    $scope.title = 'todo'
    $scope.todos = todoService.getTodos()
    $scope.newTodo = ''
    $scope.activeFilter = {completed: ''}
    $scope.remaining = 0
    $scope.hidden = false

    $scope.toggleAll = function(e) {
      this.hidden = !this.hidden
    }

    $scope.createOnEnter = function(e) {
        if (e.which !== common.ENTER_KEY || !this.newTodo.trim()) {
          return
        }

        this.todoService.addTodo(this.newTodo)
        this.newTodo = ''
    }

    $scope.$watch('todos',
      function(){
        var remaining = 0
        $scope.todos.forEach(function(todo) {
          if (!todo.completed) {
            remaining++
          }
        })
        $scope.remaining = remaining
        $scope.completed = $scope.todos.length - remaining

        $scope.todoService.store()
      }, true)

    $scope.filter = function(val) {
      this.activeFilter.completed = val
    }

    $scope.selected= function(val) {
      return val === $scope.activeFilter.completed
    }

    $scope.getTodos = function() {
      return todoService.getTodos(this.activeFilter)
    }

    $scope.edit = function(todo, event) {
      todo.edit = true
      // TODO ?
      setTimeout(function() {
        angular.element(event.target).parent().next()[0].focus()
      }, 0)
    }

    $scope.close = function(todo) {
      todo.edit= false
    }
  }])

  module.exports = {
    init: function() {
      angular.bootstrap(document.body, ['TodoApp'])
    }
  }

