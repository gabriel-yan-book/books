---
sidebarDepth: 2
sidebar: auto
---

# 面试题
## html-css
1. 父元素和子元素宽高不固定，如何实现水平垂直居中
```css
- 弹性盒模型
  -父元素设置：display:flex; justify-content:center; align-items:center
  -额外的骚操作：父元素设置弹性盒display:flex; 子元素可以设置margin: auto; 实现垂直水平居中
- 定位属性（position）配合位移属性（transform）
  - 父元素设置：position:relative，
  - 子元素设置：position:absolute; top:50%; left:50%; transform:translate(-50%，-50%)
```
2. 分别实现骰子中的'一点' 和 '三点' 的布局
```css
/*一点布局：原理就是将单个子元素垂直水平居中，利用弹性盒模型(display:flex)即可*/
父元素设置：display:flex; justify-content:center; align-items: center

/*三点布局：同样是使用弹性盒模型(display:flex)，只不过这次需要用到其他属性*/

父元素设置：display: flex; justify-content: space-between;
子元素设置： .child:nth-child(2){
              align-self: center;
            }
            .child:nth-child(3){
              align-self: flex-end;
            }

三点布局需要三个子元素，在这里的第一个子元素不需要设置排列方式，默认为 align-self: flex-start
justify-content: space-between; 的作用是使子元素能够在水平方向上两边产生间隔并平均分布空间
align-self: flex-start(默认)/center/flex-end; 该属性作用在父元素设置了display:flex的子元素上，可以调整子元素自身的位置
```
3. ★★ 简述选择器~和+的区别。
```css
~ 选择器的作用：
	1.选择紧跟着当前符合条件元素后面的同级元素
	2.可以匹配多个
+ 选择器的作用：
	1.选择紧跟在当前符合条件元素后面的同级元素
	2.只能匹配一个

例： <div class="box"></div>
	<p class="one"></p>
	<span class="two"></span>
	<p class="three"></p>
	<span class="four"></span>

	.box ~ p  ：可以选中box下的所有p元素，既是 one 和 three
	.box + span ：则匹配选中box相邻下符合条件的第一个元素，既是 two
```


 <p id="html-4"> 4. ★★ 简述box-sizing的有效值以及所对应的盒模型规则。

[box-sizing有关盒模型的解析]: https://blog.csdn.net/qq_26780317/article/details/80736514?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&amp;depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control



```css
/*box-sizing值*/
	box-sizing: content-box/border-box/inherit
 box-sizing属性用于更改用于计算元素的宽度和高度默认的CSS盒子模型，可以使用此属性来模拟不正确支持CSS盒子模型规范的游览器行为。
**content-box：
	1.box-sizing的默认属性
	2.是CSS2.1中规定的宽度高度的显示行为
	3.在CSS中定义的宽度和高度就对应到元素的内容框（即元素容器本身
	4.在CSS中定义的宽度和高度之外绘制元素的内边距和边框（即在元素容器本身上增加内边距和边框，容器宽高需要自增计算
	容器占据空间大小计算方式：content（容器宽高）+ margin（外边距） + border（边框）
**border-box:
	1.在CSS中微元素设定的宽度和高度就决定了元素的边框值
	2.元素在设置内边距和边框是在已经设定好的宽度和高度之内进行绘制
	3.CSS中设定的宽度和高度减去边框和内间距才能得到元素内容所占的实际宽度和高度
	容器占据空间大小计算方式：content（容器宽高）+padding（内边距）+border（边框）
**inherit：
	1.规定元素是从父容器继承box-sizing的属性值


```



 <p id="html-5"> 5.  html中元素的margin是否会叠加（合并）？如何解决？

```css
/*  会叠加   */
问题详解1： flex布局对子元素的影响
	1.子元素的float、clear和vertical-align属性将会失效
	2.解决了margin传递、重叠（叠加）问题

问题详解2：flex布局的margin传递叠加问题主要有以下两种
	1.父子间的margin，会由子级传递到父级
	—— 解决方法： margin传递的产生的原因是父级的高度没有被自动撑开，所以在父级父级增加属性：overflow: auto 即可解决
	2.兄弟间的margin值会重复叠加
	—— 解决方法： 浏览器为了保证列表的整齐，上下margin产生了叠加，不能直接解决。只能通过减少一个margin的方式。如只定义margin-top:100px;  margin-bottom:0px。的方式解决。

```



 <p id="html-6"> 6. ★★ 简述align-items和align-content的区别。

```css
align-items：可以应用于所有的flex容器，它的作用是设置flex子项在每个flex行的交叉轴上的默认对齐方式（相对Y轴

align-content：只适用于多行的flex容器，在使用前需在flex容器设置flex-wrap：wrap;表示子元素超出换行；align-content 它的作用是当flex容器在交叉轴上有多余的空间时，将子项作为一个整体进行对齐。
```



 <p id="html-7"> 7. ★★ 简述data-*属性的用法（如何设置，如何获取），有何优势？

[有关html标签中data- * 的相关用法]: https://www.cnblogs.com/10manongit/p/12676805.html



```css
data-*定义：
	1.是用于储存页面或应用程序的私有自定义数据
	2.赋予我们在所有html元素上嵌入自定义data属性的能力

data-*用法：
	1.属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
	2.属性值可以是任意字符串
	3.一个元素可以拥有任意数量的data属性
	4.data属性无法储存对象，如需储存，可通过对象序列化

data-*如何设置、获取：
	1.如何设置
		通过JavaScript内置的setAttribute('data属性名','新内容')即可设置
		通过该数据类型的(dataset) API设置data值，IE10以上才支持；
			var button = document.queryselector('button')
			button.dataset.data属性名 = '新内容' ; 这里的data属性名是指data-后面的名字

	2.如何获取
		通过JavaScript内置的getAttribute('data属性名') 即可获取
		通过该数据类型的(dataset) API设置data值，IE10以上才支持；
			var button = document.queryselector('button')
			data = button.dataset.data属性名 ; 这里的data属性名是指data-后面的名字

data-*优势：
	1.其储存的自定义数据能够被页面的JavaScript利用，可以创建更好的用户体验
	2.可以通过JavaScript来构造数据、填充数据
	3.代码体积小、较为灵活
	4.解决网站的外观和实用性之间产生的冲突
```



 <p id="html-8"> 8. ★ 简述title与h1的区别，b与strong的区别，i与em的区别。

[三者的区别]: https://www.cnblogs.com/1463069300limingzhi/p/10853675.html



```css
《title与h1的区别》：
	1. 从网站角度看，title 更重于网站信息。title可以直接告诉搜索引擎和用户这个网站是关于什么主题和内容的。
	2. 从文章角度看，h1则是用于概括文章主题。
	3. 一个网站可以有多个title,最好一个单页用一个title，以便突出网站页面主体信息，从seo看，title权重比h1高，适用性比h1广。
	4. 标记了h1的文字页面给予的权重会比页面内其他权重高很多。一个好的网站是h1和title并存，既突出h1文章主题，又突出网站主题和关键字。达到双重优化网站的效果。

《b与strong 的区别》：
	1. b 是只是对文本的简单加粗， strong 是一个语义化标签，对相关文本具有强调作用
	2. b 标签只是侧重于字体加粗， strong标签加强字体的语气都是通过粗体来实现的，相比之下，搜索引擎更喜欢侧重于strong标签
	3. strong标签更注重于内容上的应用，在html中，对关键词的标明，然而还有一些网站上，也有使用strong标签登对小标题进行强调，但是在页面中，如果出现过多的strong标签，可能会对排名不利。

《i 与 em 的区别》：
	1. i(italic)是实体标签，用来使字符倾斜，em(emphasis)是逻辑标签，作用是强调文本内容
	2. i标签只是斜体的样式，没有实际含义，常用来表达无强调或着重意味的斜体，比如生物学名、术语、外来语；
	3. em表示标签内字符重要，用以强调，其默认格式是斜体，但是可以通过CSS添加样式。
	建议：为了符合CSS3的规范，i 标签应尽量少用而应改用 em
```



 <p id="html-9"> 9. ★ 什么是标准文档流

[标准文档流详解]: https://blog.csdn.net/sinat_22480443/article/details/111032878?utm_term=%E6%A0%87%E5%87%86%E6%96%87%E6%A1%A3%E6%B5%81&amp;utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~sobaiduweb~default-3-111032878&amp;spm=3001.4430



```css
*** 标准文档流指的是元素排版布局过程中，元素会默认自动从左往右，从上往下的流式排列方式。当前面内容发生了变化，后面的内容位置也会随着发生变化。

*** HTML就是一种标准文档流文件。

简单的来说就是各种布局属性在html中所显示的效果，如display（行内元素与块级元素*非常重要*）、float、position

```



 <p id="html-10"> 10. ★ z-index是什么？在position的值什么时候可以触发?

```css
z-index : 指的是一个元素在当前文档页面定位时重叠层显示的层级等级，默认为0 ，数值不限，越大显示层级越高

触发机制：当position的值设置为absolute、relative和fixed时才能触发
```



 <p id="html-11"> 11. ★★ CSS3 如何实现圆角？

```css
border-radius属性
	1. 四个值: 第一个值为左上角，第二个值为右上角，第三个值为右下角，第四个值为左下角。
	2. 三个值: 第一个值为左上角, 第二个值为右上角和左下角，第三个值为右下角
	3. 两个值: 第一个值为左上角与右下角，第二个值为右上角与左下角
	4. 一个值： 四个圆角值相同
只需要使用border-radius将四个角设置为相适应的尺寸即可实现圆角
```



 <p id="html-12"> 12. ★★ HTML5有哪些缓存方式？

[html5 的缓存方式]: https://www.sohu.com/a/323057946_120077996



```css
1、localstorege缓存，将数据储存在本地客户端，只有用户手动清除才能清除缓存
	API：1.localstorege.setItem(key,value)，键值对的形式缓存
		2.localstorege.getItem(key)，根据键名来缓存值
		3.localstorege.length ，获取总缓存数量

2、sessionStorege 会话缓存，会话机制是指从打开浏览器开始访问页面的时候，到关闭这个页面的过程成为一个会话，sessionStorege储存的数据会随着页面关闭而销毁
	API: 1. sessionStorage.setItem(key,val)，localStorage是以键值对的形式创建的；
		 2. sessionStorage.getItem(key)，根据键名来获取缓存的值；
		 3. sessionStorage.length；获取总共缓存值得数量， localStoarge返回的是个对象；

3、离线缓存机制(Application Cache)
	1. 配置manifest文件，manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）
	2. manifest 文件可分为三个部分：
		1、CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
		2、NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
		3、FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）
	3. API： 0（UNCACHED） : 无缓存， 即没有与页面相关的应用缓存
			1（IDLE） : 闲置，即应用缓存未得到更新
			2 （CHECKING） : 检查中，即正在下载描述文件并检查更新
			3 （DOWNLOADING） : 下载中，即应用缓存正在下载描述文件中指定的资源
			4 （UPDATEREADY） : 更新完成，所有资源都已下载完毕
			5 （IDLE） : 废弃，即应用缓存的描述文件已经不存在了，因此页面无法再访问应用缓存
4、web SQL
	1. 关系数据库，通过SQL语句访问
	2. Web SQL 数据库API并不是HTML5 规范的一部分，但是它是一个独立的规范，引入了一组使用SQL操作客户端数据库的APIs
	3. 支持情况：Web SQL 数据库可以在最新版的 Safari, Chrome 和 Opera 浏览器中工作。
	4. API：1. openDatabase：这个方法使用现有的数据库或者新建的数据库创建一个数据库对象。
			2. transaction：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
			3. executeSql：这个方法用于执行实际的 SQL 查询。

5、 IndexDB
	1.索引数据库 (IndexedDB) API（作为 HTML5 的一部分）对创建具有丰富本地存储数据的数据密集型的离线 HTML5 Web 应用程序很有用。同时它还有助于本地缓存数据，使传统在线 Web 应用程序（比如移动 Web 应用程序）能够更快地运行和响应。
```



 <p id="html-13"> 13. ★★ CSS3新增伪类有那些？

[菜鸟css3 伪类]: https://www.runoob.com/css/css-pseudo-classes.html



```css
常用的伪类：
	1. :link 选择所有未访问的链接
    2. :visited 选择所有访问过的链接
    3. :active 选择正在活动的链接（或理解为鼠标点击瞬间效果）
    4. :hover 鼠标放到链接后的状态
    5. :focus 选择元素输入后具有焦点
    6. :before 在元素之前插入内容
    7. :after 在元素之后插入内容
```



 <p id="html-14"> 14. ★ 简述一下src与href的区别，title和alt的区别

```css
href：href表示超文本引用，用来建立当前元素和文档之间的链接，常用在link和a等元素上。
	注：当浏览器解析到这一句时会识别该文档为css文件，会下载并不会停止对当前文档的处理，所以建议使用link方式而不是@import加载css。

src：src表示引用资源，替换当前元素，是页面内容不可缺少的一部分，常用在img，script，iframe上。src指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；请求src资源时会将其指向的资源下载并应用到当前文档中,例如js脚本、img图片等。src链接内的地址不会有跨域问题
     注：当浏览器解析到这一句时会暂停其他资源的下载和处理，直至将该资源加载、编译、执行完毕。这也是js脚本放在底部而不是头部的问题

title：
	1. title属性是为元素提供额外的注释信息，当鼠标放在元素上时会有title文字显示，以达到补充说明或提示。
   	2. title属性更倾向于用户体验的考虑。
    3. title既可以是元素的属性也可以是标签，作为属性可以用在除base,basefont,head,html,meta,param,script和title之外的任何标签上（title常与form以及a标签一同使用，以提供关于输入格式和链接目标的信息），title与style、id、class等一起作为HTML中许多标签共用的标准属性。

alt：
    1. alt属性是在你的图片无法显示时的替代文本，它会直接输出在原本加载图片的地方。
    2. alt属性有利于SEO，是搜索引擎搜录时判断图片与文字是否相关的重要依据。
    3. alt只能是元素的属性，只能用在img、area和input标签中（img,area中alt必须指定）。     

注：当a标签内嵌套img标签时，起作用的是img的title属性。
```



 <p id="html-15"> 15. ★ 什么是CSS hack？

[css hock]: https://blog.csdn.net/qq_31635733/article/details/81660897



```css
CSS hack：CSS hack是通过在CSS样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别什么样的符号是有标准的，CSS hack就是让你记住这个标准），以达到应用不同的CSS样式的目的。

注：CSS属性Hack、CSS选择符Hack以及IE条件注释Hack， Hack主要针对IE浏览器。

例：margin属性在ie6中显示的距离会比其他浏览器中显示的距离宽2倍，也就是说margin-left:20px;在ie6中距左侧对象的实际显示距离是40px，而在非ie6中显示的距左侧对象的距离是设置的值20px;所以要想设置一个对象距离左侧对象的距离在所有浏览器中都显示是20px的宽度的样式应为：.kwstu{margin-left:20px;_margin-left:20px;}

CSS hack常见的三种形式：
	1. 属性级Hack：比如IE6能识别下划线“_”和星号“*”，IE7能识别星号“*”，但不能识别下划线”_ ”，而firefox两个都不能认识。
	2. 选择符级Hack：比如IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}。
	3. IE条件注释Hack：IE条件注释是微软IE5开始就提供的一种非标准逻辑语句。比如针对所有IE：&lt;!-[if IE]&gt;&lt;!-您的代码-&gt;&lt;![endif]&gt;，针对IE6及以下版本：&lt;!-[if it IE 7]&gt;&lt;!-您的代码-&gt;&lt;![endif]-&gt;，这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。
	PS：条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下被当做注释视而不见。可以通过IE条件注释载入不同的CSS、JS、HTML和服务器代码等。
```



 <p id="html-16"> 16. ★★ 什么叫做优雅降级和渐进增强？

[**]: https://blog.csdn.net/qf2019/article/details/99550123



```css
渐进增强 progressive enhancement：
	1. 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
	2. 渐进增强观点则认为应关注于内容本身。内容是我们建立网站的诱因。有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo! 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。

优雅降级 graceful degradation：
	1. 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
	2. 优雅降级观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。

区别：
	1. 优雅降级是从复杂的现状开始，并试图减少用户体验的供给
	2. 渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要
	3. 降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带
```



 <p id="html-17"> 17.  移动端适配怎么做？

[移动端适配]: https://blog.csdn.net/chenjuan1993/article/details/81710022?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&amp;depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control



```css
方法一：@media 媒体查询，通过查询设备的宽度来执行不同的 css 代码，最终达到界面的配置。

方法二：Flex弹性布局

方法三：rem + viewport 缩放，屏幕宽度设定 rem 值，需要适配的元素都使用 rem 为单位，不需要适配的元素还是使用 px 为单位。
```



 <p id="html-18"> 18. ★★ 请问苹果原生浏览器中默认样式如何清除，例如button，input默认样式？

```css
清除苹果默认样式： css样式中加入 input,textarea,button { -webkit-appearance: none; border-radius:0px; border:none;}

input、button默认样式： input[type="button"], input[type="submit"], input[type="reset"] {-webkit-appearance: none;}

```



 <p id="html-19"> 19. ★ CSS清除浮动的方法。

```css
1. 在标签尾部添加空块级标签，设置样式属性为：clear：both；缺点：如果页面浮动布局多，就要增加很多空div，不利于页面的优化。
2. 父级定义伪类after和zoom，.box:after{display:block; clear:both; content:""; visibility:hidden; height:0;}  .box{ zoom: 1 }
3. 简单粗暴，父级设置overflow:hidden，缺点是不能和position配合使用
4. 直接给父元素单独设置高度（height）；缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题。对于响应式布局会有很大影响。
```



 <p id="html-20"> 20. ★★ PC端常用的布局方法。

[常见布局]: https://www.jianshu.com/p/dddc8993f9d1



```css
1、利用float+overflow实现
	左右定宽度，分布向两边浮动，中间如果没设置溢出处理默认宽度是100%，设置后就会截取两边的宽度从而实现中间自适应
2、flex布局
	通过flex相关的属性进行适配性的调整布局
3、Table表格布局
4、float+margin实现三列布局
5、定位absolute实现中间自适应
6、Grid网格布局
7、圣杯布局
8、双飞翼布局
9、等高布局
```



 <p id="html-21"> 21. ★★ 布局左边20%，中间自适应，右边200px，不能用定位。

```css
布局： <div class="box">
        <div class="left">left</div>
        <div class="right">right</div>
        <div class="content">content</div>
      </div>

样式：*,html,body{
          margin: 0;
          padding: 0;
        }
        .box{
          width: 1500px;
          height: 500px;
          background-color: rgb(215, 221, 221);
          margin: 0 auto;
        }
        .left{
          width: 20%;
          height: 200px;
          background-color: chocolate;
          float: left;
        }
        .right{
          width: 200px;
          height: 200px;
          float: right;
          background-color: cornflowerblue;
        }
        .content{
          overflow: hidden;
          height: 400px;
          background-color: darkblue;
        }

```



 <p id="html-22"> 22. ★★ 行内元素和块级元素？img算什么？行内元素怎么转化为块元素？

```css
行内元素：1.无法设置宽高；
		2. 对margin仅设置左右有效，上下无效；
		3. padding上下左右有效；不会自动换行
块级元素：1.可以设置宽高
		2. margin和padding的上下左右均对其有效
		3. 超出当前行会自动换行
		4. 多个块状元素标签写在一起，默认排列方式为从上至下
img：属于行内块元素(inline-block),即有行内元素的属性也有块级元素的属性

元素之间的转化可以通过设置样式：display:block/inline/inline-block来改变自身的元素属性
```



 <p id="html-23"> 23. ★★ 将多个元素设置为同一行? 清除浮动的几种方式？

```css
将多个元素设置为同一行：1. 浮动(float) 2.行内元素/行内块元素  
清除浮动：详见 19
```



 <p id="html-24"> 24. ★ 什么是CSS3 transform? animation? 区别是什么？

[tarnsform与animation的区别]: https://www.tingno.com/archives/311



```css
transform：1. transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。
		  2. transform属性是静态属性，需要配合transition和animation才能展现出动画效果。你可以把它看成是跟left、top等属性一样，只是一个静态样式而已。

animation：一个css3的动画属性，需要配合@keyframes 使用

区别： 1. transition是css中检测指定属性变化进行自动补间动画的属性。
	  2. animate是先指定好动画过程中的关键帧属性，进行动画的属性。
```



 <p id="html-25"> 25. ★★ nth-of-type和nth-child的区别是什么？

```css
nth-of-type：该css伪类是针对具有一组兄弟节点的标签, 用 n 来筛选出在一组兄弟节点的位置。

nth-child：该css伪类首先是找到所有当前元素的兄弟元素，, 用 n 来筛选出在当前元素的兄弟元素节点的位置。

总的来说就是，nth-of-type 它是当前元素的兄弟元素的第n个，而nth-child 是当前元素的兄弟节点的第n个当前元素。

例：
	  <p>第一个</p>
      <p>第二个</p>
      <h1>第三个</h1>
      <p>第四个</p>
      <p>第五个</p>

	 p:nth-child(4){
      color: red;     //选中的是 ‘第四个’ 内容的 p 标签
    }

    p:nth-of-type(4){
      color: yellow;  //选中的是 ‘第五个’ 内容的 p 标签
    }

```



 <p id="html-26"> 26. ★★ :before 和 ::before区别是什么？

```css
区别：
	1. 叫法不同：一个是伪类，一个是伪元素
	2. 版本不同：作用都是一样，但单冒号伪类写法是旧版本css2写法， 双冒号伪元素是新版本css3写法
	3. 兼容性差异：单冒号伪类写法 兼容性比 双冒号要好。 :before > ::before
```



 <p id="html-27"> 27. ★★ 简述 viewport 所有属性

```css
width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。

height：和 width 相对应，指定高度。

initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例（调整页面缩放比例）。

maximum-scale：允许用户缩放到的最大比例。

minimum-scale：允许用户缩放到的最小比例。

user-scalable：用户是否可以手动缩放
```



 <p id="html-28"> 28. ★ 如何理解HTML结构语义化？

[理解结构语义化]: https://www.jianshu.com/p/6bc1fc059b51



