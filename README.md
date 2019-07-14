# StudentSystem
介绍
基于NodeJs的Express框架设计的学生信息管理系统，实现了增加、删除、修改、查找的功能。

涉及插件
- NodeJs的核心插件：
1. fs : 主要用于读取、写入文件。
2. http：主要用于新建一个服务器，开启服务和端口监听。
3. path：使用path.join和__dirname属性获取动态绝对路径，容错率高。
- 第三方插件：
1. art-tempalte: 主要用于服务端渲染页面。
2. body-parser: 获取POST方式提交的表单数据，通过require.body获取数据对象。
3. express: NodeJS框架，利用module_express输出数据模块（规范mongoose数据库的文档格式）、express.Router进行路由设计等。
4. session: 用于向页面发送用户数据处理登录状态。
- 自定义插件：
1. router.js：处理页面路径请求：“/”主页、“/edit”新增学生、“/new”修改信息、“/delete”删除信息
2. session.js：处理页面登录、注册、退出登录等请求。
- 两种数据渲染模式
1. 静态数据渲染：通过fs.readFile、fs.writeFile来执行读写静态文件的JSON数据，用于渲染页面（需要撰写API处理增删改查等操作）
2. 数据库注入渲染：通过Mongdb数据库进行数据渲染。
使用说明
- 使用Mongdb数据库渲染，得先开启数据库，再启动服务器。
