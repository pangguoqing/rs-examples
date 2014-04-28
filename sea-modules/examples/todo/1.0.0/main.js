define("examples/todo/1.0.0/main",["backbone","./views/app","$","underscore","./views/todos","./common","./collections/todos","./vendor/backbone.localStorage","./models/todo","./routers/router"],function(a){var b=a("backbone"),c=a("./views/app"),d=a("./routers/router");new d,b.history.start(),new c}),define("examples/todo/1.0.0/views/app",["$","underscore","backbone","examples/todo/1.0.0/views/todos","examples/todo/1.0.0/common","examples/todo/1.0.0/collections/todos","examples/todo/1.0.0/models/todo"],function(a,b,c){var d,e,f,g,h,i=a("$"),j=a("underscore");d=a("backbone"),e=a("examples/todo/1.0.0/views/todos"),f=a("examples/todo/1.0.0/collections/todos"),g=a("examples/todo/1.0.0/common"),h=d.View.extend({el:"#todoapp",statsTemplate:j.template(i("#stats-template").html()),events:{"keypress #new-todo":"createOnEnter","click #clear-completed":"clearCompleted","click #toggle-all":"toggleAllComplete"},initialize:function(){this.allCheckbox=this.$("#toggle-all")[0],this.$input=this.$("#new-todo"),this.$footer=this.$("#footer"),this.$main=this.$("#main"),this.listenTo(f,"add",this.addOne),this.listenTo(f,"reset",this.addAll),this.listenTo(f,"change:completed",this.filterOne),this.listenTo(f,"filter",this.filterAll),this.listenTo(f,"all",this.render),f.fetch()},render:function(){var a=f.completed().length,b=f.remaining().length;f.length?(this.$main.show(),this.$footer.show(),this.$footer.html(this.statsTemplate({completed:a,remaining:b})),this.$("#filters li a").removeClass("selected").filter('[href="#/'+(g.TodoFilter||"")+'"]').addClass("selected")):(this.$main.hide(),this.$footer.hide()),this.allCheckbox.checked=!b},addOne:function(a){var b=new e({model:a});i("#todo-list").append(b.render().el)},addAll:function(){this.$("#todo-list").html(""),f.each(this.addOne,this)},filterOne:function(a){a.trigger("visible")},filterAll:function(){f.each(this.filterOne,this)},newAttributes:function(){return{title:this.$input.val().trim(),order:f.nextOrder(),completed:!1}},createOnEnter:function(a){a.which===g.ENTER_KEY&&this.$input.val().trim()&&(f.create(this.newAttributes()),this.$input.val(""))},clearCompleted:function(){return j.invoke(f.completed(),"destroy"),!1},toggleAllComplete:function(){var a=this.allCheckbox.checked;f.each(function(b){b.save({completed:a})})}}),c.exports=h}),define("examples/todo/1.0.0/views/todos",["backbone","examples/todo/1.0.0/common","$","underscore"],function(a,b,c){var d,e,f;d=a("backbone"),e=a("examples/todo/1.0.0/common");var g=a("$"),h=a("underscore");f=d.View.extend({tagName:"li",template:h.template(g("#item-template").html()),events:{"click .toggle":"toggleCompleted","dblclick label":"edit","click .destroy":"clear","keypress .edit":"updateOnEnter","blur .edit":"close"},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove),this.listenTo(this.model,"visible",this.toggleVisible)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this.$el.toggleClass("completed",this.model.get("completed")),this.toggleVisible(),this.$input=this.$(".edit"),this},toggleVisible:function(){this.$el.toggleClass("hidden",this.isHidden())},isHidden:function(){{this.model.get("completed")}},toggleCompleted:function(){this.model.toggle()},edit:function(){this.$el.addClass("editing"),this.$input.focus()},close:function(){var a=this.$input.val().trim();a?this.model.save({title:a}):this.clear(),this.$el.removeClass("editing")},updateOnEnter:function(a){a.which===e.ENTER_KEY&&this.close()},clear:function(){this.model.destroy()}}),c.exports=f}),define("examples/todo/1.0.0/common",[],{TodoFilter:"",ENTER_KEY:13}),define("examples/todo/1.0.0/collections/todos",["backbone","$","underscore","examples/todo/1.0.0/models/todo","examples/todo/1.0.0/vendor/backbone.localStorage"],function(a,b,c){var d,e,f;d=a("backbone"),a("examples/todo/1.0.0/vendor/backbone.localStorage"),a("$"),a("underscore"),e=a("examples/todo/1.0.0/models/todo"),f=d.Collection.extend({model:e,localStorage:new d.LocalStorage("todos-backbone"),completed:function(){return this.filter(function(a){return a.get("completed")})},remaining:function(){return this.without.apply(this,this.completed())},nextOrder:function(){return this.length?this.last().get("order")+1:1},comparator:function(a){return a.get("order")}}),c.exports=new f}),define("examples/todo/1.0.0/vendor/backbone.localStorage",["underscore","$","backbone"],function(a){function b(){return(0|65536*(1+Math.random())).toString(16).substring(1)}function c(){return b()+b()+"-"+b()+"-"+b()+"-"+b()+"-"+b()+b()+b()}var d=a("underscore"),e=a("$"),f=a("backbone");return f.LocalStorage=window.Store=function(a){this.name=a;var b=this.localStorage().getItem(this.name);this.records=b&&b.split(",")||[]},d.extend(f.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(a){return a.id||(a.id=c(),a.set(a.idAttribute,a.id)),this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a)),this.records.push(a.id.toString()),this.save(),this.find(a)},update:function(a){return this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a)),d.include(this.records,a.id.toString())||this.records.push(a.id.toString()),this.save(),this.find(a)},find:function(a){return this.jsonData(this.localStorage().getItem(this.name+"-"+a.id))},findAll:function(){return d(this.records).chain().map(function(a){return this.jsonData(this.localStorage().getItem(this.name+"-"+a))},this).compact().value()},destroy:function(a){return a.isNew()?!1:(this.localStorage().removeItem(this.name+"-"+a.id),this.records=d.reject(this.records,function(b){return b===a.id.toString()}),this.save(),a)},localStorage:function(){return localStorage},jsonData:function(a){return a&&JSON.parse(a)}}),f.LocalStorage.sync=window.Store.sync=f.localSync=function(a,b,c){var d,g,h=b.localStorage||b.collection.localStorage,i=e.Deferred&&e.Deferred();try{switch(a){case"read":d=void 0!=b.id?h.find(b):h.findAll();break;case"create":d=h.create(b);break;case"update":d=h.update(b);break;case"delete":d=h.destroy(b)}}catch(j){g=j.code===DOMException.QUOTA_EXCEEDED_ERR&&0===window.localStorage.length?"Private browsing is unsupported":j.message}return d?(c&&c.success&&("0.9.10"===f.VERSION?c.success(b,d,c):c.success(d)),i&&i.resolve(d)):(g=g?g:"Record Not Found",c&&c.error&&("0.9.10"===f.VERSION?c.error(b,g,c):c.error(g)),i&&i.reject(g)),c&&c.complete&&c.complete(d),i&&i.promise()},f.ajaxSync=f.sync,f.getSyncMethod=function(a){return a.localStorage||a.collection&&a.collection.localStorage?f.localSync:f.ajaxSync},f.sync=function(a,b,c){return f.getSyncMethod(b).apply(this,[a,b,c])},f.LocalStorage}),define("examples/todo/1.0.0/models/todo",["backbone"],function(a,b,c){var d=a("backbone"),e=d.Model.extend({defaults:{title:"",completed:!1},toggle:function(){this.save({completed:!this.get("completed")})}});c.exports=e}),define("examples/todo/1.0.0/routers/router",["backbone","examples/todo/1.0.0/collections/todos","$","underscore","examples/todo/1.0.0/models/todo","examples/todo/1.0.0/common"],function(a,b,c){var d,e,f,g;d=a("backbone"),f=a("examples/todo/1.0.0/collections/todos"),g=a("examples/todo/1.0.0/common"),e=d.Router.extend({routes:{"*filter":"setFilter"},setFilter:function(a){g.TodoFilter=a&&a.trim()||"",f.trigger("filter")}}),c.exports=e});