```css
为什么要语义化：
	a. 为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构:为了裸奔时好看；

    b. 用户体验：例如title、alt用于解释名词或解释图片信息的标签尽量填写有含义的词语、label标签的活用；

    c. 有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；

    d. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以有意义的方式来渲染网页；

    e. 便于团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

写代码时要注意什么：
	1.  尽可能少的使用无语义的标签div和span；

    2.  在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；

    3.  不要使用纯样式标签，如：b、font、u等，改用css设置。

    4.  需要强调的文本，可以包含在strong或em标签中，strong默认样式是加粗（不要用b），em是斜体（不要用i）；

    5.  使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；

    6.表单域要用fieldset标签包起来，并用legend标签说明表单的用途；demo

    7.每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。

    8.补充一点：不仅写html结构时，要用语义化标签，给元素写css类名时，也要遵循语义化原则，不要，随便起个名字就用，那样等以后，再重构时，非常难读。最忌讳的是不会英文，用汉语拼音代替。别那么LOW 。

```



 <p id="html-29"> 29. ★★ 伪类选择器和伪元素？CSS3中引入的伪元素有什么？

[伪类与伪元素的区别]: https://blog.csdn.net/qq_27674439/article/details/90608220



```css
1. 伪类选择器是css2版本中的旧写法，相对于css3中伪元素的的新写法兼容性会更好。

2. 伪元素只能在一个选择器中出现一次，且需要配合content属性一起使用

3. 伪元素不会出现在DOM中，所以不能通过js来进行操作，仅仅是在渲染层加入而已

css3引入的伪元素：
	1、 ::after  //在xxx之后插入内容
	2、 ::before	 // 在xxx之前插入内容
	3、 ::first-letter  //选择xxx元素的首字母
	4、 ::first-line	   //选择xxx元素的首行
	5、 ::selection     //选择用户选择的元素部分

```



 <p id="html-30"> 30. ★★ HTML5有哪些新特性，移除了哪些元素？如何处理HTML5新标签兼容问题？如何区分HTML和HTML5？

[html5新特性]: https://www.cnblogs.com/mengshi-web/p/9373097.html



```css
HTML5 新特性：
	一、语义标签

    二、增强型表单

    三、视频和音频

    四、Canvas绘图

    五、SVG绘图

    六、地理定位

    七、拖放API

    八、WebWorker

    九、WebStorage

    十、WebSocket

移除的元素：
	1、纯表现的元素：basefont，big，center，font,s，strike，tt，u。

	2、对可用性产生负面影响的元素：frame，frameset，noframes。

处理HTML5新标签兼容问题： 使用html5shiv
	原理：用document.createElement()创建html5标签

	用法：1、在页面引入html5shiv.js
		 2、在样式中编写 article,aside,dialog,footer,header,section,footer,nav,figure,menu
{display:block}

如何区分HTML和HTML5：
	HTML：  1）标识文本（eg: 定义标题文本、段落文本、列表文本、预定义文本）；
            2）建立超链接，便于页面链接的跳转；
            3）创建列表，把信息有序地组织在一起，方便浏览；
            4）在网页中显示“图像、声音、视频、动画”等多媒体信息，使网页设计更具冲击力；
            5）可制作表格，以便显示大量数据；
            6）可制作表单，允许在网页内输入文本信息，执行其他用户操作，方便信息互动；
            7）没有体现结构语义化的标签（常用命名方式如下，eg: <div id=“header”></div>, 该语句用来表示网站的头部）。

	HTML5： 1）用于绘画的canvas元素；
            2）用于媒介回放的video和audio元素；
            3）对本地离线存储有更好的支持；
            4）新的特殊内容元素（eg: article、footer、header、nav、section等）；
            5）新的表单控件（eg: calendar、date、time、email、url、search等）；
            6）有语义优势，提供了一些新标签，（eg: <header> <article> <footer> 提供了语义化标签），可以更好地支持搜索引擎的读取，便于SEO蜘蛛的爬行。

```



 <p id="html-31"> 31. ★★ 常见浏览器兼容性问题？

[常见的浏览器兼容问题]: https://blog.csdn.net/qq_39894133/article/details/79178328



```css
1、不同浏览器下的padding和margin不同
	解决方法：使用通配符(*)将padding和margin设置为0

2、块属性标签float之后，又有横向的margin值，在IE6中显示会比设置的大（IE6双边距bug）
	解决方法：在float标签样式控制中加入display:inline;

3、设置较小的高度标签（一般小于10px），在IE6，IE7，遨游中超出自己设置的高度
	解决方法：给超出高度的标签设置overflow:hidden;或者设置行高line-height小于你设置的高度。

4、行内标签设置display:block;后又采用float布局，再设置横向margin值时，在IE6中显示会比设置的大（IE6双边距bug）
	解决方法：在display:block;后面加上display:inline;display:table;

5、……更多请看链接
```



 <p id="html-32"> 32. ★ 块级元素？行内元素？空元素？

[详情]: https://www.cnblogs.com/xiaonian8/p/14035350.html



```css
块级元素：1. 可以设置宽高值，元素大小超出html文档会自动换行
		2. 外边距和内边距都可控制
		3. 可以容纳行内元素和其他块元素

行内元素：1. 不可以设置宽高值，元素紧跟在前一个元素后面，不会换行
		2. 宽度就是它的文字或图片的宽度，不可改变；
		3. 内联元素只能容纳文本或者其他内联元素；

空元素： 1. 没有闭合标签的标签被称作为空标签。
		2.在我们使用的标签中，有的具有闭合标签。例如<td>标签，它有闭合标签</td>。但是也有一部分标签没有闭合标签，例如<br />标签，这一类标签我们称之为空标签。

```



 <p id="html-33"> 33. ★★ media属性？screen? All? max-width? min-width?

[media多种方式]: https://www.runoob.com/?s=media



```css
media： 媒体查询

screen ：计算机屏幕

All ：默认，适合所有设备

max(min)-width ：规定目标显示区域的宽度

css合并写法： @media screen and (min-width:xxxpx) {}
```



 <p id="html-34"> 34. ★ meta标签的name属性值?

```css
解释：meta标签的 name 属性是用来定义一个 HTML 文档的描述、关键词，规定了元数据的名称，规定了content属性的信息/值的名称
属性值： 1. application-name  //规定页面所代表的Web应用程序的名称
		2. author     //规定页面文档的作者的名字
			实例： <meta name="author" content="作者名称">

		3. description    //规定页面的描述。搜索引擎会把这个描述显示在搜索结果中
			实例： <meta name="description" content="页面描述">

		4. gennerator    //规定用于生成文档的一个软件包（不用于手写页面）。
			实例： <meta name="generator" content="FrontPage 4.0">

		5. keywords    //规定一个逗号分隔的关键词列表 - 相关的网页（告诉搜索引擎页面是与什么相关的）。
			实例： <meta name="keywords" content="HTML, meta tag, tag reference"
			提示：总是规定关键词（对于搜索引擎进行页面分类是必要的）。

```



 <p id="html-35"> 35. ★★ 一般做手机页面切图的几种方式

[移动端界面切图]: https://blog.csdn.net/maomaog16/article/details/82107398
[页面切图]: https://blog.csdn.net/z1048956673/article/details/84306116



```css
1、DPR：2	-----  切两倍图，（即设计原图大小，因为设计图是按原来的手机尺寸放大两倍之后的）  一般保存为xxx@2x

2、DPR：3 -----   切三倍图（即设计原图大小的1.5倍，因为设计图是按原来的手机尺寸放大两倍之后的）     一般保存为xxx@3x

切图的注意事项：
    1、 尺寸：一定是要偶数
    2、 命名：命名需要符合功能板块
    3、 ……更多详情看链接

```



 <p id="html-36"> 36. ★★ px/em/rem有什么区别？为什么通常给font-size设置的字体为62.5%

```css
px（像素）：页面默认的尺寸计算单位，绝对长度,它是相对于显示器屏幕分辨率而言的

	特点：1. IE无法调整那些使用px作为单位的字体大小
		 2. 国外的大部分网站能够调整的原因在于其使用了em或rem作为字体单位；
		 3. Firefox能够调整px和em，rem，但是96%以上的中国网民使用IE浏览器(或内核)。


em：相对长度，相对于应用在当前元素的字体尺寸；一般浏览器默认字体大小为16px，则 1em = 16px

	特点：1. em的值并不是固定的；
		 2. em会继承父级元素的字体大小。


rem（root em）：相对单位，相对于html根元素字体大小的单位，当html的font-size：16px时，1rem = 16px

	特点：1. 这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。
		 2. 除了IE8及更早版本外，所有浏览器均已支持rem。


为什么给font-size设置为62.5%： 方便换算！
	1. 因为绝大多数浏览器的默认字体大小为 16px ，而将font-size设置为 62.5% 则等价于字体大小的font-size:10px;
	2. 随之在其他的换算单位，如 rem 的字体换算时，则可以表示为 1rem = 10px， 整数值对于单位的换算会比较方便

	3. 但是在Chrome（谷歌浏览器）中，支持最小字体的大小为 12px ，解决办法就是 将html根字体设置为 font-size: 625%; 意：1rem = 100px ，以此单位换算


```



 <p id="html-37"> 37. ★★ sass和scss有什么区别? sass一般怎么样编译的

[sass编译方式]: https://blog.csdn.net/weixin_44808483/article/details/113888787



```css
区别：1、sass 书写时不带大括号, scss 带大括号
 		例： sass-  .box
			  		 color:red

             scss-   .box{
				color:red;
               }
     2、 sass 没有 ; 号 , scss有

     3、 scss 写法和css 简直一样

sass编译：
	1. sass 是基于Ruby语言开发而成的，所以在使用 sass语言之前得先行安装Ruby编译器。
	2. Sass语言有两种后缀名，分别是 .sass 和 .scss ，两者只是写法有些许不同。
	3. 编译方式：
		1、命令行编译
			详情看链接↑
		2、插件保存编译
			详情看链接↑

```



 <p id="html-38"> 38. ★★ 如果对css进行优化如何处理？

[css性能优化]: https://zhuanlan.zhihu.com/p/41136812
[查询相关css操作触发重排和重绘]: https://csstriggers.com/



```css
优化原则：减少css样式的渲染加载时间，通过削减css样式的代码体积等相关操作

实践型优化：
    1、内联首屏关键CSS（Critical CSS）：内联CSS能够使浏览器开始页面渲染的时间提前
		* 性能优化中有一个重要的指标——首次有效绘制（First Meaningful Paint，简称FMP）即指页面的首要内容（primary content）出现在屏幕上的时间
		** 这一指标影响用户看到页面前所需等待的时间，而内联首屏关键CSS（即Critical CSS，可以称之为首屏关键CSS）能减少这一时间。

	注：内联css并不是不加以限制的，它的初始拥堵窗口3存在限制（TCP相关概念，通常是 14.6kb， 压缩后的大小），如果内联CSS后的文件超出了这一限制，系统就需要在服务器和浏览器之间进行更多次的往返，这样并不能提前页面渲染时间。

    2、异步加载CSS
		* CSS会阻塞渲染，在CSS文件请求、下载、解析完成之前，浏览器将不会渲染任何已处理的内容。
		** 有时，这种阻塞是必须的，因为我们并不希望在所需的CSS加载之前，浏览器就开始渲染页面。
		*** 那么将首屏关键CSS内联后，剩余的CSS内容的阻塞渲染就不是必需的了，可以使用外部CSS，并且异步加载

		方式一、 使用JavaScript动态创建样式表link元素，并插入到DOM中。

		方式二、 将link元素的media属性设置为用户浏览器不匹配的媒体类型（或媒体查询），如media="print"，甚至可以是完全不存在的类型media="noexist"。对浏览器来说，如果样式表不适用于当前媒体类型，其优先级会被放低，会在不阻塞页面渲染的情况下再进行下载。


    3、文件压缩
		* 通过相关的构建工具对css样式进行打包压缩，去除多余的空格和换行。如 webpack、rollup、grunt/gulp.js 等


    4、去除无用CSS
		1. 筛选去除相关重复的css样式
		2. 去除在页面中无法生效或不生效的css样式


建议型优化：
	1、有选择地使用选择器

	2、减少使用昂贵的属性
		1. 在浏览器绘制屏幕时，所有需要浏览器进行操作或计算的属性相对而言都需要花费更大的代价。

		2. 当页面发生重绘时，它们会降低浏览器的渲染性能。所以在编写CSS时，我们应该尽量减少使用昂贵属性
		* 昂贵属性： 如box-shadow/border-radius/filter/透明度/伪类:nth-child()等


	3、优化重排与重绘
		* 减少重排
			1. 重排会导致浏览器重新计算整个文档，重新构建渲染树，这一过程会降低浏览器的渲染速度。有很多操作会触发重排，我们应该避免频繁触发这些操作。

		** 避免不必要的重绘
			1. 当元素的外观（如color，background，visibility等属性）发生改变时，会触发重绘。
			2. 在网站的使用过程中，重绘是无法避免的。不过，浏览器对此做了优化，它会将多次的重排、重绘操作合并为一次执行。
			3. 不过我们仍需要避免不必要的重绘，如页面滚动时触发的hover事件，可以在滚动的时候禁用hover事件，这样页面在滚动时会更加流畅。


	4、不要使用@import
        *** 不建议使用@import主要有以下两点原因。

        * 首先，使用@import引入CSS会影响浏览器的并行下载。使用@import引用的CSS文件只有在引用它的那个css文件被下载、解析之后，浏览器才会知道还有另外一个css需要下载，这时才去下载，然后下载后开始解析、构建render tree等一系列操作。这就导致浏览器无法并行下载所需的样式文件。

        ** 其次，多个@import会导致下载顺序紊乱。在IE中，@import会引发资源文件的下载顺序被打乱，即排列在@import后面的js文件先于@import下载，并且打乱甚至破坏@import自身的并行下载
```



 <p id="html-39"> 39. ★★ 如何对css文件进行压缩合并? gulp如何实现？

[gulp实现代码打包压缩]: https://www.gowhich.com/blog/621



```css
如何压缩合并：
	** 通过相关的构建工具对css样式进行打包压缩，去除多余的空格和换行。如 webpack、rollup、grunt/gulp.js 等

gulp 如何实现css压缩合并
	* 看链接
```



 <p id="html-40"> 40. ★ 如何实现图片和文字在同一行显示?

```css

1. 给img标签添加 “vertical-align:middle”属性

2. 如果是背景图，则通过background的 定位属性来设置位置

3. 分别把图片和文字放入不同的div中，设置“vertical-align:middle”属性
```



 <p id="html-41"> 41. ★★ a标签中 active hover link visited 正确的设置顺序是什么?

[a]: https://www.cnblogs.com/fightjianxian/p/9313919.html



```css
a 标签的设置顺序：
	1. link ， 链接平常的状态
	2. hover ，鼠标放置在链接上显示的样式
	3. active ，链接被按下的样式
	4. visited ， 链接被访问过后的状态
```



 <p id="html-42"> 42.  手机端上图片长时间点击会选中图片，如何处理？

[css3参考手册]: https://www.css88.com/book/css/webkit/behavior/touch-callout.htm



```css
img{ pointer-events:none }，禁止事件，但会把整个标签的事件都禁用掉，不建议使用

img{ -webkit-user-select:none }，用户选中状态

推荐：
	img{
            -webkit-touch-callout: none; //触摸
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
```



 <p id="html-43"> 43. ★ 简述video标签的几个属性和方法

[video事件方法]: https://www.jianshu.com/p/a4dd94b2760e?utm_campaign=maleskine&amp;utm_content=note&amp;utm_medium=seo_notes&amp;utm_source=recommendation



```css
属性：
    src ：视频的属性
    poster：视频封面，没有播放时显示的图片
    preload：预加载
    autoplay：自动播放
    loop：循环播放
    controls：浏览器自带的控制条
    width：视频宽度
    height：视频高度
方法： 通过video id获取当前元素
	Media.paused; //是否暂停

    Media.defaultPlaybackRate = value;//默认的回放速度，可以设置

    Media.playbackRate = value;//当前播放速度，设置后马上改变

    Media.played; //返回已经播放的区域，TimeRanges，关于此对象见下文

    Media.seekable; //返回可以seek的区域 TimeRanges

    Media.ended; //是否结束

    Media.autoPlay; //是否自动播放

    Media.loop; //是否循环播放

    Media.play(); //播放

    Media.pause(); //暂停
    //视频控制

    Media.controls;//是否有默认控制条

    Media.volume = value; //音量

    Media.muted = value; //静音

```



 <p id="html-44"> 44. ★★ 常见的视频编码格式有几种？视频格式有几种？

[视频格式]: https://baike.baidu.com/item/%E8%A7%86%E9%A2%91%E6%A0%BC%E5%BC%8F#3



```css
常见的视频编码格式，H264 , VP8， AVS, RMVB，WMV，QuickTime（mov）

视频格式有MPEG、AVI、nAVI、ASF、MOV、3GP、WMV、DivX、XviD、RM、RMVB、FLV/F4V。
```



 <p id="html-45"> 45. ★★ canvas在标签上设置宽高和在style中设置宽高有什么区别？

```css
在canvas标签上设置宽高， canvas画布发生的变化不会影响到画布内容，即画布内容不会发生改变

相反的，在style样式中设置宽高则会影响到画布内容的形状
```



 <p id="html-46"> 46. ★ 什么是border-image？什么是box-sizing?

border-image:![1620298378082](C:\Users\007\AppData\Roaming\Typora\typora-user-images\1620298378082.png)

```css
border-image：字面意思为边框图片，它可以说是css3中的一个重量级属性，属于边框的一员；主要作用就是将图片规定为包围元素的边框
	API：可以简写
        border-image-source， //用在边框的图片的路径。
        border-image-slice   // 图片边框向内偏移
        border-image-width   //	图片边框的宽度
        border-image-outset   // 边框图像区域超出边框的量。
        border-image-repeat   //图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。

box-sizing：允许您以特定的方式定义匹配某个区域的特定元素。

	** 例如，假如您需要并排放置两个带边框的框，可通过将 box-sizing 设置为 "border-box"。这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中。



```



 <p id="html-47"> 47. ★★ 解释在ie低版本下的怪异盒模型和CSS3的怪异盒模型和弹性盒模型。

```css

```



 <p id="html-48"> 48. ★★ animation对应的属性。

```css

```



 <p id="html-49"> 49.  说说对transition的了解。

```css

```



 <p id="html-50"> 50. ★★ canvas如何绘制一个三角形|正方形

```css

```



 <p id="html-51"> 51. ★★ CSS清除浮动的几种方式

```css

```



 <p id="html-52"> 52.  为什么要初始化CSS样式？

```css

```



 <p id="html-53"> 53. ★★ 解释下CSS sprites，以及你要如何在页面或者网站中使用它。

```css

```



 <p id="html-54"> 54. ★★ a点击出现框，解决方法。

```css

```



 <p id="html-55"> 55. ★★ 如果我不输入<!DOCTYPE HTML>，HTML5能工作吗？

```css

```



 <p id="html-56"> 56. ★★ 哪些浏览器支持HTML5？

```css

```



 <p id="html-57"> 57.  CSS3中的选择器都有什么？

```css

```



 <p id="html-58"> 58. ★★ CSS3中多列布局的用处是什么？

```css

```



 <p id="html-59"> 59.  本地存储有生命周期吗？

```css

```



 <p id="html-60"> 60. ★★ 本地存储和Cookies之间的区别是什么？

```css

```



 <p id="html-61"> 61. ★★ WebSQL是什么？WebSQL是HTML5规范的一部分吗？

```css

```



 <p id="html-62"> 62. ★ XHTML与HTML的有何异同？

```css

```



 <p id="html-63"> 63. ★★ 介绍一下CSS的盒子模型？弹性盒子模型是什么？

```css

```



 <p id="html-64"> 64. ★★ Doctype的作用？标准模式与兼容模式各有什么区别？

```css

```



 <p id="html-65"> 65. ★★ 介绍一下你对浏览器内核的理解？常见的浏览器内核有哪些？

```css

```



 <p id="html-66"> 66. ★★ 前端页面有哪三层构成？ 分别是什么？ 作用是什么？

```css

```



 <p id="html-67"> 67.  CSS选择符有哪些？优先级算法如何计算？

```css

```



 <p id="html-68"> 68.  iframe的优缺点？

```css

```



 <p id="html-69"> 69. ★ 重排（reflow）与重绘（repaint）

```css

```



 <p id="html-70"> 70. ★★ 手写实现一个麻将三桶的布局。

```css

```



 <p id="html-71"> 71. ★ BFC 是什么东西

```css

```



 <p id="html-72"> 72. ★ flex布局有哪些属性

```css

```



 <p id="html-73"> 73. ★★ 列举你所知道的伪类和伪元素。伪类和伪元素有什么区别？

```css

```



 <p id="html-74"> 74. ★★ rem布局的本质。

```css

```



 <p id="html-75"> 75. ★ div+css的布局比较table布局有什么有点？

```css

```



 <p id="html-76"> 76. ★ 单行或者多行文本溢出展示省略号的实现方法。

```css

```



 <p id="html-77"> 77. ★ display:none和visbility:hidden的区别是什么啊？

```css

```



 <p id="html-78"> 78. ★★ 浮动元素引起的问题和解决方法？

```css

```



 <p id="html-79"> 79. ★★ 可以有哪些方法清除浮动？

```css

```



 <p id="html-80"> 80. ★★ `pointer-events: none` 是干什么的？

```css

```



`pointer-events: none; ` 表示元素不会对 `mouse/touch` 相关事件作出响应。

> 详细参考：https://segmentfault.com/a/1190000023070286

 <p id="html-81"> 81. ★★ 移动端通用的1px边框的实现原理？

**一、产生原因：**

为什么会产生这个问题呢？主要是跟一个东西有关，DPR(devicePixelRatio) 设备像素比，它是默认缩放为100%的情况下，设备像素和CSS像素的比值。

```txt
window.devicePixelRatio = 物理像素 /CSS像素
```

目前主流的屏幕DPR=2 （iPhone 8）, 或者3（iPhone 8 Plus）。拿2倍屏来说，设备的物理像素要实现1像素，而DPR=2，所以css 像素只能是 0.5。一般设计稿是按照750来设计的，它上面的1px是以750来参照的，而我们写css样式是以设备375为参照的，所以我们应该写的0.5px就好了啊！ 试过了就知道，iOS 8+系统支持，安卓系统不支持。

