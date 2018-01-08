# 了解MVVM框架吗？
注意事项：
1. 收住优点，攒着往下说，开启引导模式
2. 低调谨慎

# 谈谈你对MVVM的认识？
注意事项：
1. 聊聊MVC，彰显知识面涉猎较多
	Model,View,Controler
2. 把MVVM定义说清楚
	Model(服务器中的数据实体),View(视图),ViewModel(核心枢纽Vue.js)
3. 对比MVVM和MVC
	MVC是单向通信。
	MVVM采用双向绑定，View的变动自动反应在ViewModel，反之亦然。

# 双向绑定是什么原理，可以写出来吗？
通过Object.defineProperty()来实现数据劫持，并重写get和set方法，来实现数据双向绑定。
注意事项：
1. object.defineProperty的用法熟记
	object.defineProperty(obj, prop, descriptor)
	```javascript
	var Book = {};
	var name = '';
	Object.defineProperty(Book, 'name', {
	    set: function(value) {
	        name = value
	    }
	    get: function() {
	        return name;
	    }
	});
	```

2. object.defineProperty与reflect.defineProperty的区别
3. object.defineProperty要会手写

# 使用了什么设计模式？
注意事项：
1. 观察者设计模式原理掌握
2. 最好能写出设计模式的伪代码
3. 如果没有问道设计模式，也要找时机表现出来

需要有一个监听者Observer也就是Object.defineProperty()来监听数据的变化，当数据变化时，监听者会通知所有观察者列表，也就是执行set函数中观察者的更新操作，在更新的过程中，会把数据更新到view中。

# 生命周期是什么？
注意事项：
1. 熟记对应的几个节点
2. 熟记每个节点的触发的时机
3. 最好演练下

new Vue()对象的过程中，首先执行init操作，也就是编译过程，这时有两个钩子函数beforeCreate()和created()。
可以对DOM进行访问的钩子函数：mounted()。
在生成DOM之前访问的钩子函数：beforeMounted()。  
数据进行变化之前的钩子函数：beforeUpdate()。
数据变化之后的钩子函数：update()。
对象销毁之前的钩子函数：beforeDestroy()。
销毁的钩子函数：destroyed()。

# 有看过源码吗？

Observer的角色：new Vue()实例时，调用了Observer，遍历所有的data数据，并且使用Object.defineProperty()拦截每个数据，当读取数据时，判断是否为数据添加观察者；当数据变化时通知观察者。
Observer调用完之后要实例化Watcher，Watcher会调一下get函数，get函数检测到watcher对象有值，就会把watcher放到观察者列表。
在编译时，将真实的DOM转移到Fragment（DOM片段）上，通过对指令的识别来进行相应的处理。