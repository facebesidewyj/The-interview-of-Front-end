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

# 生命周期是什么？
注意事项：
1. 熟记对应的几个节点
2. 熟记每个节点的触发的时机
3. 最好演练下

# 有看过源码吗？
