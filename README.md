# ChatGPT-export

这个JS程序能够将ChatGPT的聊天记录导出为Markdown文件。

程序功能这个程序包含一个名为`convertHtmlToMarkdown`的函数，它将HTML元素转换为Markdown格式的字符串。该函数支持以下HTML标签的转换：

* `h1`-`h6`: 标题
* `p`: 段落
* `b`: 粗体文本
* `i`: 斜体文本
* `pre`: 代码块
* `a`: 链接
* `img`: 图片
* `br`: 换行
* `ol`: 有序列表
* `ul`: 无序列表
* `code`: 行内代码
* `table`: 表格

此外，该程序还包含一个自执行函数，用于将ChatGPT的聊天记录转换为Markdown格式的字符串，并下载为`.md`文件。

## 使用方法
1. 打开ChatGPT聊天记录页面
2. 打开开发者工具控制台（可以使用`F12`或者`Ctrl+Shift+J`快捷键）
3. 将main.js的代码复制粘贴到控制台中，并运行
4. 程序将自动将聊天记录转换为Markdown格式，并下载为`.md`文件

## 注意事项
* 该程序仅能在ChatGPT聊天记录页面中运行
* 该程序使用了ES6语法，可能无法在一些老旧的浏览器中运行
* 下载的`.md`文件将以ChatGPT聊天记录页面的标题命名
