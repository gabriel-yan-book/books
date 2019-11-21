module.exports = {
  title: '西阁 - 闫亚兵',
  description: 'Just playing around',
  themeConfig: {
    smoothScroll: true,
    displayAllHeaders: true,
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/guild/',      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
          '/',
          '/one',
          '/two'
        ]
      },
    ],
    nav: [
      { text: '主页', link: '/' },
      { text: '开源项目', 
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      { text: '技术笔记', 
        ariaLabel: 'Language Menu',
        items: [
          { text: 'React技术笔记', link: 'https://gabriel-yan-book.github.io/react-books/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      { text: '关于我', link: '/about/' },
      { text: '个人博客', link: 'https://google.com',target:'_blank' },
      { text: '查看源码', link: 'https://google.com',target:'_blank' },
    ]
  }
}