**二、解决方案：**

- WWDC对iOS统给出的方案
- 使用边框图片
- 使用box-shadow实现
- 使用伪元素（推荐）
- 设置viewport的scale值

**三、使用伪元素方案代码：**

1、stylus

```css
.border
  width 1rem
  height 1rem
  margin .2rem
  position relative
  &::after
    content ''
    position absolute
    z-index 999
    left 0
    right 0
    bottom 0
    top 0
    border solid 1px #f00
    @media (-webkit-max-device-pixel-ratio: 1.49)
      transform scale(1)
      width 100%
      height 100%

    @media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49)
      transform scale(0.5)
      width 200%
      height 200%

    @media (-webkit-min-device-pixel-ratio: 2.5)
      transform scale(0.3333333)
      width 300%
      height 300%

    transform-origin 0 0
```

2、sass

```css
@mixin border($border-width: 1px, $border-color: map-get($base, border-color), $border-style: solid, $radius: null) {
    // 为边框位置提供定位参考
    position: relative;
    @if $border-width == null {
        $border-width: 0;
    }
    border-radius: $radius;
    &::after {
        // 用以解决边框layer遮盖内容
        pointer-events: none;
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
        // fix当元素宽度出现小数时，边框可能显示不全的问题
        // overflow: hidden;
        content: "\0020";
        border-color: $border-color;
        border-style: $border-style;
        border-width: $border-width;
        // 适配dpr进行缩放
        @media (-webkit-max-device-pixel-ratio: 1.49) {
            width: 100%;
            height: 100%;
            @if $radius != null {
                border-radius: $radius;
            }
        }
        @media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49) {
            width: 200%;
            height: 200%;
            transform: scale(.5);
            @if $radius != null {
                border-radius: $radius * 2;
            }
        }
        (-webkit-min-device-pixel-ratio: 2.5) {
            width: 300%;
            height: 300%;
            transform: scale(.3333333);
            @if $radius != null {
                border-radius: $radius * 3;
            }
        }
        @include transform-origin(0 0);
    }
}
```

> 详细参考：https://juejin.cn/post/6844903877947424782

 <p id="html-82"> 82.  如何应用CSS获得当前设备的DPR？

 <p id="html-83"> 83. ★ 如何在页面上添加 iconfont？在样式如何添加字体文本？

```css
li::before
  height 1rem
  content: "\e60d"
```

 <p id="html-84"> 84. ★★ 如何设置10px的字体大小？

```css
b
  font-size .12rem
  font-weight 400
  transform scale(0.8)
```

 <p id="html-85"> 85. ★ 如何实现多行文本溢出隐藏？

```css
  ellipsis($width = 0, $line-clamp = 1)
  width $width
  display -webkit-box
  -webkit-line-clamp $line-clamp
  -webkit-box-orient vertical
  overflow hidden
```

 <p id="html-86"> 86. ★ 如何实现横向容器自动伸展？

```css
width max-content
```

 <p id="html-87"> 87. ★★ $nextTick 的使用场景？

- Better-Scroll

 <p id="html-88"> 88.  Better-Scroll 滚动条件？

- 容器的高度（宽度）要小于内容的高度（宽度）
- 容器的子元素要唯一
- new BScroll()时候，要有内容，如在Vue中，使用$nextTick()

 <p id="html-89"> 89. ★ position:sticky 用过没，有啥效果？

