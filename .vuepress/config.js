module.exports = {
  title: "西阁",
  description: "Just playing around",
  head: [
    ['link', { rel: 'icon', href: 'https://ftp.bmp.ovh/imgs/2021/05/2656ae6284a05476.png' }]
  ],
  themeConfig: {
    logo: 'https://ftp.bmp.ovh/imgs/2021/05/2656ae6284a05476.png',
    smoothScroll: true,
    displayAllHeaders: true,
    nav: [
      { text: "主页", link: "/" },
      { text: "关于我", link: "/about/#联系方式" },
      {
        text: "技术笔记",
        ariaLabel: "Language Menu",
        items: [
          {
            text: "node",
            link: "/note/node/",
          },
          {
            text: "Vue",
            link: "/note/vue/",
          },
          {
            text: "React",
            link: "/note/react/",
          },
          {
            text: "Git",
            link: "/note/git/",
          },
          {
            text: "Webpack",
            link: "/note/webpack/",
          },
          {
            text: "小程序",
            link: "/note/miniprogram/",
          },
          {
            text: "Hybird",
            link: "/note/hybird/",
          },
        ],
      },
      {
        text: "技术博客",
        link: "http://www.web-yyb.top:666/",
        target: "_blank",
      },
      {
        text: "开源项目",
        ariaLabel: "Language Menu",
        items: [
          { text: "koa2+apidoc源码", link: "https://github.com/xigeOsp/api" },
          { text: "koa2+apidoc展示", link: "http://www.web-yyb.top:888" },
        ],
      },
      { text: "面试题", link: "/interview/" },
      { text: "前端资源集锦", link: "/resource/" },
      {
        text: "查看源码",
        link: "https://github.com/gabriel-yan-book/books",
        target: "_blank",
      },
    ],
  },
  plugins: ["@vuepress/back-to-top",'one-click-copy', ['@vuepress/search', {
    searchMaxSuggestions: 10
  }]],
};
