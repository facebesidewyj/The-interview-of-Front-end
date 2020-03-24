# Node中进程通信方式

* Node中进程的创建：
  * child_process模块
  * cluster模块
* 通信方式：
  * 通过流的形式stdin/stdout传递JSON，VS Code采用这种方式
  * 原生IPC支持：进程之间借助IPC机制通信
  * socket通信：需要创建连接
  * message queue：通过中间间MQ通信
  * Redis通信：将Redis作为消息队列