[使用 position:sticky 实现粘性布局](https://www.cnblogs.com/coco1s/p/6402723.html)



 <p id="html-90"> 90. ★ flex:1 的完整写法是？分别是什么意思？

[flex:1 到底代表什么?](https://zhuanlan.zhihu.com/p/136223806)



 <p id="html-91"> 91. ★ 说说你对GPU的理解，举例说明哪些元素能触发GPU硬件加速？

- GPU: 图形处理器,用于处理图形有关的任务,用于渲染页面

- 在css中使用 transform: translateZ(0), opacity, filter 可以开启GPU硬件加速。



 <p id="html-92"> 92. ★ 纯 CSS 方式实现 CSS 动画的暂停与播放

[纯 CSS 方式实现 CSS 动画的暂停与播放](https://www.cnblogs.com/libin-1/p/6645569.html)



 <p id="html-93"> 93. ★ 使用CSS3动画代替JS动画的好处

[为什么要用css动画替换js动画?](https://www.cnblogs.com/xiaonian8/p/13834656.html)



 <p id="html-94"> 94.  简述一下Sass，Less，请说明区别？

[Sass和Less的比较](https://www.cnblogs.com/pink-chen/p/10727915.html)

## js
 <p id="js-1"> 1. ★★ 介绍一下JS的内置类型有哪些？

```JS
1. 空类型:null
2. 未定义:undefined
3. 布尔:boolean
4. 数字:number
5. 字符串:string
6. 符号:symbol(ES6新增)
7. 对象:object
除了对象之外,其他为基本类型.
```

 <p id="js-2"> 2. ★ 介绍一下 typeof 区分类型的原理

```JS
typeof原理： 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息。

000: 对象
010: 浮点数
100:字符串
110: 布尔
1: 整数
/*----------------------------------------------*/
typeof null 为"object", 原因是因为 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"
```

 <p id="js-3"> 3.  介绍一下类型转换

```JS
/*-------------------显式转换---------------------*/
1. toString()  	// 转化为字符串，不可以转null和underfined
2. Number() 	// 转换为数字，字符串中有一个不是数值的字符，返回NaN
3. parseInt()	// 转换为数字，第一个字符不是数字或者符号就返回NaN
4. String() 	// 转换为字符串， 
5. Boolean() 	// 转换为布尔值
/*-------------------隐式转换(+-)---------------------*/
当 JavaScript 尝试操作一个 "错误" 的数据类型时，会自动转换为 "正确" 的数据类型
1. num  +  ""  -> String
2. num + bool -> num
// 当加号运算符时，String和其他类型时，其他类型都会转为 String；其他情况，都转化为Number类型

3. string - num -> num
// 其他运算符时， 基本类型都转换为 Number，String类型的带有字符的比如： 
4. 'a1' - num -> NaN
// 与undefined 一样。

/*-------------------隐式转换(逻辑表达式)---------------------*/

1. 对象和布尔值比较
对象和布尔值进行比较时，对象先转换为字符串，然后再转换为数字，布尔值直接转换为数字
[] == true;  //false  []转换为字符串'',然后转换为数字0,true转换为数字1，所以为false
2. 对象和字符串比较
对象和字符串进行比较时，对象转换为字符串，然后两者进行比较。
[1,2,3] == '1,2,3' // true  [1,2,3]转化为'1,2,3'，然后和'1,2,3'， so结果为true;
3. 对象和数字比较
对象和数字进行比较时，对象先转换为字符串，然后转换为数字，再和数字进行比较。
[1] == 1;  // true  `对象先转换为字符串再转换为数字，二者再比较 [1] => '1' => 1 所以结果为true
4. 字符串和数字比较
字符串和数字进行比较时，字符串转换成数字，二者再比较。
'1' == 1 // true
5. 字符串和布尔值比较
字符串和布尔值进行比较时，二者全部转换成数值再比较。
'1' == true; // true 
6. 布尔值和数字比较
布尔值和数字进行比较时，布尔转换为数字，二者比较。
true == 1 // true
```

 <p id="js-4"> 4. ★ 说说你对 JavaScript 的作用域的理解。什么是作用域链？

```JS
在 JavaScript 中有两种作用域类型：

1. 局部作用域:只能在函数内部访问它们
2. 全局作用域:网页的所有脚本和函数都能够访问它
JavaScript 拥有函数作用域：每个函数创建一个新的作用域。

作用域决定了这些变量的可访问性（可见性）。

函数内部定义的变量从函数外部是不可访问的（不可见的）。

作用域链：
当查找变量的时候，会先从当前上下文的变量对象中查找，
如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。
这样由多个执行上下文的变量对象构成的链表就叫做作用域链

```

 <p id="js-5"> 5. ★★ 解释下 let 和 const 的块级作用域

```JS
/*------------let-----------*/
1. let声明的仅在块级作用域内有效，
2. let不会发生变量提升的现象，所以一定要在定义后使用，否则报错。
3. 暂时性死区：只要块级作用域内存在let命令，它所声明的变量就绑定这个区域，不再受外部影响。
4. 不允许重复声明，let不允许在相同作用域内，重复声明同一个变量：
/*-----------const----------*/
1. 声明一个只读的常量。一旦声明，常量的值就不能改变。
2. 一旦声明，就要立即初始化，否则也报错。
3. const命令声明的常量也不提升，同样存在暂时性死区，只能在声明的位置后使用。
4. 也不可以重复声明。

```

 <p id="js-6"> 6. ★ 说说你对执行上下文的理解

```JS
执行上下文有且只有三类，全局执行上下文，函数上下文，与eval上下文(eval一般不会使用)
1. 全局执行上下文：
   全局执行上下文只有一个，也就是我们熟知的window对象，我们能在全局作用域中通过this直接访问到它
2. 函数执行上下文
   函数执行上下文可存在无数个，每当一个函数被调用时都会创建一个函数上下文；
   需要注意的是，同一个函数被多次调用，都会创建一个新的上下文。

3. 执行上下文栈(下文简称执行栈)也叫调用栈，
执行栈用于存储代码执行期间创建的所有上下文，具有LIFO（Last In First Out后进先出，也就是先进后出）的特性。

JS代码首次运行，都会先创建一个全局执行上下文并压入到执行栈中，之后每当有函数被调用，都会创建一个新的函数执行上下文并压入栈内；由于执行栈LIFO的特性，所以可以理解为，JS代码执行完毕前在执行栈底部永远有个全局执行上下文。
```

 <p id="js-7"> 7.  对闭包的看法，为什么要用闭包？说一下闭包的原理以及应用场景？闭包的 this 指向问题？

```JS
闭包的作用：
1. 在外部访问函数内部的变量
2. 让函数内的局部变量可以一直保存下去
3. 模块化私有属性和公共属性

闭包的原理：
全局变量生存周期是永久，局部变量生存周期随着函数的调用介绍而销毁。
闭包就是 在函数中定义且成为该函数内部返回的函数的自由变量 的变量，该变量不会随着外部函数调用结束而销毁。 
（注：不光是变量，函数内声明的函数也可以形成闭包）
当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。

闭包的应用场景：
// 1. 返回值 最常见的一种形式

    var fun_1 = function () {
      var name = "limo";
      return function () {      
        return name;
      }
    }
    var fun_1 = function () {
      var name = "limo";
      return name;
    }
    var fu_1 = fun_1();
    console.log("fu_1():" + fu_1());

// 2. 函数赋值 一种变形的形式是将内部函数赋值给一个外部变量

    var f2;
    var fun_2 = function () {
      var name = "limop"
      var a = function () {
        return name;
      }
      f2 = a;
    }
    f2();
    console.log(f2);

// 3. 函数参数 通过函数参数引用内部函数产生闭包

    var fn_3 = function (f3) {
      console.log(f3);
    }
    
    function fun_3() {
      var name = "limo";
      var a = function () {
        return name;
      }
      fn_3(a)
    }
    fun_3();

// 4. IIFE(自执行函数)

    var fn_4 = function (f4) {
      console.log(f4);
    };
    (function fun_4() {
      var name = "limo";
      var a = function () {
        return name;
      }
      fn_3(a)
    })();

// 5. 循环赋值

    function foo(){
      var arr = [];
      for(var i = 0; i < 10; i++){
        arr[i] = (function(n){
          return function(){
            return n;
          }
        })(i)
      }
      return arr;
    }
    var bar = foo();
    console.log(bar[3]());

// 6. getter和setter

    // getter和setter函数来将要操作的变量保存在函数内部，防止暴露在外部
    var getValue, setValue;
    (function () {
      var num = 0
      getValue = function () {
        return num
      }
      setValue = function (v) {
        if (typeof v === 'number') {
          num = v
        }
      }
    })();
    console.log(getValue());    //0
    setValue(10);
    console.log(getValue())     //10

// 7.迭代器（计数器）

    var add = function(){
      var num = 0;
      return function(){
        return ++num;
      }
    }();
    console.log(add());
    console.log(add());
    
    function setUp(arr){
      var i = 0;
      return function(){
        return arr[i++];
      }
    }
    var next = setUp(['Steve','Alex','LingYi']);
    console.log(next());
    console.log(next());
    console.log(next());

// 8.触发事件

    window.onload = function (){
      var btn = document.querySelector('.btn')
      btn.onclick = function (){//事件相当于在全局触发
        btn.style.color = 'red'//保持对上层作用域的引用 btn
        console.log('abc')
        // this
      }
    }

闭包的this指向问题：

var myNumber = {
  value: 1,
  add: function(i){
    var helper = function(i){
        console.log(this);
          this.value += i;
    }
    helper(i);
  }
}
myNumber.add(1);
1.this指向window对象（因为匿名函数的执行具有全局性，所以其this对象指向window）；
2.不能实现value加1（每个函数在被调用时都会自动取得两个特殊变量，this和arguments，内部函数在搜索这两个对象时，只会搜索到其活动对象为止，所以不能实现访问外部函数的this对象）；
3.修改代码实现正确功能

第一种解决方法：

var myNumber={
    value:1,
    add:function(i){
        var that=this;//定义变量that用于保存上层函数的this对象
        var helper=function(i){
             console.log(that);
        that.value+=i;
    }
    helper(i);
    }
}
myNumber.add(1);

第二种解决方法：

var myNumber={
    value:1,
    add:function(i){
        var helper=function(i){
            this.value+=i;
        }
        helper.apply(this,[i]);//使用apply改变helper的this对象指向，使其指向myNumber对象
    }
}
myNumber.add(1);
第三种解决方法

var myNumber={
    value:1,
    add:function(i){
        var helper=function(i){
            this.value+=i;
        }.bind(this,i);//使用bind绑定，和apply相似，只是它返回的是对函数的引用，不会立即执行
        helper(i);
    }
}
myNumber.add(1);
```



 <p id="js-8"> 8.  简述闭包的问题以及优化

```JS
闭包的缺点：占用内层空间 大量使用闭包会造成 栈溢出

由于闭包会一直占用内存空间，直到页面销毁，我们可以主动将已使用的闭包销毁：
将闭包函数赋值为null 可以销毁闭包
```

 <p id="js-9"> 9.  如何确定 this 指向？改变 this 指向的方式有哪些？

```JS
 this 指向：
1. 全局上下文（函数外）
无论是否为严格模式，均指向全局对象。注意:严格模式下全局对象为undifined
2. 函数上下文（函数内）
默认的，指向函数的调用对象，且是最直接的调用对象：
简单调用，指向全局对象注意:严格模式下全局对象为undifined，某些浏览器未实现此标准也可能会是window

改变this指向的方式：
1. 第一种： new关键字改变this指向

//构造函数版this
function Fn(){
    this.user = "李某";
}
var a = new Fn();
console.log(a.user); //李某
/*----------------------------------------*/
2. 第二种： call()
// 把b添加到第一个参数的环境中，简单来说，this就会指向那个对象
var a = {
    user:"李某",
    fn:function(){
        console.log(this.user); //李某
    }
}
var b = a.fn;
b.call(a);  //若不用call，则b()执行后this指的是Window对象
/*----------------------------------------*/
3. 第三种：apply()
// apply方法和call方法有些相似，它也可以改变this的指向，也可以有多个参数，但是不同的是，第二个参数必须是一个数组
var a = {
    user:"李某",
    fn:function(){
        console.log(this.user); //李某
    }
}
var b = a.fn;
b.apply(a);
/*----------------------------------------*/
4. 第四种：bind()
// bind方法返回的是一个修改过后的函数,
// bind也可以有多个参数，并且参数可以执行的时候再次添加，但是要注意的是，参数是按照形参的顺序进行的。
var a = {
    user:"李某",
    fn:function(){
        console.log(this.user); //李某
    }
}
var b = a.fn;
var c = b.bind(a);
c();
```

 <p id="js-10"> 10.  介绍箭头函数的 this

```JS
由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值
1. 所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
2. 考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略

作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象
```

 <p id="js-11"> 11.  谈一下你对原型链的理解，画一个经典的原型链图示

```JS
原型链:
因为每个对象和原型都有原型，对象的原型指向原型对象，
而父的原型又指向父的父，这种原型层层连接起来的就构成了原型链。
```

![img](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.mamicode.com%2Finfo%2F201809%2F20180917165312027007.png&refer=http%3A%2F%2Fimage.mamicode.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622810836&t=b6b151974ee8bbfb0e420a30caa148dd)

 <p id="js-12"> 12.  ES5/ES6 的继承除写法以外还有什么区别？

```JS
1. ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加 到 this 上(Parent.apply(this)).
2. ES6 的继承机制完全不同，实质上是先创建父类的实例对象 this(所以必 须先调用父类的super()方法)，然后再用子类的构造函数修改 this。
3. ES5 的继承时通过原型或构造函数机制来实现。
4. ES6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关 键字实现继承。
5. 子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因 为子类没有自己的 this对象，而是继承了父类的 this 对象，然后对其进行加工。 如果不调用 super 方法，子类得不到 this 对象。
6. 注意 super 关键字指代父类的实例，即父类的 this 对象。 注意:在子类构造函数中，调用 super 后，才可使用 this关键字，否则报错
```

 <p id="js-13"> 13. ★ 你对事件循环有了解吗？说说看

Event Loop(事件循环)中，每一次循环称为 tick, 每一次tick的任务如下：

- 执行栈选择最先进入队列的宏任务(通常是`script`整体代码)，如果有则执行
- 检查是否存在 Microtask，如果存在则不停的执行，直至清空 microtask 队列
- 更新render(每一次事件循环，浏览器都可能会去更新渲染)
- 重复以上步骤

宏任务 > 所有微任务 > 宏任务，如下图所示：

![img](https://segmentfault.com/img/remote/1460000015317438?w=587&h=528)

```JS
从上图我们可以看出：

1. 将所有任务看成两个队列：执行队列与事件队列。
2. 执行队列是同步的，事件队列是异步的，宏任务放入事件列表，微任务放入执行队列之后，事件队列之前。
3. 当执行完同步代码之后，就会执行位于执行列表之后的微任务，然后再执行事件列表中的宏任务
```

 <p id="js-14"> 14. ★ 微任务和宏任务有什么区别？

|                    | 宏任务（macrotask）                                          | 微任务（microtask）                                          |
| ------------------ | ----------------------------- | -------------------------------- |
| 谁发起的           | 宿主（Node、浏览器）                                         | JS引擎                                                       |
| 具体事件           | 1. script (可以理解为外层同步代码) 2. setTimeout/setInterval 3. UI rendering/UI事件 4. postMessage，MessageChannel 5. setImmediate，I/O（Node.js） | 1. Promise 2. MutaionObserver 3. Object.observe（已废弃；`Proxy` 对象替代） 4. process.nextTick（Node.js） |
| 谁先运行           | 后运行                                                       | 先运行                                                       |
| 会触发新一轮Tick吗 | 会                                                           | 不会                                                         |

 <p id="js-15"> 15. ★★ 浏览器和 Node 事件循环的区别？

浏览器中的事件循环：

![img](https://image.fundebug.com/2019-01-14-002.png)

Node中的事件循环：

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 libuv，libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现（下文会详细介绍）。

![img](https://image.fundebug.com/2019-01-14-004.png)

Node.js 的运行机制如下:

- V8 引擎解析 JavaScript 脚本。
- 解析后的代码，调用 Node API。
- libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
- V8 引擎再将结果返回给用户。


 <p id="js-16"> 16.  异步解决方案有哪些？

```JS
解决方案：
/*---------1.回调函数callback：----------*/
被作为实参传入另一函数，并在该外部函数内被调用，用以来完成某些任务的函数。如setTimeOut，ajax请求，readFile等。
例：

function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('请输入你的名字。');
  callback(name);
}

processUserInput(greeting);
优点：
解决了异步的问题。

缺点：
回调地狱：多个回调函数嵌套的情况，使代码看起来很混乱，不易于维护。

/*---------2.事件发布订阅：---------*/
当一个任务执行完成后，会发布一个事件，当这个事件有一个或多个‘订阅者’的时候，会接收到这个事件的发布，执行相应的任务，这种模式叫发布订阅模式。如node的events,dom的事件绑定
例：

document.body.addEventListener('click',function(){
  alert('订阅了');
},false);
document.body.click(); 
优点：
时间对象上的解耦。

缺点：
消耗内存，过度使用会使代码难以维护和理解

/*---------3.Promise：---------*/
Promise是es6提出的异步编程的一种解决方案。
Promise 对象有三种状态：

pending: 初始状态，既不是成功，也不是失败状态。
fulfilled: 意味着操作成功完成。
rejected: 意味着操作失败。
promise的状态只能从pending变成fulfilled，和pending变成rejected，状态一旦改变，就不会再改变，且只有异步操作的结果才能改变promise的状态。
例：
let promise = new Promise(function (resolve, reject) {
    fs.readFile('./1.txt', 'utf8', function (err, data) {
        resolve(data)
    })
})

promise
    .then(function (data) {
        console.log(data)
    })
优点：
解决了回调地狱的问题，将异步操作以同步操作的流程表达出来。

缺点：
无法取消promise。如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。当执行多个Promise时，一堆then看起来也很不友好。

/*---------4.Generator：---------*/
Generator是es6提出的另一种异步编程解决方案，需要在函数名之前加一个*号，函数内部使用yield语句。Generaotr函数会返回一个遍历器，可以进行遍历操作执行每个中断点yield。
例：

function * count() {
  yield 1
  yield 2
  return 3
}
var c = count()
console.log(c.next()) // { value: 1, done: false }
console.log(c.next()) // { value: 2, done: false }
console.log(c.next()) // { value: 3, done: true }
console.log(c.next()) // { value: undefined, done: true }
优点：
没有了Promise的一堆then(),异步操作更像同步操作，代码更加清晰。

缺点：
不能自动执行异步操作，需要写多个next()方法，需要配合使用Thunk函数和Co模块才能做到自动执行。


/*---------5.async/await：---------*/
async是es2017引入的异步操作解决方案，可以理解为Generator的语法糖，async等同于Generator和co模块的封装，async 函数返回一个 Promise。
例：

async function read() {
 let readA = await readFile('data/a.txt')
 let readB = await readFile('data/b.txt')
 let readC = await readFile('data/c.txt')

 console.log(readA)
 console.log(readB)
 console.log(readC)
}

read()
优点：
内置执行器，比Generator操作更简单。async/await比*yield语义更清晰。返回值是Promise对象，可以用then指定下一步操作。代码更整洁。可以捕获同步和异步的错误。
```

 <p id="js-17"> 17.  async 和 await 、promise的区别 和 这两个的本质

```JS
/*---------Promise概念：---------*/
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大，简单地说，Promise好比容器，里面存放着一些未来才会执行完毕（异步）的事件的结果，而这些结果一旦生成是无法改变的

/*---------async await概念：---------*/
async await也是异步编程的一种解决方案，他遵循的是Generator 函数的语法糖，他拥有内置执行器，不需要额外的调用直接会自动执行并输出结果，它返回的是一个Promise对象。

两者的区别：
Promise的出现解决了传统callback函数导致的“地域回调”问题，但它的语法导致了它向纵向发展行成了一个回调链，遇到复杂的业务场景，这样的语法显然也是不美观的。而async await代码看起来会简洁些，使得异步代码看起来像同步代码，await的本质是可以提供等同于”同步效果“的等待异步返回能力的语法糖，只有这一句代码执行完，才会执行下一句。

async await与Promise一样，是非阻塞的。

async await是基于Promise实现的，可以说是改良版的Promise，它不能用于普通的回调函数。
```

 <p id="js-18"> 18.  简述 aync await 的好处

```JS
1. async/await最重要的好处是同步编程风格
2. async/await有本地浏览器支持。截至今天，所有主流浏览器 查看都完全支持异步功能。
3. async关键字。它声明 getBooksByAuthorWithAwait()函数返回值确保是一个 promise，以便调用者可以安全调用 getBooksByAuthorWithAwait().then(...)或 await getBooksByAuthorWithAwait()
```

 <p id="js-19"> 19.  移动端点击事件 300ms 延迟如何去掉？原因是什么？

```JS
300毫秒原因：
当用户第一次点击屏幕后，需要判断用户是否要进行双击操作，于是手机会等待300毫秒，
解决方法：FastClick.js
FastClick 是 FT Labs 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库。FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。
```

 <p id="js-20"> 20.  Cookie 有哪些属性？其中HttpOnly，Secure，Expire分别有什么作用？

```JS
Cookie属性：
name　　字段为一个cookie的名称。
value　　字段为一个cookie的值。
domain　　字段为可以访问此cookie的域名。
path　　字段为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。
expires/Max-Age 　　字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。
Size　　字段 此cookie大小。
http　　字段  cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。
secure　　 字段 设置是否只能通过https来传递此条cookie

1 secure属性
当设置为true时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该信息，所以不会被窃取到Cookie 的具体内容。
2 HttpOnly属性
如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。
3 Expire属性
设置Cookie的失效时间：
```

 <p id="js-21"> 21. ★ 如何实现函数的柯里化？比如 add(1)(2)(3)

```JS
/*-----解决方法1：-----*/
function add () {
  var args = Array.prototype.slice.call(arguments);

  var fn = function () {
    var sub_arg = Array.prototype.slice.call(arguments);
　　 // 把全部的参数聚集到参数的入口为一个参数： args.concat(sub_arg)
    return add.apply(null, args.concat(sub_arg));
  }

  fn.valueOf = function () {
  return args.reduce(function(a, b) {
      return a + b;
    })
  }

  return fn;
}
console.log(add(1,2)) // 3
console.log(add(1)(2)) // 3
console.log(add(1)(2)(3)) // 6
console.log(add(1,2,3)(4)) // 10

/*-----解决方法2：-----*/

function add () {
    var args = Array.prototype.slice.call(arguments);

    var fn = function () {
        // 把参数都放在一个相当于全局变量的 args 里面　
        args.push(...arguments)
        return fn;
    }

    fn.valueOf = function () {
        return args.reduce(function(a, b) {
            return a + b;
        })
    }

    return fn;
}
console.log(add(1,2)) // 3
console.log(add(1)(2)) // 3
console.log(add(1)(2)(3)) // 6
console.log(add(1,2,3)(4)) // 10
```

 <p id="js-22"> 22. ★ 什么是反柯里化

```JS
在JavaScript中，当我们调用对象的某个方法时，其实不用去关心该对象原本是否被设计为拥有这个方法，这是动态类型语言的特点。可以通过反柯里化(uncurrying)函数实现，让一个对象去借用一个原本不属于他的方法。
```

 <p id="js-23"> 23. ★★ 将 [1,2] 与 [3,[4]] 合并为 [1,2,3,[4]]

```JS
JS数组合并方法:
let arr3 = [1,2].concat([3,[4]]);	//[1,2,3,[4]]
```

 <p id="js-24"> 24. ★★ Array.forEach() 与 Array.map() 的区别，Array.slice() 与 Array.splice() 的区别？

```JS
/*-----forEach-----*/
forEach不支持return,对原来的数组也没有影响。但是我们可以自己通过数组的索引来修改原来的数组

var ary = [12,23,24,42,1];
var res = ary.forEach(function (item,index,input) {
     input[index] = item*10;
})
console.log(res);//-->undefined;
console.log(ary);//-->会对原来的数组产生改变；
/*-----map-----*/
map支持return返回值，也不影响原数组，但是会返回一个新的数组

var ary = [12,23,24,42,1];
var res = ary.map(function (item,index,input) {
     return item*10;
})
console.log(res);//-->[120,230,240,420,10];
console.log(ary);//-->[12,23,24,42,1]；

array.slice(start,end)函数是取array数组中指定的一些元素：
根据数组下标start和end，两个参数为取值的开始和结束下标，取出的值不包括end位置的值，生成一个新数组作为返回值；
这里end可以为空，为空则取从start位置到数组结尾的元素，生成新数组。

array.splice(start,length,insert_one......)函数则是直接在原数组进行删除、添加、替换元素的操作：
start为数组删除元素的开始下标，
length为从start位置开始array删除元素的个数，
后面参数为删除之后array重新插入的数据内容，插入位置为删除位置，而非数组开头或末尾，
返回值为array删除的元素组成的数组。
显而易见，splice函数可以用来对数组元素进行替换。由splice操作后的数组array，数组中内容如果已经改变，就再也找不回array在splice之前的模样。
```

 <p id="js-25"> 25. ★★ 将 1234567 转换为 1,234,567

```JS
function fun(n){
    return String(n).replace(/(?!^)(?=(\d{3})+\.)/g, ",") 
}
```

 <p id="js-26"> 26.  bind 的作用是什么？

```JS
bind()方法主要就是将函数绑定到某个对象，
bind()会创建一个函数，函数体内的this对象的值会被绑定到传入bind()第一个参数的值
```

 <p id="js-27"> 27. ★★ Promise.resolve(Promise.resolve(1)).then(console.log) 输出？

```JS
// 答案：1
```

 <p id="js-28"> 28.  var let const的区别

```JS
1. var声明的变量会挂载在window上，而let和const声明的变量不会
2. var声明变量存在变量提升，let和const不存在变量提升
3. let和const声明形成块作用域
4. 同一作用域下let和const不能声明同名变量，而var可以
5. 使用let/const声明的变量在当前作用域存在暂存死区
6. const一旦声明必须赋值,不能使用null占位,声明后不能再修改,如果声明的是复合类型数据，可以修改其属性
```

 <p id="js-29"> 29.  document load 和 documen ready的区别

```JS
DOM文档解析：

解析html结构
加载脚本和样式文件
解析并执行脚本
构造html的DOM模型      //ready
加载图片等外部资源文件
页面加载完毕           //load

document load:
load是当页面所有资源全部加载完成后（包括DOM文档树，css文件，js文件，图片资源等），执行一个函数，load方法就是onload事件。

documen ready:
构造html的DOM模型加载完毕后触发
```

 <p id="js-30"> 30.  如何自定义事件？

```JS
自定义事件
事件是与DOM交互的最常见的方式。通过实现自定义事件，可以让事件用于非DOM代码中。
思想：创建一个管理事件的对象，让其他对象监听那些事件。

基本模式：

function EventTarget(){
    this.handlers = {};
}

EventTarget.prototype = {
    constructor:EventTarget,
    addHandler:function(type,handler){
        if(typeof this.handlers[type] === "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    fire:function(event){
        if(!event.target){
            event.target = this;
        }
        if(this.handlers[event.type] instanceof Array){
            const handlers = this.handlers[event.type];
            handlers.forEach((handler)=>{
                handler(event);
            })
        }
    },
    removeHandler:function(type,handler){
        if(this.handlers[type] instanceof Array){
            const handlers = this.handlers[type];
            for(var i = 0,len = handlers.length; i < len; i++){
                if(handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i,1);
        }
    }
}
```

 <p id="js-31"> 31.  如何用 setTImeout 来实现 setInterval？

```JS
1.不去关心回调函数是否还在运行
在某些情况下，函数可能需要比间隔时间更长的时间去完成执行。比如说是用setInterval每隔5秒对远端服务器进行轮询，网络延迟，服务器无响应以及其他因素将会阻止请求按时按成。结果会导致返回一串无必要的排成队列请求。

2.忽视错误
因为某些原因，setInterval调用的代码中会出现一个错误，但是代码并不会中止执行而是继续执行错误的代码。

3.缺乏灵活性
除了前面提到的缺点之外，我非常希望setInterval方法能有一个表明执行次数的参数而不是无休止的执行下去。

function interval(func, w, t){
    var interv = function(){
        if(typeof t === "undefined" || t-- > 0){
            setTimeout(interv, w);
            try{
                func.call(null);
            }
            catch(e){
                t = 0;
                throw e.toString();
            }
        }
    };
    setTimeout(interv, w);
};

```

 <p id="js-32"> 32.  如何判断 user 对象里有没有 a 这个属性？如果把user对象中所有的属性都输出出来？

`(var user = {'a': '19', 'b': '18', 'c':  '16'})`

```JS
如何判断 user 对象里有没有 a 这个属性？

js对象的Object.hasOwnProperty()方法
返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。

let obj = new Object();
obj.a = "123";
console.log(obj.hasOwnProperty('a'))  // true
console.log(obj.hasOwnProperty('b'))  // false

把user对象中所有的属性都输出出来
for(item for user){
    console.log(item)
}
```

 <p id="js-33"> 33. ★★ 使用 setTimeout 模拟 setInterval 的功能做一个60秒的倒数计时

```JS
function setInter(s,fn){
  let timeOut = (s,fn)=>{
      setTimeout(()=>{
        fn();
        timeOut(s,fn);
      },s)
  }
  timeOut(s,fn);
}
 
//调用上面的方法
setInter(60000,()=>{console.log("hello world!")})
```

 <p id="js-34"> 34.  实现一个函数 add()，运算结果可以满足如下预期结果

```JS
function add () {
  var args = Array.prototype.slice.call(arguments);

  var fn = function () {
    var sub_arg = Array.prototype.slice.call(arguments);
　　 // 把全部的参数聚集到参数的入口为一个参数： args.concat(sub_arg)
    return add.apply(null, args.concat(sub_arg));
  }

  fn.valueOf = function () {
  return args.reduce(function(a, b) {
      return a + b;
    })
  }

  return fn;
}
```

  ```JS
add(1,2,3)(10) //16
add(1)(2)(3,4)(5) //15
  ```

 <p id="js-35"> 35.  如何避免回调地狱？

```JS
1. Promise 对象就是为了解决这个问题而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。

promise只有两个状态resolve和reject，当它触发任何一个状态后，它会将当前的值缓存起来，并在有回调函数添加进来的时候尝试调用回调函数，如果这个时候还没有触发resolve或者reject，那么回调函数会被缓存，等待调用，如果已经有了状态(resolve或者reject)，则立刻调用回调函数。并且所有回调函数在执行后都立即被销毁。

2. ES6 co/yield方案
yield: Generator 函数是协程在 ES6 的实现，而yield是 Generator关键字， 异步操作需要暂停的地方，都用yield语句注明。
co: co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。

3. ES7 async/await 方案
async/await是es7的新标准，并且在node7.0中已经得到支持。
它就是 Generator 函数的语法糖，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。可以理解官方对co和Generator 封装方案。
```

 <p id="js-36"> 36. ★★ 写一个 function，清除字符串前后的空格。（兼容所有的浏览器）

```JS
function trim(str) {
    if (str && typeof str === "string") {
        return str.replace(/(^\s*)|(\s*)$/g,""); //去除前后空白符
    }
}
```

 <p id="js-37"> 37. ★★ 使用正则表达式验证邮箱格式

```JS
function fChkMail(emailAddress){ 
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
    var bChk=reg.test(emailAddress); 
    return bChk; 
}
```

 <p id="js-38"> 38.  简述同步和异步的区别

```JS
同步：
同步的思想是：所有的操作都做完，才返回给用户。这样用户在线等待的时间太长，给用户一种卡死了的感觉（就是系统迁移中，点击了迁移，界面就不动了，但是程序还在执行，卡死了的感觉）。这种情况下，用户不能关闭界面，如果关闭了，即迁移程序就中断了。

异步：
将用户请求放入消息队列，并反馈给用户，系统迁移程序已经启动，你可以关闭浏览器了。然后程序再慢慢地去写入数据库去。这就是异步。但是用户没有卡死的感觉，会告诉你，你的请求系统已经响应了。你可以关闭界面了。

同步和异步本身是相对的:
同步就相当于是 当客户端发送请求给服务端，在等待服务端响应的请求时，客户端不做其他的事情。当服务端做完了才返回到客户端。这样的话客户端需要一直等待。用户使用起来会有不友好。

异步就是，当客户端发送给服务端请求时，在等待服务端响应的时候，客户端可以做其他的事情，这样节约了时间，提高了效率。

存在就有其道理 异步虽然好 但是有些问题是要用同步用来解决，比如有些东西我们需要的是拿到返回的数据在进行操作的。这些是异步所无法解决的。
```

 <p id="js-39"> 39. ★★ JavaScript 中 callee 和 caller 的作用

```JS
1.callee
callee是对象的一个属性，该属性是一个指针，指向参数arguments对象的函数
作用：就是用来指向当前对象
返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文. 
callee是arguments 的一个属性成员，它表示对函数对象本身的引用，这有利于匿名 
函数的递归或者保证函数的封装性

2.caller
caller是函数对象的一个属性，该属性保存着调用当前函数的函数的引用（指向当前函数的直接父函数）
返回一个对函数的引用，该函数调用了当前函数。
functionName.caller
functionName 对象是所执行函数的名称。
注意：
对于函数来说，caller 属性只有在函数执行时才有定义。 如果函数是由 Javascript 程序的顶层调用的，那么 caller 包含的就是 null 。
```

 <p id="js-40"> 40. ★★ 统计字符串中字母个数或统计最多的字母数

```JS
function count(str) {
  var obj = {}; // 统计对象
  var i = 0;
  var len = str.length;
  for (; i < len; i++){
    var curChar = str.charAt(i); 
    // 如果结果对象存在该字符的属性，则自增，否则置为1
    if (obj[curChar]) {
      obj[curChar]++;
    } else {
      obj[curChar] = 1;
    }
  }
  // 返回结果
  return obj;
}
var str = "javaScript";
console.log(count(str));
```

 <p id="js-41"> 41.  jQuery 的事件委托方法 on，live，delegate之间有区别？

```JS
live 把事件委托交给了document（根节点），document 向下去寻找符合条件的元素（）， 不用等待document加载结束也可以生效。

delegate可指定事件委托对象，相比于live性能更优，直接锁定指定选择器；

on事件委托对象选填，如果不填，即给对象自身注册事件，填了作用和delegate一致。
```

 <p id="js-42"> 42.  简述下 Promise 对象

```JS
Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理更强大。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件 (通常是一个异步操作)的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

Promise对象有以下2个特点：
1.对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending(进行中)、Resolved(已完成)和Rejected(已失败)。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved；从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象田静回调函数，也会立即得到这个结果。这与事件(Event)完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以把异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供了统一的接口，使得控制异步操作更加容易。
```

 <p id="js-43"> 43.  数组扁平化，不用 api

```JS
function myFlat(arr){
    let res = [];
    for(let i=0; i<arr.length; i++){   
        if(arr[i] instanceof Array){
            res = res.concat(myFlat(arr[i]));
        }else {
            res.push(arr[i]);
        }
    }
    return res;
}
 
let arr = [1,[2,3,[4,5]]];
console.log(myFlat(arr))
```

 <p id="js-44"> 44.  用 JavaScript 实现观察者模式

```JS
function BusinessOne(name){
	this.name = name;
	//订阅者的集合
	this.subscribers = new Array();
}
//订阅者的发送消息的方法(推模式)
BusinessOne.prototype.delive = function(news){
	var self = this;
	//给每一个订阅者发送消息
	this.subscribers.forEach(
		function(fn){
			//调用接受者处理信息的函数
			fn(news,self);
		}
	)
}
//扩展公共订阅的函数,和取消订阅的函数
Function.prototype.subscribe = function(publisher){
	var that = this;
	//some 访问数组度i型并且以参数的形式传回回调函数中
	//只要至少有一次返回是true那么some就是true
	var alreadyExists = publisher.subscribers.some(
		function(el){
			//处理不能重复订阅的功能
			if(el == that){
				return;
			}
		}
	);
	//没用订阅你就可以订阅
	if(!alreadyExists){
		publisher.subscribers.push(that);
	}
	return this;
}
//取消
Function.prototype.unsubscribe = function(publisher){
	var that = this;
	publisher.subscribers = publisher.subscribers.filter(
		function(el){
			if(el !== that){
				return el;
			}
		}
	);
	return this;
};
```

 <p id="js-45"> 45. ★★ 简述一下面象对象的六法则

```JS
1. 单一职责原则：一个类只做它该做的事情
2. 开闭原则：软件实体应当对扩展开放，对修改关闭
3. 依赖倒转原则：面向接口编程
4. 接口隔离原则：接口要小而专，绝不能大而全
5. 合成聚合复用原则：优先使用聚合或合成关系复用代码
6. 迪米特法则：迪米特法则又叫最少知识原则，一个对象应当对其他对象有尽可能少的了解(低耦合)
```

 <p id="js-46"> 46.  谈谈垃圾回收机制方法以及内存管理

```JS
垃圾回收方式
① 标记清除
工作原理：是当变量进入环境时，将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存。
② 引用计数
工作原理：跟踪记录每个值被引用的次数。一旦没有引用，内存就直接释放了。

内存管理
什么时候触发垃圾回收？
垃圾回收器周期性运行，如果分配的内存非常多，那么回收工作也会很艰巨，确定垃圾回收时间间隔就变成了一个值得思考的问题。
1、合理的GC方案：(1)、遍历所有可访问的对象; (2)、回收已不可访问的对象。
2、GC缺陷：		(1)、停止响应其他操作；
3、GC优化策略：  (1)、分代回收（Generation GC）;(2)、增量GC
```

 <p id="js-47"> 47.  开发过程中遇到内存泄漏的问题都有哪些？

```JS
1. 当页面中元素被移除或替换时，若元素绑定的事件仍没被移除，在IE中不会作出恰当处理，此时要先手工移除事件，不然会存在内存泄露。
2. 由于是函数内定义函数，并且内部函数--事件回调的引用外暴了，形成了闭包。闭包可以维持函数内局部变量，使其得不到释放。
```

 <p id="js-48"> 48.  请编写获取当前窗口地址中查询参数name的值，当前窗口地址为：<https://foo.com/?id=1&name=tom>

```JS
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]); 
    return null;
}
```

 <p id="js-49"> 49.  已知a，b两个构造函数，现在 let c = new a()，如何在c的存储地址不变的情况下，改变c的继承（c->a 转为 c->b）

```JS
1. 改变原型链：通过改变C的prototype为b,实现内存地址不动，改变继承
```

 <p id="js-50"> 50.  浏览器有哪些兼容问题，你封装过什么插件

```JS
//1.滚动条到顶端的距离（滚动高度）
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
 
//2.滚动条到左端的距离
var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
 
//3. IE9以下byClassName
function byClassName(obj,className){
    //判断是否支持byClassName
    if(obj.getElementsByClassName){
        //支持
        return obj.getElementsByClassName(className);
    }else{
        //不支持
        var eles = obj.getElementsByTagName('*'); //获取所有的标签
        var arr = []; //空数组，准备放置找到的对象
        //遍历所有的标签
        for(var i = 0,len = eles.length;i < len;i ++){
            //找出与我指定class名相同的对象
            if(eles[i].className === className){
                arr.push(eles[i]); //存入数组
            }
        }
        return arr; //返回
    }
}

//4. 获取非行内样式兼容    IE:currentStyle  标准：getComputedStyle
function getStyle(obj,attr){
    return window.getComputedStyle ? getComputedStyle(obj,true)[attr] : obj.currentStyle[attr];
}
//div.style.width =  '';设置样式
//obj['属性']： 对象是变量时，必须用对象['属性']获取。

//5. 获取事件对象的兼容
evt = evt || window.event

//6. 获取鼠标编码值的兼容
function getButton(evt){
    var e = evt || window.event;
    if(evt){
        return e.button;
    }else if(window.event){
        switch(e.button){
            case 1 : return 0;
            case 4 : return 1;
            case 2 : return 2;
        }
    }
}

//7. 获取键盘按键编码值的兼容
var key = evt.keyCode || evt.charCode || evt.which;

//8. 阻止事件冒泡的兼容
e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;

//9. 阻止超链接的默认行为的兼容
evt.preventDefault ? evt.preventDefault() : evt.returnValue = false;

//10. 添加事件监听器的兼容
function addEventListener(obj,event,fn,boo){
    if(obj.addEventListener){
        obj.addEventListener(event,fn,boo);
    }else if(obj.attachEvent){
        obj.attachEvent('on' + event,fn);
    }
}

//11. 移除事件监听器的兼容
function removeEventListener(obj,event,fn,boo){
    if(obj.removeEventListener){
        obj.removeEventListener(event,fn,boo);
    }else if(obj.detachEvent){
        obj.detachEvent('on' + event,fn);
    }
}

//12. 获取事件源的兼容
var target = event.target || event.srcElement;
```

 <p id="js-51"> 51.  如何判断一个对象是否为数组，函数

```JS
方法一： instanceof:
var arr=[];
console.log(arr instanceof Array) //返回true

方法二： constructor:
console.log(arr.constructor == Array); //返回true

方法三： Array.isArray()
console.log(Array.isArray(arr)); //返回true
```

 <p id="js-52"> 52.  写一个函数，接受可变个数参数，且每个参数均为数字，返回参数的最大值

```JS
function myMax(){
    return Math.max(arguments)
}
```

 <p id="js-53"> 53.  请写出 ES6 Array.isArray()

```JS
if (!Array.isArray){
  Array.isArray = function(arg){
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

 <p id="js-54"> 54.  实现一个函数 clone，可以对 JavaScript 中的5种主要数据类型进行值复制

```JS
// 方法一：
Object.prototype.clone = function() {
    var o = this.constructor === Array ? [] : {};
    for (var e in this) {
        o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
    }
    return o;
};

//方法二：
/**
     * 克隆一个对象
     * @param Obj
     * @returns
     */
function clone(Obj) {
    var buf;
    if (Obj instanceof Array) {
        buf = []; //创建一个空的数组
        var i = Obj.length;
        while (i--) {
            buf[i] = clone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object) {
        buf = {}; //创建一个空对象
        for (var k in Obj) {
            //为这个对象添加新的属性
            buf[k] = clone(Obj[k]);
        }
        return buf;
    } else {
        //普通变量直接赋值
        return Obj;
    }
}
```

 <p id="js-55"> 55.  假如A页面我定义了一个定时器，然后跳到B页面如果让A页面的定时器暂停

```JS
方法1：在beforeDestroy()等生命周期结束阶段内清除定时器：
beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
}

方法2：通过$once这个事件侦听器器在定义完定时器之后的位置来清除定时器。

const timer = setInterval(() =>{
    // 某些定时器操作
}, 500);
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {
    clearInterval(timer);
})
```

 <p id="js-56"> 56.  promise的实现原理，如果我现在向服务器发送一个请求，但是我后悔了，不想让服务器返回数据，去实现一个delay

```JS
取消结束Promise的方法？
1. 返回一个pending状态的Promise，原Promise链会终止
Promise.resolve().then(() => {
    console.log('ok1')
    return new Promise(()=>{})  // 返回“pending”状态的Promise对象
}).then(() => {
    // 后续的函数不会被调用
    console.log('ok2')
}).catch(err => {
    console.log('err->', err)
})

2. Promise.race竞速方法

let p1 = new Promise((resolve, reject) => {
    resolve('ok1')
})
 
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {resolve('ok2')}, 10)
})
 
Promise.race([p2, p1]).then((result) => {
    console.log(result) //ok1
}).catch((error) => {
    console.log(error)
})

3. 当Promise链中抛出错误时，错误信息沿着链路向后传递，直至捕获
Promise.resolve().then(() => {
    console.log('ok1')
    throw 'throw error1'
}).then(() => {
    console.log('ok2')
}, err => {     
    // 捕获错误
    console.log('err->', err)
}).then(() => {   
    // 该函数将被调用
    console.log('ok3')
    throw 'throw error3'
}).then(() => {
    // 错误捕获前的函数不会被调用
    console.log('ok4')
}).catch(err => {
    console.log('err->', err)

Axios如何取消请求？
第一种通过CancelToken.source工厂方法创建cancel token

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
第二种通过传递executor函数到CancelToken的构造函数来创建cancel token

var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```

 <p id="js-57"> 57.  CommonJS 和 RequireJS 的实现原理

```JS
commonjs是通过module.exports导出模块,用require引入一个模块，原理：闭包

requirejs是通过define定义导出模块，用require引入模块。
define('name',[],function(){
    return 'requirejs'
})
define('say',['name'].function(name){
    return "my name is" + name
})
require(['say'],function(text){
    console.log(text)
})

```

 <p id="js-58"> 58.  面向对象编程与面向过程编程的区别？

```JS
面向过程的程序设计把计算机程序视为一系列的命令集合，即一组函数的顺序执行。为了简化程序设计，面向过程把函数继续切分为子函数，即把大块函数通过切割成小块函数来降低系统的复杂度。

而面向对象的程序设计把计算机程序视为一组对象的集合，而每个对象都可以接收其他对象发过来的消息，并处理这些消息，计算机程序的执行就是一系列消息在各个对象之间传递。
```

 <p id="js-59"> 59.  eval 是做什么的？性能怎么样？安全如何？

```JS
它的功能是把对应的字符串解析成js代码并运行，

应该避免使用eval,因为不安全，非常耗性能（2次，一次解析成js语句，一次执行）

注意：在项目里写js代码的时候，禁止使用的，因为有安全因素。
```

 <p id="js-60"> 60. ★★ 函数节流、防抖。scroll resize 使用函数节流实现不要频繁触发事件的需求

```JS
// 答案：
防抖：
//scroll方法中的do somthing至少间隔500毫秒执行一次
    window.addEventListener('scroll',function(){
        var timer;//使用闭包，缓存变量
        return function(){
            if(timer) clearTimeout(timer);
            timer = setTimeout(function(){
                console.log('do somthing')
            },500)
        }
    }());//此处()作用 - 立即调用return后面函数，形成闭包
节流：
//scroll方法中当间隔时间大于2s，do somthing执行一次
    window.addEventListener('scroll',function(){
        var timer ;//使用闭包，缓存变量
        var startTime = new Date();
        return function(){
            var curTime = new Date();
            if(curTime - startTime >= 2000){
                timer = setTimeout(function(){
                    console.log('do somthing')
                },500);
                startTime = curTime;
            }

        }
    }());//此处()作用 - 立即调用return后面函数，形成闭包
```

 <p id="js-61"> 61.  数据类型（判断，==和===）堆栈、内存泄漏及垃圾回收机制

```JS
// 答案：
1，== 判断值是否相等； === 判断值和数据类型是否严格相等
2，Javascript堆栈和垃圾回收机制
堆栈溢出
​ 当储存的数据导到某一限制时就会造成堆栈溢出

内存泄漏
​ 当不断向堆中存储数据，而不进行清理，这就是内存泄漏

垃圾回收机制（清除孤儿机制）
​ 语言当中一般分两种，一种是自动清理，一种是手动清理（GC），js中只有自动清理

​ 垃圾回收机制就是将引用对中的地址的对象设置为null，并且将所有引用该地址的对象都设置为null，并且移除事件侦听

​ 不会即时清除,垃圾回收车会根据内存的情况在适当的时候进行清除堆中的对象 内存到达一定程度了才会进行回收
```

 <p id="js-62"> 62. ★ 了解 ES6 的 Proxy 吗？

```JS
// 答案：
Proxy，代理，是ES6新增的功能，可以理解为代理器（即由它代理某些操作）。
Proxy 对象用于定义或修改某些操作的自定义行为，可以在外界对目标对象进行访问前，对外界的访问进行改写。

new Proxy()表示生成一个 Proxy 实例
	-target：目标对象
	-handler：一个对象，其属性是当执行一个操作时定义代理的行为的函数。
注意：要实现拦截操作，必须是对 Proxy 实例进行操作，而不是针对目标对象 target 进行操作。
```

 <p id="js-63"> 63. ★ 深拷贝是什么？项目哪里是用到了深拷贝？

```JS
// 答案：
1，在拷贝构造函数中假如只完成了数据成员本身的赋值则称为“浅拷贝”；编译器提供的默认拷贝构造函数就已经可以完成这个任务。
而假如要复制的数据除了属性值本身以外，还要复制附加在数据属性值上的额外内容，那就要自己来写拷贝构造函数了，来完成所谓的“深拷贝”。

举个例子：

若在构造函数中new了一个新的空间存放数据，并且用指针记录了首地址；若是浅拷贝，则在拷贝构造函数中指针值将复制给另一个数据成员，这样就会有两个指针指向同一个空间；这样的话在析构函数里将会对指针所指向的空间进行释放，由于两个指针指向的是同一个空间，在释放第一个指针指向的空间时不会出现什么问题，而释放第二个指针指向的空间时就会因为空间已经被解析过而导致解析的空间不存在的情况，就会造成程序无法终止。

而解决上面这种情况的办法就是使用“深拷贝”，深拷贝是在拷贝构造函数里再new一个新的空间。将数据复制在新空间里，并将拷贝的指针记录这个新空间的首地址，这样在析构函数里就不会有问题了。
2，在某些引用类型值不更新的情况下用深拷贝
```

 <p id="js-64"> 64.  swiper 插件从后台获取数据没问题，css 代码啥的也没问题，但是图片不动，应该怎么解决？

```JS
// 答案：
主要原因：
swiper提前初始化了，而这个时候，数据还没有完全出来。
解决方法
从swiper 入手，在swiper中写 observer:true/observeParents:true
 let myswiper = new Swiper(".swiper-container" , {
     autoplay: true,
     loop: true,
     // observer 修改swiper子元素时自动初始化swiper
     observer:true,
     // observeParents 包括当前父元素的swiper发生变更时也会初始化swiper
     observeParents:true,
 })
 从 Vue 入手，vue中专门提供了提供了一个方法nextTick() 用于解决dom的先后执行问题。
 mounted(){
     this.$nextTick(function(){
         // ...操作
         let myswiper = new Swiper(".swiper-container" , {
             autoplay: true,
             loop: true
         })
     })  
 }
```

 <p id="js-65"> 65. ★ ES6 中，数组监测怎么实现的（代理）

```JS
// 通过ES6的关键字extends实现继承完成Array原型方法的重写
class NewArray extends Array {
  constructor(...args) {
    // 调用父类Array的constructor()
    super(...args)
  }
  push (...args) {
    console.log('监听到数组的变化啦！');

    // 调用父类原型push方法
    return super.push(...args)
  }
  // ...
}

let list3 = [1, 2];

let arr = new NewArray(...list3);
console.log(arr)
// (2) [1, 2]

arr.push(3);
// 监听到数组的变化啦！
console.log(arr)
// (3) [1, 2, 3]
```

 <p id="js-66"> 66. ★★ jQuery 优点和缺点

```JS
// 答案：
优点
1.出色的浏览器兼容性
2、出色的DOM操作的封装，使他具备强大的选择器，可以进行快速的DOM元素操作
3、可靠的事件处理机制、jq在处理事件绑定的时候是相当的可靠
4、完善的ajax（对ajax的封装非常好，不需要考虑复杂的浏览器的兼容和XMLhttprequest对象的创建和使用）
5、支持链式操作（什么是链式操作？通过‘.’来操作）和隐士迭代
6、减少服务器的压力和带宽并且加快了加载速度（为什么这么说？原因就是：当你打开网页之前打开了其他的网页，并且该网页也用了cdn的方式来
加载相同版本的jq文件，那么，浏览器就不会加载第二次，为啥舍近求远呢，和生活中的道理一样一样的！）
7、支持丰富的插件，当然你也可以自定义插件，再加上jq的文档也很丰富，对于程序员来说，是一件非常美好的事情
缺点
1.不能向后兼容。
每一个新版本不能兼容早期的版本。举例来说，有些新版本不再支持某些selector，新版jQuery却没有保留对它们的支持，而只是简单的将其移除。这可能会影响到开发者已经编写好的代码或插件。
2.插件兼容性。
与上一点类似，当新版jQuery推出后，如果开发者想升级的话，要看插件作者是否支持。通常情况下，在最新版jQuery版本下，现有插件可能无法正常使用。开发者使用的插件越多，这种情况发生的几率也越高。我有一次为了升级到jQuery 1.3，不得不自己动手修改了一个第三方插件。
3.多个插件冲突。
在同一页面上使用多个插件时，很容易碰到冲突现象，尤其是这些插件依赖相同事件或selector时最为明显。这虽然不是jQuery自身的问题，但却又确实是一个难于调试和解决的问题。
4.jQuery的稳定性。
jQuery没有让浏览器崩溃，这里指的是其版本发布策略。jQuery 1.3版发布后仅过数天，就发布了一个漏洞修正版1.3.1。他们还移除了对某些功能的支持，可能会影响许多代码的正常运行。我希望类似修改不要再出现。
5.对动画和特效的支持差。
在大型框架中，jQuery核心代码库对动画和特效的支持相对较差。但是实际上这不是一个问题。目前在这方面有一个单独的jQuery UI项目和众多插件来弥补此点。
```

 <p id="js-67"> 67.  ES6 class 关键字原理跟 function 什么区别？

```JS
// 答案：
function 可以用call apply bind 的方式 来改变他的执行上下文   
但是class 却不可以   class 虽然本质上也是一个函数  但是 其内（babel）部做了一层代理 来禁止了这种行为

关于构造器constructor
	在function定义的构造函数中，其prototype.constructor属性指向构造器自身
	在class定义的类中，constructor其实也相当于定义在prototype属性上
    
重复定义
	function会覆盖之前定义的方法
	class会报错
    
原型或者类中方法的枚举
    class中定义的方法不可用Object.keys(Point.prototype)枚举到
    function构造器原型方法可被Object.keys(Point.prototype)枚举到，除过constructor
    所有原型方法属性都可用Object.getOwnPropertyNames(Point.prototype)访问到
    

```

 <p id="js-68"> 68.  iframe 跨域问题，页面之间怎么传值？

```JS
// 答案：
一般有两个解决方案，一个是建立一个代理页面，通过代理页面传值，

另一个方法是通过H5的postMessage方法传值，今天用的是第二种。

首先，在父页面A中建立一个iframe，其中src要写好子页面B的地址，然后在A页面中写如下方法：

        var iframe = document.getElementById("onemap");
        var msg = {loginName:'arcgis',loginPassword:'Esri1234'};
        var childDomain = "https://geoplat.training.com";
        
        iframe.contentWindow.postMessage(msg,childDomain);

记住，childDomain与A的iframe的src地址不一样，childDomain是域，而src是域中的一个页面

msg是传输的信息，可以是字符串，也可以是对象。

上面的方法一定要写在一个函数中，并通过点击事件调用，如果希望iframe开始为空，点击后在设置src，

可以在设置src之后，通过setTimeout设置一定时间后在传输信息。

在子页面B中，通过对window添加事件获取传输过来的信息：

            window.addEventListener("message",function(obj){
               
                var name = obj.data.loginName;
                var password = obj.data.loginPassword;
                login.iframeChildLogin(name,password);
            },false);
这样就完成了从不同域的父页面向子页面传值的过程
```

 <p id="js-69"> 69.  简述 commonJS、AMD 和 CMD

```JS
// 答案：
CommonJS导出模块的方法是exports，导入模块的是require，具体规范如下

1）如果一个JS文件中存在exports或require，该JS文件是一个模块

2）模块内的所有代码均为隐藏代码，包括全局变量、全局函数，这些全局的内容均不应该对全局变量造成任何污染

3）如果一个模块需要暴露一些API提供给外部使用，需要通过exports导出，exports是一个空的对象，你可以为该对象添加任何需要导出的内容

4）如果一个模块需要导入其他模块，通过require实现，require是一个函数，传入模块的路径即可返回该模块导出的整个内容

【注】CommonJS只是一个规范，相当于告诉你按什么标准制造汽车，但是具体怎么制造还是得看生产商。因此，有了规范以后，nodejs就去实现模块化了

AMD
AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
AMD 推崇依赖前置。

CMD
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
CMD 推崇依赖就近
```

 <p id="js-70"> 70.  require.js 源码看过吗？怎么做到异步加载的

```JS
/**
  * Creates the node for the load command. Only used in browser envs.
  */
req.createNode = function (config, moduleName, url) {
    var node = config.xhtml ?
        document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
    document.createElement('script');
    node.type = config.scriptType || 'text/javascript';
    node.charset = 'utf-8';
    node.async = true;
    return node;
};

　　requirejs 导入模块的方式实际就是创建脚本标签，一切的模块都需要经过这个方法创建。requirejs 使用 onload 事件来处理回调函数：
```

 <p id="js-71"> 71. ★★ jQuery，$() 能传什么参数? html 代码怎么解析? 传 function 呢?

```JS
这个函数接收一个包含 CSS 选择器的字符串，然后用这个字符串去匹配一组元素。
jQuery 的核心功能都是通过这个函数实现的。 
jQuery中的一切都基于这个函数，或者说都是在以某种方式使用这个函数。这个函数最基本的用法就是向它传递一个表达式（通常由 CSS 选择器组成），然后根据这个表达式来查找所有匹配的元素。
默认情况下, 如果没有指定context参数，$()将在当前的 HTML document中查找 DOM 元素；如果指定了 context 参数，如一个 DOM 元素集或 jQuery 对象，那就会在这个 context 中查找。在jQuery 1.3.2以后，其返回的元素顺序等同于在context中出现的先后顺序。
```

 <p id="js-72"> 72. ★★ AMD 怎么加载文件的?

```JS
AMD 即Asynchronous Module Definition，中文名是异步模块定义的意思。它是一个在浏览器端模块化开发的规范
由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出
requireJS主要解决两个问题
多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长
看一个使用requireJS的例子
// 定义模块 myModule.js

define(['dependency'], function(){
    var name = 'Byron';
    function printName(){
        console.log(name);
    }

    return {
        printName: printName
    };
});

// 加载模块
require(['myModule'], function (my){
　 my.printName();
});
语法
requireJS定义了一个函数 define，它是全局变量，用来定义模块

define(id?, dependencies?, factory);
id：可选参数，用来定义模块的标识，如果没有提供该参数，脚本文件名（去掉拓展名）
dependencies：是一个当前模块依赖的模块名称数组
factory：工厂方法，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值
在页面上使用require函数加载模块

require([dependencies], function(){});
require()函数接受两个参数

第一个参数是一个数组，表示所依赖的模块
第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块
require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。
```

 <p id="js-73"> 73. ★★ jQuery 怎么找到事件源元素

```JS
$(".btn").click(function(e){
    // e 就是事件对象
    e.target; // 事件的目标 dom
    e.currentTarget; // 事件处理程序正在处理事件的那个元素
    e.srcElement; // 事件的目标 ie
});
```

 <p id="js-74"> 74. ★ 模板引擎原理

```JS
模板引擎是通过字符串拼接得到的

let template = 'hello <% name %>!'
let template = 'hello ' + name + '!'

字符串是通过new Function执行的

let name = 'world'
let template = `
  let str = 'hello ' +  name  + '!'
  return str
`
let fn = new Function('name', template)
console.log(fn(name)) // hello world!

将模板转换为字符串并通过函数执行返回
let template = 'hello <% name %>!'
let name = 'world'
function compile (template) {
  let html = template.replace(/<%([\s\S]+?)%>/g, (match, code) => {
    return `' + ${code} + '`
  })
  html = `let str = '${html}'; return str`
  return new Function('name', html)
}
let str = compile(template)
console.log(str(name)) // hello world!

函数只能接收一个name变量作为参数，功能太单一了，一般会通过对象来传参，with来减少变量访问。

with功能
let params = {
  name: '张三',
  age: 18
}
let str = ''
with (params) {
  str = `用户${name}的年龄是${age}岁`
}
console.log(str) // 用户张三的年龄是18岁

实现简单的模板引擎
let template = 'hello <% name %>!'
let name = 'world'
function compile (template) {
  let html = template.replace(/<%([\s\S]+?)%>/g, (match, code) => {
    return `' + ${code.trim()} + '`
  })
  html = `'${html}'`
  html = `let str = ''; with (params) { str = ${html}; } return str`
  return new Function('params', html)
}
let str = compile(template)
console.log(str({ name })) // hello world!
```

 <p id="js-75"> 75. ★★ map 和 foreach 的区别

```JS
forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组。
map()方法会得到一个新的数组并返回。
```

 <p id="js-76"> 76. ★ ES6 的新特性

```JS
1. const与let
2. 模板字符串
3. 解构赋值
4. 对象简写法
5. for...of循环
6. 展开运算符
7. 剩余参数(可变参数)
8. ES6箭头函数
9. 参数默认值
10.类和继承
11.模块化规范
```

 <p id="js-77"> 77. ★★ 2018/01/01 转换成 2018年/1月/1日

```JS
function fun(str){
    var date = new Date(str)
    return date.getFullYear()+'年/'+date.getMonth()+'月/'+date.getDate()+'日'
}
```

 <p id="js-78"> 78.  0.1+0.2 等不等于 0.3？自己封装一个让他们相等的方法

```JS

在正常的数学逻辑思维中，0.1+0.2=0.3这个逻辑是正确的，但是在JavaScript中0.1+0.2！==0.3，这是为什么呢？这个问题也会偶尔被用来当做面试题来考查面试者对JavaScript的数值的理解程度。
 
　　在JavaScript中的二进制的浮点数0.1和0.2并不是十分精确，在他们相加的结果并非正好等于0.3，而是一个比较接近的数字 0.30000000000000004 ，所以条件判断结果为false。
  
方法1：设置一个误差范围值，通常称为”机器精度“，而对于Javascript来说，这个值通常是2^-52,而在ES6中，已经为我们提供了这样一个属性：Number.EPSILON，而这个值正等于2^-52。这个值非常非常小，在底层计算机已经帮我们运算好，并且无限接近0，但不等于0,。这个时候我们只要判断(0.1+0.2)-0.3小于Number.EPSILON，在这个误差的范围内就可以判定0.1+0.2===0.3为true。

function numbersequal(a,b){ 
    return Math.abs(a-b)<Number.EPSILON;
} 

方法2：转为整数运算
```

 <p id="js-79"> 79.  跨域是什么？有哪些解决跨域的方法和方案？

```JS
什么是跨域?

所谓的同源是指，域名、协议、端口均为相同。
所谓的跨域，不同的域名、协议、端口皆为不同域

一个域与另一个域名、协议或者端口不同的域的之间访问都叫跨域

解决跨域的方法和方案：
1：通过服务端代理请求。如PHP，服务端语言php是没有跨域限制的，让服务器去别的网站获取内容然后返回给页面。

2：第二种：jsonp跨域
    1. jsonp跨域就是利用script标签的跨域能力请求资源
    2. jsonp与ajax没有半毛钱关系！！
    3. 浏览器的同源策略限制了js的跨域能力，但没有限制link img iframe script 的跨域行为
    实现方式：
    1. 利用js创建一个script标签，把json的url赋给script的scr属性，
    2. 把这个script插入到页面里，让浏览器去跨域获取资源
	3. JS先声明好回调函数，插入页面后会代为执行该函数，并且传入json对象为其参数。
    注意：
    1. jsonp只针对get请求
    2. script标签加载回来的资源会被当成js在全局执行

3：CORS 跨域资源共享(xhr2)
    CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）
    它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制
    整个CORS通信过程，都是浏览器自动完成，不需要用户参与
    对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样
    实现CORS通信的关键是服务器，只要服务器实现了CORS接口，就可以跨源通信

4：nginx代理跨域
	通过nginx服务器转发跨域请求，达到跨域的目的
```

 <p id="js-80"> 80.  什么是函数式编程？什么的声明式编程？

```JS
函数式编程：
函数式编程和声明式编程是有所关联的，因为他们思想是一致的：即只关注做什么而不是怎么做。但函数式编程不仅仅局限于声明式编程。
函数式编程最重要的特点是“函数第一位”，即函数可以出现在任何地方，比如你可以把函数作为参数传递给另一个函数，不仅如此你还可以将函数作为返回值。

声明式编程：
声明式编程是以数据结构的形式来表达程序执行的逻辑。它的主要思想是告诉计算机应该做什么，但不指定具体要怎么做。
SQL 语句就是最明显的一种声明式编程的例子，例如：
SELECT * FROM collection WHERE num > 5
除了 SQL，网页编程中用到的 HTML 和 CSS 也都属于声明式编程。
特点：
1：是它不需要创建变量用来存储数据。
2：不包含循环控制的代码如 for， while。
```

 <p id="js-81"> 81.  super() 是否必须执行？不执行怎么让它不报错？

```JS
非必须，
在 JavaScript 中，super 指的是父类的构造函数
如果想在构造函数中使用this，你必须首先调用super。 先让父类做完自己的事
不执行无法使用this，
	不报错的方法：
    	1：不使用this
        2：手动修正this
```

 <p id="js-82"> 82.  eventloop 渲染在哪一步？

```JS
任务队列
所有的任务可以分为同步任务和异步任务，同步任务，顾名思义，就是立即执行的任务，同步任务一般会直接进入到主线程中执行；而异步任务，就是异步执行的任务，比如ajax网络请求，setTimeout 定时函数等都属于异步任务，异步任务会通过任务队列( Event Queue )的机制来进行协调。

同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入 Event Queue 。主线程内的任务执行完毕为空，会去 Event Queue 读取对应的任务，推入主线程执行。 上述过程的不断重复就是我们说的 Event Loop (事件循环)。

在事件循环中，每进行一次循环操作称为tick，通过阅读规范可知，每一次 tick 的任务处理模型是比较复杂的，其关键的步骤可以总结如下：

在此次 tick 中选择最先进入队列的任务( oldest task )，如果有则执行(一次)
检查是否存在 Microtasks ，如果存在则不停地执行，直至清空Microtask Queue
更新 render
主线程重复执行上述步骤
那么，什么是 microtasks ?规范中规定，task分为两大类, 分别是 Macro Task （宏任务）和 Micro Task（微任务）, 并且每个宏任务结束后, 都要清空所有的微任务,这里的 Macro Task也是我们常说的 task 。

(macro)task 主要包含：script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)

microtask主要包含：Promise、MutaionObserver、process.nextTick(Node.js 环境)

整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 script start
遇到 setTimeout，其回调函数被分发到宏任务 Event Queue 中
遇到 Promise，其 then函数被分到到微任务 Event Queue 中,记为 then1，之后又遇到了 then 函数，将其分到微任务 Event Queue 中，记为 then2
遇到 console.log，输出 script end
至此，Event Queue 中存在三个任务，如下表：

宏任务	微任务
setTimeout	then1
-	then2
执行微任务，首先执行then1，输出 promise1, 然后执行 then2，输出 promise2，这样就清空了所有微任务
此时，所有的mircotask执行完毕，本轮事件循环结束，UI 开始 render，当 UI render 完毕，开始下一轮事件循环.
执行 setTimeout 任务，输出 setTimeout, 至此，输出的顺序是：script start, script end, promise1, promise2, setTimeout

UI渲染
根据HTML Standard，一轮事件循环执行结束之后，下轮事件循环执行之前开始进行 UI render。即：macro-task任务执行完毕，接着执行完所有的micro-task任务后，此时本轮循环结束，开始执行UI render。UI render完毕之后接着下一轮循环。
```

 <p id="js-83"> 83. ★ 图片懒加载怎么实现？

```JS
原理：随着滚轮滚动，底部的图片会被不断地加载，从而显示在页面上，按需加载，当页面需要显示图片的时候才进行加载，否则不加载

1. 页面加载完成时记录每个img标签的src值的字符串，
2. 用鼠标滚轮判断图片是否出现在屏幕，如果是，则把记录的src值赋值给src属性
3. 然后让image的src来发起请求，获取对应的图片放置到DOM树的这个位置上，从而实现图片的页面渲染！
于是就可以知道，当进入页面的时候，其实我们已经把所有的图片的这个地址信息拿到了，图片懒加载的作用就是让这个图片的src按需发起请求，获取图片。
```

 <p id="js-84"> 84. ★★ for-in 循环会遍历出原型上的属性吗？怎么避免遍历到原型上的属性

```JS
使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问

只遍历对象自身的属性，而不遍历继承于原型链上的属性，需要使用hasOwnProperty 方法过滤一下。
Object.prototype.say="cgl";
    var person ={
        age: 18
    };
    for (var key in person) {
        if(person.hasOwnProperty(key)){
            console.log(key, eval("person."+key));
        }
    } 
```

 <p id="js-85"> 85.  简述call、apply、bind，call 和 apply哪个性能更好？

```JS
1、call()
call() 方法调用一个函数, 其具有一个指定的 this值和分别地提供的参数(参数的列表)。 第一个参数：在 fun 函数运行时指定的 this 值;如果指定了 null 或者 undefined 则内部 this 指向 window，后面的参数：指定的参数列表

var fn = function(arg1, arg2) {   
};
fn.call(this, arg1, arg2);

var  numbers = [5, 458 , 120 , -215 ]; 
var maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //获取数组中的最大值458

2、apply()
apply()方法调用一个函数, 其具有一个指定的 this 值，以及作为一个数组（或类似数组的对象）提供的参数。apply() 与 call() 非常相似，不同之处在于提供参数的方式。apply() 使用参数数组而不是一组参数列表。

var fn = function(arg1, arg2) {   
};
fn.apply(this, [arg1, arg2])

var  numbers = [5, 458 , 120 , -215 ]; 
//umber 本身没有 max 方法，但是 Math 有，我们就可以借助 call 或者 apply 使用其方法。
var maxInNumbers = Math.max.apply(Math, numbers),   //获取数组中的最大值458
    
3、bind()
bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。
当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。
一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

/* ------call 和 apply哪个性能更好？------ */
call的性能要比apply好一些，尤其是传递给函数的参数超过3个时所以后期开发的时候，可以使用call多一些
（传参数3个以内的话，call和apply性能差不多，超过3个以上call更好一些）
```

 <p id="js-86"> 86. ★★ ES6 箭头函数和普通函数有什么差异？

```JS
1. 相比普通函数更简洁的语法
2. 没有this,捕获其所在上下文的 this 值，作为自己的 this 值
3. 不能使用new,箭头函数作为匿名函数,是不能作为构造函数的,不能使用new
4. 不绑定arguments，用rest参数...解决
	let test3=(...a)=>{console.log(a[1])} //22
5. 使用call()和apply()调用:由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调用一个函数时，只是传入了参数而已，对 this 并没有什么影响：
6. 箭头函数没有原型属性
7. 不能简单返回对象字面量
	let fun5 = ()=>({ foo: x })   //如果x => { foo: x }  //则语法出错
8. 箭头函数不能当做Generator函数,不能使用yield关键字
9. 箭头函数不能换行
	let a = ()
          =>1; //SyntaxError: Unexpected token =>
```

 <p id="js-87"> 87.  Promise 避免回调地狱的语法糖--实现链式调用的核心点是什么？

```JS
解决回调地狱的终极方法 async/await ES7的语法，可以通过 async/await让代码看起来像同步的
async异步 await等待
await 等待 就是当后面跟的是promise对象，就让他停止 ，先让里面的异步事情做完，在把结果返回给前面的新变量，在继续向后执行
他只生效当前作用域内部，也就是async函数内部。

实现链式调用的核心点:
在 then 中新创建的 Promise，它的状态变为 fulfilled 的节点是在上一个 Promise的回调执行完毕的时候。也就是说当一个 Promise 的状态被 fulfilled 之后，会执行其回调函数，而回调函数返回的结果会被当作 value，返回给下一个 Promise(也就是then 中产生的 Promise)，同时下一个 Promise的状态也会被改变(执行 resolve 或 reject)，然后再去执行其回调,以此类推下去…
```

 <p id="js-88"> 88.  进程线程区别是什么？

```JS
什么是进程？什么是线程？
进程是系统中正在运行的一个程序，程序一旦运行就是进程。

进程可以看成程序执行的一个实例。进程是系统资源分配的独立实体，每个进程都拥有独立的地址空间。一个进程无法访问另一个进程的变量和数据结构，如果想让一个进程访问另一个进程的资源，需要使用进程间通信，比如管道，文件，套接字等。

一个进程可以拥有多个线程，每个线程使用其所属进程的栈空间。线程与进程的一个主要区别是，统一进程内的一个主要区别是，同一进程内的多个线程会共享部分状态，多个线程可以读写同一块内存（一个进程无法直接访问另一进程的内存）。同时，每个线程还拥有自己的寄存器和栈，其他线程可以读写这些栈内存。

线程是进程的一个实体，是进程的一条执行路径。

线程是进程的一个特定执行路径。当一个线程修改了进程的资源，它的兄弟线程可以立即看到这种变化。

进程和线程的区别体现在以下几个方面：
1.地址空间和其他资源（如打开文件）：进程间相互独立，同一进程的各线程间共享。某进程内的线程在其他进程内不可见。

2.通信：进程间通信IPC（管道，信号量，共享内存，消息队列），线程间可以直接独写进程数据段（如全局变量）来进程通信——需要进程同步和互斥手段的辅助，以保证数据的一致性。

3.调度和切换：线程上下文切换比进程上下文切换快得多。

4.在多线程OS中，进程不是一个可执行的实体。
```

 <p id="js-89"> 89.  禁止事件冒泡，禁止默认事件

```JS
/*-----禁止事件冒泡:-----*/
function stopBubble(e) {
//如果提供了事件对象，则这是一个非IE浏览器
if ( e && e.stopPropagation )
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
else
    //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
}

/*-----阻止浏览器的默认行为-----*/
function stopDefault( e ) {
    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
    return false;
}
```

 <p id="js-90"> 90. ★★ import export commonJS 对比区别

```JS
ES6和commonJS的一些区别

从语法的角度上看，ES6模块化的import 和 export 是一个内置的标识，而commonJS的module.exports 和 require 分别是js对象和方法。其ES6模块化和commonJS的实现方式不同。

1.ES6是在编译的时候导入文件，而commonJS是编译完成后，在通过require方法导入，并读取文件导出的文件，并返回一个module.exports对象

2.在ES6模块的内部this是问undefined，而commonJS的this为一个空对象

3.ES6模块输出的是一个引用，而commonJS模块输出的是一个值的引用
```

 <p id="js-91"> 91. ★★ 为什么 JavaScript 是单线程

```JS
js作为主要运行在浏览器的脚本语言，js主要用途之一是操作DOM。

举一个栗子，如果js同时有两个线程，同时对同一个dom进行操作，这时浏览器应该听哪个线程的，如何判断优先级？

为了避免这种问题，js必须是一门单线程语言
```

 <p id="js-92"> 92.  使用箭头函数应该注意什么？

```JS
1. 不要在对象里面定义函数，对象里面的行数应该用传统的函数方法
2. 不要在对原型对象上定义函数，在对象原型上定义函数也是遵循着一样的规则
3. 不要用箭头定义构造函数
4. 不要用箭头定义事件回调函数
```

 <p id="js-93"> 93.  你知道 ES6 中的 Generator 和 yiled 吗？在实际开发中使用过吗？

```JS
Generator 函数是 ES6 提供的一种异步编程解决方案
执行 Generator 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态
形式上，Generator函数是一个普通函数，但是有两个特征：
1. function关键字与函数名之间有一个星号
2. 函数体内部使用yield表达式，定义不同的内部状态

/*-----利用Generator函数，在对象上实现Iterator接口-----*/

function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}
 
let myObj = { foo: 3, bar: 7 };
 
for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}
```

 <p id="js-94"> 94.  Cookie、storage 的区别？什么时候使用？

```JS
区别：
1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。localStorage不会自动把数据发给服务器，仅在本地保存。

2. cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。

3. 存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

4. 数据有效期不同，
    localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
    cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。

5. WebStorage 支持事件通知机制，可以将数据更新的通知发送给监听者。

6. WebStorage 的 api 接口使用更方便。

使用场景：
localStorage可以用来统计页面访问次数。
cookie一般存储用户名密码相关信息，一般使用escape转义编码后存储。
```

 <p id="js-95"> 95.  map、fillter、reduce 各自有什么作用？

```JS
1：map 作用是生成一个新数组，遍历原数组，将每个元素拿出来做一些变换然后放入到新的数组中。
另外 map 的回调函数接受三个参数，分别是当前索引元素，索引，原数组

2：filter 的作用也是生成一个新数组，在遍历数组的时候将返回值为 true 的元素放入新数组，我们可以利用这个函数删除一些不需要的元素
和 map 一样，filter 的回调函数也接受三个参数，用处也相同。

3：reduce 可以将数组中的元素通过回调函数最终转换为一个值。
它接受两个参数，分别是回调函数和初始值，接下来我们来分解上述代码中 reduce 的过程
首先初始值为 0，该值会在执行第一次回调函数时作为第一个参数传入
回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数
```

 <p id="js-96"> 96. ★★ JS的基本数据类型判断有什么方法？

```JS
1.typeof：
	typeof'';// string 有效
    typeof 1;// number 有效
    typeof Symbol();// symbol 有效
    typeof true;//boolean 有效
    typeof undefined;//undefined 有效
    typeof null;//object 无效
    typeof [] ;//object 无效
    typeof new Function();// function 有效
    typeof new Date();//object 无效
    typeof new RegExp();//object 无效
2.instanceof
    instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。 	   在这里需要特别注意的是：instanceof 检测的是原型
3.constructor
当一个函数 F被定义时，JS引擎会为F添加 prototype 原型，然后再在 prototype上添加一个 constructor 属性
4.toString
toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。

对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。
    Object.prototype.toString.call('') ;  // [object String]
    Object.prototype.toString.call(1) ;   // [object Number]
    Object.prototype.toString.call(true) ;// [object Boolean]
    Object.prototype.toString.call(Symbol());//[object Symbol]
    Object.prototype.toString.call(undefined) ;// [object Undefined]
    Object.prototype.toString.call(null) ;// [object Null]
    Object.prototype.toString.call(newFunction()) ;// [object Function]
    Object.prototype.toString.call(newDate()) ;// [object Date]
    Object.prototype.toString.call([]) ;// [object Array]
    Object.prototype.toString.call(newRegExp()) ;// [object RegExp]
    Object.prototype.toString.call(newError()) ;// [object Error]
    Object.prototype.toString.call(document) ;// [object HTMLDocument]
    Object.prototype.toString.call(window) ;//[object global] window 是全局对象 global 的引用
```

 <p id="js-97"> 97.  构造函数、实例对象、原型对象三者的关系是什么？

![img](https://img-blog.csdn.net/20180914155910928?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MjQ3ODM1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

 <p id="js-98"> 98. ★★ JS中的常见设计模式以及应用场景？

```JS
1、单例模式
单例模式就是一个实例在整个网页的生命周期里只创建一次，后续再调用实例创建函数的时候，返回的仍是之前创建的实例。在实际开发中应用十分广泛，例如页面中的登录框，显示消息的提示窗
2、策略模式
策略模式是指将策略（算法）封装起来，策略的目的是将算法和使用分离开。
3、代理模式
代理模式很好理解，我们不能直接使用目标函数，而是通过调用代理函数来实现对目标函数的使用。
4、发布订阅模式
发布订阅模式在实际应用中非常常见，例如，我们在微信App上关注了某个公众号，当该公众号有新文章发布时，就会通知我们。
发布订阅模式定义了一种一对多的依赖关系，当“一”发生变化，通知多个依赖。
5、命令模式
所谓命令模式就是将下要执行的业务逻辑封装到一个函数或类中，不需要具体谁来执行该命令的
```

 <p id="js-99"> 99. ★★ 介绍下事件代理，主要解决什么问题

```JS
1. 绑定事件太多，浏览器占用内存变大，严重影响性能
2. Ajax出现，局部刷新盛行，每次加载完，都要重新绑定事件
3. 部分浏览器移除元素时，绑定的事件没有被及时移除，导致内存泄漏，严重影响性能
4. Ajax中重复绑定，导致代码耦合性过大，影响后期维护
```

 <p id="js-100"> 100. ★  异步的解决方案有哪些？

```JS
1.回调函数callback
2.事件发布订阅
3.Promise
4.Generator
5.async/await
```

 <p id="js-101"> 101. ★★ new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？

```JS
new操作符的作用如下：
1.创建一个空对象
2.由this变量引用该对象
3.该对象继承该函数的原型
4.把属性和方法加入到this引用的对象中
5.新创建的对象由this引用，最后隐式地返回this。

区别:
字面量创建不会调用 Object构造函数, 简洁且性能更好;
```

 <p id="js-102"> 102. ★★ 数组去重的方法

```JS
/*
方法一：

双层循环，外层循环元素，内层循环时比较值

如果有相同的值则跳过，不相同则push进数组
*/
Array.prototype.distinct = function(){
 var arr = this,
  result = [],
  i,
  j,
  len = arr.length;
 for(i = 0; i < len; i++){
  for(j = i + 1; j < len; j++){
   if(arr[i] === arr[j]){
    j = ++i;
   }
  }
  result.push(arr[i]);
 }
 return result;
}
var arra = [1,2,3,4,4,1,1,2,1,1,1];
arra.distinct();    //返回[3,4,2,1]


/*
方法二：利用splice直接在原数组进行操作

双层循环，外层循环元素，内层循环时比较值

值相同时，则删去这个值

注意点:删除元素之后，需要将数组的长度也减1.
*/
Array.prototype.distinct = function (){
 var arr = this,
  i,
  j,
  len = arr.length;
 for(i = 0; i < len; i++){
  for(j = i + 1; j < len; j++){
   if(arr[i] == arr[j]){
    arr.splice(j,1);
    len--;
    j--;
   }
  }
 }
 return arr;
};
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,56


/*
优点：简单易懂

缺点：占用内存高，速度慢

方法三：利用对象的属性不能相同的特点进行去重
*/
Array.prototype.distinct = function (){
 var arr = this,
  i,
  obj = {},
  result = [],
  len = arr.length;
 for(i = 0; i< arr.length; i++){
  if(!obj[arr[i]]){ //如果能查找到，证明数组元素重复了
   obj[arr[i]] = 1;
   result.push(arr[i]);
  }
 }
 return result;
};
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,];
var b = a.distinct();
console.log(b.toString()); //1,2,3,4,5,6,56


/*
方法四：数组递归去重

运用递归的思想

先排序，然后从最后开始比较，遇到相同，则删除
*/
Array.prototype.distinct = function (){
 var arr = this,
  len = arr.length;
 arr.sort(function(a,b){  //对数组进行排序才能方便比较
  return a - b;
 })
 function loop(index){
  if(index >= 1){
   if(arr[index] === arr[index-1]){
    arr.splice(index,1);
   }
   loop(index - 1); //递归loop函数进行去重
  }
 }
 loop(len-1);
 return arr;
};
var a = [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,56,45,56];
var b = a.distinct();
console.log(b.toString());  //1,2,3,4,5,6,45,56


//方法五：利用indexOf以及forEach
Array.prototype.distinct = function (){
 var arr = this,
  result = [],
  len = arr.length;
 arr.forEach(function(v, i ,arr){  //这里利用map，filter方法也可以实现
  var bool = arr.indexOf(v,i+1);  //从传入参数的下一个索引值开始寻找是否存在重复
  if(bool === -1){
   result.push(v);
  }
 })
 return result;
};
var a = [1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,3,2,3,3,2,2,1,23,1,23,2,3,2,3,2,3];
var b = a.distinct();
console.log(b.toString()); //1,23,2,3
方法六：利用ES6的set

Set数据结构，它类似于数组，其成员的值都是唯一的。

利用Array.from将Set结构转换成数组

function dedupe(array){
 return Array.from(new Set(array));
}
dedupe([1,1,2,3]) //[1,2,3]
拓展运算符(...)内部使用for...of循环

1
2
3
let arr = [1,2,3,3];
let resultarr = [...new Set(arr)]; 
console.log(resultarr); //[1,2,3]
```

 <p id="js-103"> 103. ★ 常见内存泄漏

```JS
1、静态集合类，如HashMap、LinkedList等等。如果这些容器为静态的，那么它们的生命周期与程序一致，则容器中的对象在程序结束之前将不能被释放，从而造成内存泄漏。简单而言，长生命周期的对象持有短生命周期对象的引用，尽管短生命周期的对象不再使用，但是因为长生命周期对象持有它的引用而导致不能被回收。

2、各种连接，如数据库连接、网络连接和IO连接等。在对数据库进行操作的过程中，首先需要建立与数据库的连接，当不再使用时，需要调用close方法来释放与数据库的连接。只有连接被关闭后，垃圾回收器才会回收对应的对象。否则，如果在访问数据库的过程中，对Connection、Statement或ResultSet不显性地关闭，将会造成大量的对象无法被回收，从而引起内存泄漏。

3、变量不合理的作用域。一般而言，一个变量的定义的作用范围大于其使用范围，很有可能会造成内存泄漏。另一方面，如果没有及时地把对象设置为null，很有可能导致内存泄漏的发生。

4、内部类持有外部类，如果一个外部类的实例对象的方法返回了一个内部类的实例对象，这个内部类对象被长期引用了，即使那个外部类实例对象不再被使用，但由于内部类持有外部类的实例对象，这个外部类对象将不会被垃圾回收，这也会造成内存泄露。

5、改变哈希值，当一个对象被存储进HashSet集合中以后，就不能修改这个对象中的那些参与计算哈希值的字段了，否则，对象修改后的哈希值与最初存储进HashSet集合中时的哈希值就不同了，在这种情况下，即使在contains方法使用该对象的当前引用作为的参数去HashSet集合中检索对象，也将返回找不到对象的结果，这也会导致无法从HashSet集合中单独删除当前对象，造成内存泄露
6、缓存泄漏
内存泄漏的另一个常见来源是缓存，一旦你把对象引用放入到缓存中，他就很容易遗忘，对于这个问题，可以使用WeakHashMap代表缓存，此种Map的特点是，当除了自身有对key的引用外，此key没有其他引用那么此map会自动丢弃此值
7、监听器和回调
内存泄漏第三个常见来源是监听器和其他回调，如果客户端在你实现的API中注册回调，却没有显示的取消，那么就会积聚。需要确保回调立即被当作垃圾回收的最佳方法是只保存他的若引用，例如将他们保存成为WeakHashMap中的键。
```

 <p id="js-104"> 104.  promise 常见方法和 all 和 race的应用场景

```JS
Promise.race（）：
race的用法：谁跑的快，以谁为准执行回调。

race的使用场景：比如我们可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作

Promise.all():
all的用法：谁跑的慢，以谁为准执行回调。

在前端的开发实践中，我们有时会遇到需要发送多个请求并根据请求顺序返回数据的需求
```

 <p id="js-105"> 105.  介绍一下 ES6 中 Set, Map的区别？

```JS
Map
在JS中的默认对象的表示方式为{}，即一组键值对，但是键必须是字符串。
为了使用Number或者其他数据类型作为键，ES6规范引入了新的数据类型Map。
Map是一组键值对的结构，具有极快的查找速度。初始化Map需要一个二维数组，或者直接初始化一个空Map。
Map 对象是键值对集合，和 JSON 对象类似，但是 key 不仅可以是字符串还可以是其他各种类型的值包括对象都可以成为Map的键

Set
Set也是一组key的集合，与Map类似。但是区别是Set不存储value，并且它的key不能重复。
创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：
重复元素会在Set中自动被过滤
Set 对象类似于数组，且成员的值都是唯一的
```

 <p id="js-106"> 106. ★★ 并行和并发的区别是什么？

```JS
并行意味着可以同时取得多个任务，并同时去执行所取得的这些任务。并行模式相当于将长长的一条队列，划分成了多条短队列，所以并行缩短了任务队列的长度

并发表示多个任务同时都要执行
```

 <p id="js-107"> 107.  为什么操作 dom 慢？

```JS
DOM对象本身也是一个js对象，所以严格来说，并不是操作这个对象慢，而是说操作了这个对象后，需要经过跨流程通信和渲染线程触发的重新渲染，导致DOM操作慢
JS引擎和和渲染引擎的模块化设计，使得它们可以独立优化，运行速度更快，但是这种设计带来的后果就是DOM操作会越来越慢
```

 <p id="js-108"> 108. ★ 插入几万个 dom ，如何实现页面不卡顿？

```JS
让创建插入节点的工作分批进行：
setTimeout(() => {
    // 插入十万条数据
    const total = 100000;
    // 一次插入 20 条，如果觉得性能不好就减少
    const once = 20;
    // 渲染数据总共需要几次
    const loopCount = total / once;
    let countOfRender = 0
    let ul = document.querySelector("ul");
    function add() {
        // 优化性能，插入不会造成回流
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
            const li = document.createElement("li");
            li.innerText = Math.floor(Math.random() * total);
            fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
    }
    function loop() {
        if (countOfRender < loopCount) {
            window.requestAnimationFrame(add);
        }
    }
    loop();
}, 0);
```

 <p id="js-109"> 109.  js中的常用事件绑定方法

```JS
1. 在DOM元素中直接绑定
2. 在JavaScript代码中绑定
3. 绑定事件监听函数
```

 <p id="js-110"> 110. ★ 简述 src 和 href 的区别？

```JS
src用于替换当前元素，href用于在当前文档和引用资源之间确立联系
```

 <p id="js-111"> 111. ★ 你知道什么是原型吗？我们为什么要用原型呢？或者说原型为我们提供了什么？

```JS
什么是原型：
Javascript规定，每一个函数都有一个prototype对象属性，指向另一个对象（原型链上面的）。
prototype(对象属性)的所有属性和方法，都会被构造函数的实例继承。这意味着，我们可以把那些不变(公用)的属性和方法，直接定义在prototype对象属性上。

prototype就是调用构造函数所创建的那个实例对象的原型（proto）。

prototype可以让所有对象实例共享它所包含的属性和方法。也就是说，不必在构造函数中定义对象信息，而是可以直接将这些信息添加到原型中。

为什么要用原型：使用原型对象解决浪费内存
```

 <p id="js-112"> 112.  你了解原型链吗 你能说说 prototype 与 __proto__ 的区别吗？

![img](https://pic1.zhimg.com/80/e83bca5f1d1e6bf359d1f75727968c11_1440w.jpg?source=1940ef5c)

```JS
1.对象有属性__proto__,指向该对象的构造函数的原型对象。
2.方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。
```

 <p id="js-113"> 113.  ts 和 js 的区别

```JS
1.ts是静态类语言，可以做到声明即文档，js是动态类语言相对更灵活。
2.如用ts写一个button组件可以清晰的知道，ButtonProps如是否必传，可选，style是什么类型，disabled是什么类型，较js，ts更易于维护和拓展，可以做到代码即注释，避免一个月不见3，代码自己都忘记自己写了什么的尴尬，
4.ts对比js基础类型上，增加了 void/never/any/元组/枚举/以及一些高级类型
5.js没有重载概念，ts有可以重载
6.vscode/ide对ts有很友好的提示
7.ts更利于重构
```

 <p id="js-114"> 114.  简述原生 js 发 ajax 的步骤

```JS
1.创建XMLHTTPRequest对象

2.使用open方法设置和服务器的交互信息

3.设置发送的数据，开始和服务器端交互

4.注册事件

5.更新界面
```

 <p id="js-115"> 115. ★★ 是否所有函数都有 prototype 一说？

```JS
1. 使用Function.prototype.bind创建的函数对象
function abc(){console.log('abc')}
var binded = abc.bind(null)
binded() //abc
console.log(binded.prototype) //undefined

2. 箭头函数也没有
var abc = ()=>{console.log('abc')}
abc() //abc
console.log(abc.prototype) //undefined
```

 <p id="js-116"> 116. ★★ 为什么 await 在 forEach 中不生效？如何解决？

```JS
lodash的forEach和[].forEach不支持await, forEach 只支持同步代码。

解决方法1：使用 for...of
解决方法2：使用 for循环
解决方法3：让orEach支持async await

forEach 在正常情况像下面这么写肯定是做不到同步的，程序不会等一个循环中的异步完成再进行下一个循环。原因很明显，在上面的模拟中，while 循环只是简单执行了 callback，所以尽管 callback 内使用了 await ，也只是影响到 callback 内部。

arr.myforeach(async v => {
    await fetch(v);
});
要支持上面这种写法，只要稍微改一下就好

Array.prototype.myforeach = async function (fn, context = null) {
    let index = 0;
    let arr = this;
    if (typeof fn !== 'function') {
        throw new TypeError(fn + ' is not a function');
    }
    while (index < arr.length) {
        if (index in arr) {
            try {
                await fn.call(context, arr[index], index, arr);
            } catch (e) {
                console.log(e);
            }
        }
        index ++;
    }
};


```

 <p id="js-117"> 117. ★ a 标签中，如何禁用 href 跳转页面或定位链接？

```html
<a href="#" onclick="return false;">return false;</a>
<a href="http://www.baidu.com" onclick="ds(event)">baidu</a>
<script>
	function ds(e){
		e.preventDefault();
	}
</script>
```

 <p id="js-118"> 118. ★★ 请描述一下 cookies，sessionStorage 和 localStorage 的区别？

```JS
不同点：

1.存储大小
cookie数据大小不能超过4k。
sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
2.有效时间
localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
sessionStorage  数据在当前浏览器窗口关闭后自动删除。
cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
3. 数据与服务器之间的交互方式
cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端
sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
```

 <p id="js-119"> 119.  instanceof的原理是什么？

```JS
// instanceof 可以正确的判断对象的类型，是通过判断对象的原型链中是不是能找到类型的 prototype。

function fn(left, right) {
    let prototype = right.prototype;
    left = left.__proto__;
    while (true) {
        if (left === undefined || left === null) {
            return false;
        }
        if (left === prototype) {
            return true;
        }
        left = left.__proto__;
    }
}
```

 <p id="js-120"> 120.  用多种方法实现 JavaScript 继承

```JS
1、原型链继承
核心： 将父类的实例作为子类的原型
特点：
    1. 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
    2. 父类新增原型方法/原型属性，子类都能访问到
    3. 简单，易于实现
缺点：

    1. 要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行，不能放到构造器中
    2. 无法实现多继承
    3. 来自原型对象的所有属性被所有实例共享（来自原型对象的引用属性是所有实例共享的）（详细请看附录代码： 示例1）
    4. 创建子类实例时，无法向父类构造函数传参
推荐指数：★★（3、4两大致命缺陷）

2、构造继承
核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
特点：
    1. 解决了1中，子类实例共享父类引用属性的问题
    2. 创建子类实例时，可以向父类传递参数
    3. 可以实现多继承（call多个父类对象）
缺点：
    1. 实例并不是父类的实例，只是子类的实例
    2. 只能继承父类的实例属性和方法，不能继承原型属性/方法
    3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
推荐指数：★★（缺点3）

3、实例继承
核心：为父类实例添加新特性，作为子类实例返回
特点：
	1.不限制调用方式，不管是new 子类()还是子类(),返回的对象具有相同的效果
缺点：

    1. 实例是父类的实例，不是子类的实例
    2. 不支持多继承
推荐指数：★★

4、拷贝继承

特点：支持多继承
缺点：
    1. 效率较低，内存占用高（因为要拷贝父类的属性）
    2. 无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）
推荐指数：★（缺点1）

5、组合继承
核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
特点：
    1. 弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
    2. 既是子类的实例，也是父类的实例
    3. 不存在引用属性共享问题
    4. 可传参
    5. 函数可复用
缺点：
	1. 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）
    
推荐指数：★（仅仅多消耗了一点内存）

6、寄生组合继承
核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

特点：堪称完美
缺点：实现较为复杂
推荐指数：★★
```

<p id="js-120"> 121.  将字符串中的多个空格格式为一个空格

```js
  function fn ( str ) {
    if (!str) {
      return ;
    }
    var regEx = /\s+/g;
    return str.replace(regEx, ' ').trim();
  }

  console.log(fn(' hello  the   world! '))
```

<p id="js-120"> 122.  将字符串反向，并去首尾空格，要求多个空格要留一个

```js
  function fn ( str ) {
    if (!str) {
      return ;
    }
    var regEx = /\s+/g;
    return str.replace(regEx, ' ').trim().split(' ').reverse().join('');
  }

  console.log(fn(' hello  the   world! '))
```

## vue
1. 如何再Vue的单文件组件里的样式定义全局CSS？
```js
在style标签上不加上scoped的属性，默认为全局css样式
```
2. vue-router 3.1.0 `<router-link>`新增的v-slot属性怎么用？
```JS
router-link 通过一个作用域插槽暴露底层的定制能力。这是一个更高阶的 API，主要面向库作者，但也可以为开发者提供便利，多数情况用在一个类似 NavLink 这样的自定义组件里。

在使用 v-slot API 时，需要向 router-link 传入一个单独的子元素。否则 router-link 将会把子元素包裹在一个 span 元素内。
```
3. 如何实现一个路径渲染多个组件？
```JS
可以通过命名视图(router-view)，它容许同一界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。通过设置components即可同时渲染多个组件。
```

4. 如何实现多个路径共享一个组件？
```JS
只需将多个路径的component字段的值设置为同一个组件即可。
```

5. 如何监测动态路由的变化
```JS
可以通过watch方法来对$route进行监听，或者通过导航守卫的钩子函数beforeRouteUpdate来监听它的变化。
```

6.  对MVC，MVP，MVVM的理解

```JS
mvc 和 mvvm 其实区别并不大。都是一种设计思想。主要就是 mvc 中 Controller 演变成 mvvm 中的 viewModel。mvvm 主要解决了 mvc 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当 Model 频繁发生变化，开发者需要主动更新到 View 。

MVVM 是 Model-View-ViewModel 的缩写。mvvm 是一种设计思想。
1：Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。
2：在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
3：ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

```

7. ★★ 说一下$root，$parent，$refs

```JS
$root，和$parent都能访问父组件的属性和方法，区别在于如果存在多级子组件，通过parent 访问得到的是它最近一级的父组件，通过root 访问得到的是根父组件。通过在子组件标签定义 ref 属性，在父组件中可以使用$refs 访问子组件实例。
```

8. ★★ 你知道Vue响应式数据原理吗？Proxy 与 Object.defineProperty 优劣对比？

```JS
// 响应式原理

vue的响应式实现主要是利用了Object.defineProperty的方法里面的setter 与getter方法的观察者模式来实现。在组件初始化时会给每一个data属性注册getter和setter，然后再new 一个自己的Watcher对象，此时watcher会立即调用组件的render函数去生成虚拟DOM。在调用render的时候，就会需要用到data的属性值，此时会触发getter函数，将当前的Watcher函数注册进sub里。当data属性发生改变之后，就会遍历sub里所有的watcher对象，通知它们去重新渲染组件。

// proxy的优势如下：

Proxy 可以直接监听对象而非属性，可以直接监听数组的变化；
Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；


// Object.defineProperty 的优势如下:

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill(垫片)来弥补

```

9. ★ Composition API 的出现带来哪些新的开发体验，为啥需要这个？

```JS
1：在Compostion API 中时根据逻辑相关组织代码的，提高可读性和可维护性，类似于react的hook写法。
2：更好的重用逻辑代码，在Options API中通过MIxins重用逻辑代码，容易发生命名冲突且关系不清。
3：解决在生命周期函数经常包含不相关的逻辑，但又不得不把相关逻辑分离到了几个不同方法中的问题，如在mounted中设置定时器，但需要在destroyed中来清除定时器，将同一功能的代码拆分到不同的位置，造成后期代码维护的困难。
```

10.  什么情况下使用 Vuex

```JS
如果应用够简单，最好不要使用 Vuex，一个简单的 store 模式即可，需要构建一个中大型单页应用时，使用Vuex能更好地在组件外部管理状态
```

11.  Vuex可以直接修改state的值吗？ 

```JS
可以直接修改，但是极其不推荐，state的修改必须在mutation来修改，否则无法被devtool所监测，无法监测数据的来源，无法保存状态快照，也就无法实现时间漫游/回滚之类的操作。
```

12. ★ 为什么Vuex的mutation不能做异步操作 

```JS
Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，否则无法被devtools所监测。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。
```

13.  v-model和vuex有冲突吗？

```JS
// 答案：
```

14.  解释单向数据流和双向数据绑定

```JS
对于 Vue 来说，组件之间的数据传递具有单向数据流这样的特性称为单向数据流，单向数据流（Unidirectional data flow）方式使用一个上传数据流和一个下传数据流进行双向数据通信，两个数据流之间相互独立，单向数据流指只能从一个方向来修改状态。

而双向数据绑定即为当数据发生变化的时候，视图也就发生变化，当视图发生变化的时候，数据也会跟着同步变化，两个数据流之间互为影响。
```

15. ★★ Vue 如何去除url中的 `#`

```JS
将路由模式改为history
```

16. ★★ vue-router 路由实现原理

```JS

```

17.  $route 和 $router 的区别

```JS
$route用来获取路由的信息的，它是路由信息的一个对象，里面包含路由的一些基本信息，包括name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等。而$router主要是用来操作路由的，它是VueRouter的实例，包含了一些路由的跳转方法，钩子函数等
```

18. ★★ 对比 jQuery，Vue 有什么不同

```JS
jQuery 专注视图层，通过直接操作 DOM 去实现页面的一些逻辑渲染；Vue 专注于数据层，通过数据的双向绑定，最终表现在 DOM 层面，减少了 DOM 操作。Vue 使用了组件化思想，使得项目子集职责清晰，提高了开发效率，方便重复利用，便于协同开发
```

19.  Vue 中怎么自定义指令

```JS
通过directive来自定义指令，自定义指令分为全局指令和局部指令，自定义指令也有几个的钩子函数，常用的有bind和update，当 bind 和 update 时触发相同行为，而不关心其它的钩子时可以简写。一个表达式可以使用多个过滤器。过滤器之间需要用管道符“|”隔开。其执行顺序从左往右。
```

20.  Vue 中怎么自定义过滤器

```JS
通过filter来定义过滤器，过滤器分为全局和局部过滤器，过滤器的主体为一个普通的函数，来对数据进行处理，可以传递参数。当有局部和全局两个名称相同的过滤器时候，会以就近原则进行调用，即：局部过滤器优先于全局过滤器被调用。
```

21.  Vue 等单页面应用的优缺点

```JS
// 优点
1单页应用的内容的改变不需要重新加载整个页面，web应用更具响应性和更令人着迷。

2、单页应用没有页面之间的切换，就不会出现“白屏现象”,也不会出现假死并有“闪烁”现象

3、单页应用相对服务器压力小，服务器只用出数据就可以，不用管展示逻辑和页面合成，吞吐能力会提高几倍。

4、良好的前后端分离。后端不再负责模板渲染、输出页面工作，后端API通用化，即同一套后端程序代码，不用修改就可以用于Web界面、手机、平板等多种客户端。

// 缺点
1、首次加载耗时比较多。

2、SEO问题，不利于百度，360等搜索引擎收录。

3、容易造成Css命名冲突。

4、前进、后退、地址栏、书签等，都需要程序进行管理，页面的复杂度很高，需要一定的技能水平和开发成本高。
```

22.  Vue-router 使用params与query传参有什么区别

```JS
// 用法上
1：query要用path来引入，params要用name来引入，接收参数都是类似的，分别是this.$route.query.name和this.$route.params.name。

// 展示上
2：query更加类似于我们ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

3：params是路由的一部分,必须要有。query是拼接在url后面的参数，没有也没关系。
4：params、query不设置也可以传参，params不设置的时候，刷新页面或者返回参数会丢失

```

23.  Vue中 keep-alive 的作用

```JS
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。一旦使用keepalive包裹组件，此时mouted，created等钩子函数只会在第一次进入组件时调用，当再次切换回来时将不会调用。此时如果我们还想在每次切换时做一些事情，就需要用到另外的周期函数，actived和deactived，这两个钩子函数只有被keepalive包裹后才会调用。
```

24.  Vue如何实现单页面应用

```JS
通常的url 地址由以下内容构成：协议名 域名 端口号 路径 参数 哈希值，当哈希值改变，页面不会发生跳转，单页面应用就是利用了这一点，给window注册onhashchange事件，当哈希值改变时通过location.hash就能获得相应的哈希值，然后就能跳到相应的页面。
```

25. ★ 说明一下封装vue组件的原则和方法

```JS
// 答案：
```

26.  说出至少4种Vue当中的指令和它的用法？

```JS
v-if(判断是否隐藏，用来判断元素是否创建)
v-show(元素的显示隐藏，类似css中的display的block和hidden)
v-for(把数据遍历出来)
v-bind(绑定属性)
v-model(实现双向绑定)
```

27.  Vuex是什么？怎么使用？描述使用它实现登录功能的流程？

```JS

```

28.  谈谈vue生命周期函数？vue的实例选项对象？谈谈动态数据绑定的原理是什么？如何切换路由。有哪些方法传值到下一个页面，区别是什么？

```JS

```

29.  Vue-loader解释一下

```JS
解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。
```

30. ★★ 用 Vue 封装个组件，可以自定义里面有多少个input

```JS
// 答案：
```

31.  用过插槽吗？用的是具名插槽还是匿名插槽

```JS
用过，都使用过。插槽相当于预留了一个位置，可以将我们书写在组件内的内容放入，写一个插槽就会将组件内的内容替换一次，两次则替换两次。为了自定义插槽的位置我们可以给插槽取名，它会根据插槽名来插入内容，一一对应。
```

32.  Vue-cli运行的命令行

```JS
// 答案：
```

33.  Vue 路由守卫 

```JS
vue-router 提供的导航守卫主要用来对路由的跳转进行监控，控制它的跳转或取消，路由守卫有全局的, 单个路由独享的, 或者组件级的。导航钩子有3个参数：

1、to:即将要进入的目标路由对象；
2、from:当前导航即将要离开的路由对象；
3、next ：调用该方法后，才能进入下一个钩子函数（afterEach）。
```

34. ★★ Vue中如何实现子组件内的css样式名在项目中绝对唯一性

```JS
在style标签上加上scoped属性
```

35. ★★ Vue3中的双向数据绑定proxy

```JS
Proxy相当于在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写,我们可以这样认为,Proxy是Object.defineProperty的全方位加强版，它解决了之前defineProperty无法监听到数组变化等缺点。
```

36. ★★ 55、Vue和React中diff算法区别

```JS
vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。

1.vue对比节点。当节点元素相同，但是classname不同，认为是不同类型的元素，删除重建，而react认为是同类型节点，只是修改节点属性。

2.vue的列表对比，采用的是两端到中间比对的方式，而react采用的是从左到右依次对比的方式。当一个集合只是把最后一个节点移到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移到第一个。总体上，vue的方式比较高效。
```

37.  请你说一下 Vue 中 create 和 mount 的区别

```JS
create为组件初始化阶段，在此阶段主要完成数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，此时还未生成真实的DOM，也就无法获取和操作DOM元素。而mount主要完成从虚拟DOM到真实DOM的转换挂载，此时html已经渲染出来了，所以可以直接操作dom节点。
```

38. ★ Object.defineProperty有什么缺点

```JS
1：无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
2：只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。
```

39. ★ axios是什么？怎么使用？描述使用它实现登录功能的流程?

```JS
axios 是请求后台资源的模块。 通过npm install axios -S来安装，在大多数情况下我们需要封装拦截器，在实现登录的过程中我们一般在请求拦截器中来加入token，在响应请求器中通过判断后端返回的状态码来对返回的数据进行不同的处理。如果发送的是跨域请求，需在配置文件中 config/index.js 进行代理配置。
```

40. ★★ v-model是什么？Vue中标签怎么绑定事件？

```JS
v-model是一个语法糖，这一个指令可以分为几个指令，它内部已经帮我们处理整合了。对于普通的文本框来说，v-model = v-bind:value + @input。对单选框和复选框来说，v-model = v-bind:checked + @change，并且它还有一个非常重要的功能，就是解决父子组件之间的通讯问题，可以提升我们的开发效率。在vue中通过使用<v-on:事件名 = 函数名>的方式来绑定事件。
```

41.  路由懒加载

```JS
把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应的组件即为路由的懒加载，可以加快项目的加载速度，提高效率。通过这种格式来导入组件const foo = () => import('./foo.vue');
```

42. ★ computed和watcher的区别？watch实现原理？watch有几种写法？

```JS
计算属性computed : 

1. 支持缓存，只有依赖数据发生改变，才会重新进行计算
2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
3.computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
5.如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

侦听属性watch：

1. 不支持缓存，数据变，直接会触发相应的操作；
2.watch支持异步；
3.监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
4. 当一个属性发生变化时，需要执行对应的操作；一对多；
5. 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，
immediate：组件加载立即触发回调函数执行，
deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。
注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。

watch工作原理:
watch在一开始初始化的时候，会读取一遍监听的数据的值，此时那个数据就收集到watch的watcher了然后你给watch设置的handler，watch 会放入watcher的更新函数中，当数据改变时，通知watch的watcher进行更新，于是你设置的handler就被调用了。


```

43.  Vue中 computed 的原理，怎么追踪到它的依赖的？还是怎么确定是他的依赖变更 他才更新

```JS
// 答案：
```

44. ★ 如果你是leader，做管理系统项目 Vue和React 怎么选择？

```JS
 评估项目成员的水平，如果成员js基础较好、编码能力较强则选择React，否则Vue。
 评估系统的大小，如果想构建生态系统，则选择React，如果要求而快，简单和“能用就行",则选择Vue。
 评估系统运行环境，如果你想要一个同时适用于Web端和原生APP的框架，请选择React(RN)。
```

45.  Vuex的缺点

```JS
如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的，并且state中的值会伴随着浏览器的刷新而初始化，无缓存。
```

46. ★ Vue和React区别

```JS
1：Vue 使用的是 web 开发者更熟悉的模板与特性，Vue的API跟传统web开发者熟悉的模板契合度更高，比如Vue的单文件组件是以模板+JavaScript+CSS的组合模式呈现，它跟web现有的HTML、JavaScript、CSS能够更好地配合。React 的特色在于函数式编程的理念和丰富的技术选型，Vue更加注重web开发者的习惯。
2：Vue跟React的最大区别在于数据的reactivity，就是反应式系统上。Vue提供反应式的数据，当数据改动时，界面就会自动更新，而React里面需要调用方法SetState。我把两者分别称为Push-based和Pull-based
```

47.  Vue路由传参，刷新后还有吗

```JS
通过params传参会出现参数丢失的情况，可以通过query的传参方式或者在路由匹配规则加入占位符即可以解决参数丢失的情况。
```

48.  Vue深层次嵌套传值方法

```JS
利用$attrs 和 $listeners
```

49.  Vue组件如何引入使用

```JS
1. 定义组件并抛出
2. import引入，并在component里面定义
3. 使用组件（注意首字母大写）
```

50. ★ Vue路由实现的底层原理

```JS
在Vue中利用数据劫持defineProperty在原型prototype上初始化了一些getter,分别是router代表当前Router的实例 、 router代表当前Router的实例、router代表当前Router的实例、route 代表当前Router的信息。在install中也全局注册了router-view,router-link,其中的Vue.util.defineReactive, 这是Vue里面观察者劫持数据的方法，劫持_route，当_route触发setter方法的时候，则会通知到依赖的组件。

接下来在init中，会挂载判断是路由的模式，是history或者是hash,点击行为按钮，调用hashchange或者popstate的同时更_route,_route的更新会触发route-view的重新渲染。
```

51. ★ 如何封装一个通用组件

```JS
通用组件的封装就是对可复用组件的解耦和样式复用，为了解耦一般数据都是通过父组件传递过来，在子组件中进行数据处理，对于一些较为复杂的数据可能还需要做数据验证，为了避免高耦合，逻辑最好放在父组件中，通过自定义事件将数据回传，子组件只是一个承载体，这样既降低耦合，保证子组件中数据和逻辑不会混乱。如果同一组件需要适应不同需求时，我们需要配合slot来使用，可以通过具名插槽灵活地解决了不同场景同一组件不同配置的问题。
```

52. ★★ Vue 生命周期通常使用哪些

```JS
常用的生命周期有，beforeCreate，created，beforeMount，mounted，beforeUpdate，updated，beforeDestroy，destroyed
```


53. ★★ Vue 深层次的组件怎么和父组件通讯

1、使用$attrs和$listeners

```js
Vue.component('C', {
  template: `
    <div>
      <p>我是C组件</p>
      <input 
        type='text' 
        v-model='$attrs.msgc' 
        @input='$emit("getC", $attrs.msgc)' 
      />
    </div>
	`
})

Vue.component('B', {
  /**
    给C组件绑定$attrs属性和$listeners事件，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的）
  */
  template: `
    <div>
      <p>我是B组件</p>
      <input 
        type='text' 
        v-model='mymsg1' 
        @input="$emit('getChild', mymsg1)"
      />
      <C v-bind='$attrs' v-on='$listeners'/>
    </div>
  `,
  props: ['msg1'],
  data () {
    return {
      mymsg1: this.msg1
    }
  }
})

Vue.component('A', {
  template: `
    <div id='app'>
      <p>我是A组件</p>
      <B 
        :msg1='msg1' 
        :msgc='msgc' 
        @getChild='getChild'
        @getC='getC'
      />
    </div>
  `,
  data () {
    return {
      msg1: 'A',
      msgc: 'hello c!'
    }
  },
  methods: {
    getChild (val) {
      console.log( val )
    },
    getC (val) {
      console.log( val )
    }
  }
})

const app = new Vue({
  el: '#app',
  template: `
  	<A />  
  `
})
```



54. ★★ Vue 响应式原理

1.观察者observer：首先通过观察者对data中的属性使用object.defineproperty劫持数据的getter和setter，通知订阅者，触发他的update方法，对视图进行更新

2.Compile：用来解析模板指令，并替换模板数据，初始化视图，初始化相应的订阅器

3.订阅者Watcher：订阅者接到通知后，调用update方法更新对应的视图

4.订阅器Dep：订阅者可能有多个，因此需要订阅器Dep来专门接收这些订阅者，并统一管理

但在vue3中抛弃了object.defineproperty方法，因为

1.Object.defineproperty无法监测**对象属性的添加和删除**、**数组索引和长度的变更**，因此vue重写了数组的push/pop/shift/unshift/splice/sort/reverse方法

2.Object.defineProperty只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，这样很消耗性能

vue3中实现数据双向绑定的原理是数据代理，使用proxy实现。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。



55. ★ Vue proxy的原理

 主要通过Proxy对对象进行绑定监听处理，通过new Map对对象的属性操作进行处理，将要执行的函数匹配到存到对应的prop上面，通过每次的访问触发get方法，进行存方法的操作，通过修改触发set的方法，此时执行回调监听的函数，这样达到修改数据和视图的 

[参考](https://www.yuque.com/zhongyangweizao/wheel/off7wo)



56.  Vue $forceUpdate的原理 

**1、作用：**

迫使 `Vue` 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

**2、内部原理：**

```js
Vue.prototype.$forceUpdate = function () {
    const vm: Component = this
    if (vm._watcher) {
        vm._watcher.update()
    }
}
```

实例需要重新渲染是在依赖发生变化的时候会通知watcher，然后通知watcher来调用update方法，就是这么简单。




57.  v-for key

- key是为Vue中的vnode标记的唯一id,通过这个key,我们的diff操作可以更准确、更快速
- diff算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的key与旧节点进行比对,然后超出差异.

> diff程可以概括为：oldCh和newCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和newCh至少有一个已经遍历完了，就会结束比较,这四种比较方式就是首、尾、旧尾新头、旧头新尾.

> 准确: 如果不加key,那么vue会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的bug. 快速: key的唯一性可以被Map数据结构充分利用,相比于遍历查找的时间复杂度`O(n)`,`Map`的时间复杂度仅仅为`O(1)`

[建议使用id，不建议使用索引](https://www.jianshu.com/p/4bd5e745ce95)



58. ★ defineProperty在数据劫持后是如何通知数据的更新和视图的更新的

vue的双向绑定是由数据劫持结合发布者－订阅者模式实现的，那么什么是数据劫持？vue是如何进行数据劫持的？说白了就是通过Object.defineProperty()来劫持对象属性的setter和getter操作，在数据变动时做你想要做的事情

我们已经知道实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发生变化了，就需要告诉订阅者Watcher看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令（如v-model，v-on）对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。因此接下去我们执行以下3个步骤，实现数据的双向绑定：

1.实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。

2.实现一个订阅者Watcher，每一个Watcher都绑定一个更新函数，watcher可以收到属性的变化通知并执行相应的函数，从而更新视图。

3.实现一个解析器Compile，可以扫描和解析每个节点的相关指令（v-model，v-on等指令），如果节点存在v-model，v-on等指令，则解析器Compile初始化这类节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher）。



59. ★ Vue是怎么做虚拟DOM的diff的

[实现虚拟DOM的过程](https://segmentfault.com/a/1190000020663531?utm_source=tag-newest)



60. ★ Vuex如何实现跨组价的数据监听





61. ★ 中间件机制是怎么生效的





62. ★ axios谁封装的，怎么封装的

```js
// 使用axios用于对数据的请求
import axios from 'axios'
// 创建axios实例
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000
})

// 创建请求的拦截器
instance.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

// 创建响应的拦截器
instance.interceptors.response.use(response => {
  let res = null
  
  // 对相应的数据进行过滤
  if (response.status === 200) {
    if (response.data && response.data.err === 0) {
      res = response.data.data
    } else if (response.data.err === -1) {
      return alert('token无效')
    }
  } else {
    return alert('请求失败')
  }

  return res
}, error => {
  return Promise.reject(error)
})

export default instance
```





63.  为什么要设置key值，可以用index吗？为什么不能？

vue中列表循环需加:key="唯一标识" 唯一标识可以是item里面id index等，因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件 key的作用主要是为了高效的更新虚拟DOM

[详情链接](https://blog.csdn.net/weixin_45629194/article/details/104969834)



64.  Vue的虚拟dom

[参考](https://blog.csdn.net/u010692018/article/details/78799335/)



65.  diff复杂度原理及具体过程画图

diff算法是一种通过同层的树节点进行比较的高效算法，避免了对树进行逐层搜索遍历，所以时间复杂度只有 O(n)。

diff算法有两个比较显著的特点：

1、比较只会在同层级进行, 不会跨层级比较。

2、在diff比较的过程中，循环从两边向中间收拢。

diff流程：
首先定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 VNode 的两边的索引。

接下来是一个 while 循环，在这过程中，oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢。while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。

while 循环中会遇到四种情况：

情形一：当新老 VNode 节点的 start 是同一节点时，直接 patchVnode 即可，同时新老 VNode 节点的开始索引都加 1。

情形二：当新老 VNode 节点的 end 是同一节点时，直接 patchVnode 即可，同时新老 VNode 节点的结束索引都减 1。

情形三：当老 VNode 节点的 start 和新 VNode 节点的 end 是同一节点时，这说明这次数据更新后 oldStartVnode 已经跑到了 oldEndVnode 后面去了。这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldEndVnode 的后面，同时老 VNode 节点开始索引加 1，新 VNode 节点的结束索引减 1。

情形四：当老 VNode 节点的 end 和新 VNode 节点的 start 是同一节点时，这说明这次数据更新后 oldEndVnode 跑到了 oldStartVnode 的前面去了。这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldStartVnode 的前面，同时老 VNode 节点结束索引减 1，新 VNode 节点的开始索引加 1。

while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。

情形一：如果在循环中，oldStartIdx大于oldEndIdx了，那就表示oldChildren比newChildren先循环完毕，那么newChildren里面剩余的节点都是需要新增的节点，把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中

情形二：如果在循环中，newStartIdx大于newEndIdx了，那就表示newChildren比oldChildren先循环完毕，那么oldChildren里面剩余的节点都是需要删除的节点，把[oldStartIdx, oldEndIdx]之间的所有节点都删除


66.  怎么修改Vuex中的状态？Vuex中有哪些方法

- 通过**this.$store.state.属性** 的方法来访问状态
- 通过**this.$store.commit(‘mutation中的方法’)** 来修改状态



67.  vue-router路由传参的方式

1、路由传参

1. query

   ```js
   // 方法一
   <template>
   	<router-link
             :to="{
                     path: 'blogDetail',
                     query: { id: item.id, views: item.views }
                   }"
             tag="h2"
           >{{ item.title }}
   	</router-link>
   </template>
   
   // 方法二
   this.$router.push({  
     path: 'blogDetail', 
     query: { 
       id: item.id,
       views: item.views
     }
   })
   ```

2. params

   ```js
   <template>
   	<router-link
             :to="{
                     name: 'blogDetail',
                     params: { id: item.id, views: item.views }
                   }"
             tag="h2"
           >{{ item.title }}
   	</router-link>
   </template>
   
   this.$router.push({  
     name: 'blogDetail', 
     params: { 
       id: item.id,
       views: item.views
     }
   })
   ```





68.  hash history区别，怎么去解决history回退问题

|          | hash                       | history          |
| -------- | -------------------------- | ---------------- |
| url显示  | 有#，很Low                 | 无#，好看        |
| 回车刷新 | 可以加载到hash值对应页面   | 一般就是404掉了  |
| 支持版本 | 支持低版本浏览器和IE浏览器 | HTML5新推出的API |





69.  用过beforeEach吗？

每次通过vue-router进行页面跳转，都会触发beforeEach这个钩子函数，这个回调函数共有三个参数，to，from，next这三个参数，to表示我要跳转的目标路由对应的参数，from表示来自那个路由，就是操作路由跳转之前的，即将离开的路由对应的参数，next是一个回调函数，一定要调用next方法来resolve这个钩子函数；



70.  jQuery写的页面，切换到vue的页面，有卡顿吗？





71.  Vnode的缺点





72.  Vue中的单项数据流

 单向数据流指只能从一个方向来修改状态。 

数据从父级组件传递给子组件，只能单向绑定。

子组件内部不能直接修改从父级传递过来的数据。



73.  Vue组件中的Data为什么是函数，根组件却是对象呢？

综上可知，如果data是一个函数的话，这样每复用一次组件，就会返回一份新的data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份data，就会造成一个变了全都会变的结果。

所以说vue组件的data必须是函数。这都是因为js的特性带来的，跟vue本身设计无关。



74.  你做过哪些Vue的性能优化？

1、首屏加载优化

2、路由懒加载

```js
{      
  path: '/',      
  name: 'home',      
  component: () => import('./views/home/index.vue'),      
  meta: { isShowHead: true }
}
```

3、开启服务器 Gzip

 开启 Gzip 就是一种压缩技术，需要前端提供压缩包，然后在服务器开启压缩，文件在服务器压缩后传给浏览器，浏览器解压后进行再进行解析。首先安装 webpack 提供的`compression-webpack-plugin`进行压缩,然后在 vue.config.js： 

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']......plugins: [      
  new CompressionWebpackPlugin(
    {        
      algorithm: 'gzip',        
      test: 	new RegExp('\\.(' + productionGzipExtensions.join('|') + 				')$'),        	
      threshold: 10240,        
      minRatio: 0.8      
   	}
)]....
```

4、启动 CDN 加速

我们继续采用 cdn 的方式来引入一些第三方资源，就可以缓解我们服务器的压力，原理是将我们的压力分给其他服务器点。

5、代码层面优化 

- computed 和 watch 区分使用场景
  	computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
    	watch：类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
- v-if 和 v-show 区分使用场景
  v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。这里要说的优化点在于减少页面中 dom 总数，我比较倾向于使用 v-if，因为减少了 dom 数量。
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
  v-for 遍历必须为 item 添加 key，循环调用子组件时添加 key，key 可以唯一标识一个循环个体，可以使用例如 item.id 作为 key
  避免同时使用 v-if，v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度。

6、Webpack 对图片进行压缩

7、避免内存泄漏

8、减少 ES6 转为 ES5 的冗余代码



75. ★★ nextTick知道吗、实现的原理是什么？是宏任务还是微任务？

微任务

原理：

 nextTick方法主要是使用了宏任务和微任务，定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空队列。 

 作用：
nextTick用于下次Dom更新循环结束之后执行延迟回调，在修改数据之后使用nextTick用于下次Dom更新循环结束之后执行延迟回调，在修改数据之后使用nextTick用于下次Dom更新循环结束之后执行延迟回调，在修改数据之后使用nextTick,则可以在回调中获取更新后的DOM。 



76.  介绍下vue单页面和多页面区别

 单页应用
页面跳转---->js渲染
优点：页面切换快
缺点：首屏加载稍慢，seo差 

 多页应用
页面跳转---->返回html
优点：首屏时间快，seo效果好
缺点：页面切换慢 



77.  介绍下vue父子组件生命周期的执行顺序

[参考](https://blog.csdn.net/weixin_30616969/article/details/94973817)



78. ★ 虚拟 dom 为什么会提高性能？

 虚拟DOM其实就是一个JavaScript对象。通过这个JavaScript对象来描述真实DOM，真实DOM的操作，一般都会对某块元素的整体重新渲染，采用虚拟DOM的话，当数据变化的时候，只需要局部刷新变化的位置就好了 ,

 虚拟`dom`相当于在`js`和真实`dom`中间加了一个缓存，利用`dom diff`算法避免了没有必要的`dom`操作，从而提高性能 

**具体实现步骤如下**

- 用 `JavaScript` 对象结构表示 `DOM` 树的结构；然后用这个树构建一个真正的 `DOM` 树，插到文档当中
- 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
- 把2所记录的差异应用到步骤1所构建的真正的`DOM`树上，视图就更新



79. ★ Vue 的 computed 的原理

[参考](https://segmentfault.com/a/1190000010408657)



80.  Vue中key的作用？不加会怎么样？

vue中列表循环需加:key="唯一标识" 唯一标识可以是item里面id index等，因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件 key的作用主要是为了高效的更新虚拟DOM


81.  Vue计算属性和 Watch 的区别

**methods（方法）**

只要进行调用就会执行，不管依赖的值有没有改变。无缓存。

**computed（计算属性)**

监听其所有依赖的变化，如果有变化会执行，没有变化不执行。有缓存，不用每次重新算。不支持异步。

详解：在vue的 模板内（`{{}}`）是可以写一些简单的js表达式的 ，很便利。但是如果在页面中使用大量或是复杂的表达式去处理数据，对页面的维护会有很大的影响。这个时候就需要用到computed 计算属性来处理复杂的逻辑运算。

1.优点：

 在数据未发生变化时，优先读取缓存。computed 计算属性只有在相关的数据发生变化时才会改变要计算的属性，当相关数据没有变化是，它会读取缓存。而不必想 motheds方法 和 watch 方法是否每次都去执行函数。

2.setter 和 getter方法：（注意在vue中书写时用set 和 get）

 setter 方法在设置值是触发。

 getter 方法在获取值时触发。

**watch（侦听属性）**

观察某一个变量，发生变化会执行。支持异步。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。

小结：

1.主动调用的方法写在methods里，依据某些变量的更新进行某种操作用computed或者watch。

2.computed和watch：如果要异步，只能用watch。如果是计算某个值推荐用computed，比如购物车全选单选功能，购物车计算总价小计功能。



82.  Vue 中 v-on 可以绑定多个方法吗？

```js
<p v-on="{click:dbClick,mousemove:MouseClick}"></p>
```



83.  Vue 中 template 的编译过程

vue template模板编译的过程经过parse()生成ast(抽象语法树),optimize对静态节点优化，generate()生成render字符串
之后调用new Watcher()函数，用来监听数据的变化，render 函数就是数据监听的回调所调用的，其结果便是重新生成 vnode。
当这个 render 函数字符串在第一次 mount、或者绑定的数据更新的时候，都会被调用，生成 Vnode。
如果是数据的更新，那么 Vnode 会与数据改变之前的 Vnode 做 diff，对内容做改动之后，就会更新到 我们真正的 DOM

[参考](https://blog.csdn.net/qq_47008195/article/details/109148309)



84.  说一下 VueRouter 的 hash 模式和 history 模式区别

|          | hash                       | history          |
| -------- | -------------------------- | ---------------- |
| url显示  | 有#，很Low                 | 无#，好看        |
| 回车刷新 | 可以加载到hash值对应页面   | 一般就是404掉了  |
| 支持版本 | 支持低版本浏览器和IE浏览器 | HTML5新推出的API |






## node 

## react

## miniprogram

## 混合开发

## 算法题

## 手动封装函数

## 手动封装react组件

## 企业场景题
 1. Dialog
```js
/* 
  双十一快到了，为了提醒供应商进行双十一报名，PD提了需求需要在工作台展示一个弹窗，
  供应商一进来工作台就会显示这个弹窗，弹窗有两个按钮，一个去签署，一个取消，
  供应商点击去签署跳转到签署页面（https://tamll.com/sign.com）,
  现在希望使用React hooks实现一个名为useNotificationSign11Dialog的组件，
  请补充如下代码，完成以上需求
*/
  import DiaLog from 'Dialog'
  import React from 'react'
  import history from 'umi'
  function useNotificationSignDiaLog () {
    const [visible,setVisible] = useState(false)
    useEffect(() => {
      const currentTime = (new Date()).getDate()
      const originTime = localStorage.getItem('time');
      if (currentTime === originTime) {
        this.visible = false
      } else {
        this.visible = true;
      }
    },[])
    function onOk () {
      history.push('https://tmall.com/sign-11-protocol')
      this.visible = false;
    }
    function onCancel () {
      const date = new Date()
      localStorage.setItem('time', date.getDate())
    }
    return (<DiaLog
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    />)
  }
```