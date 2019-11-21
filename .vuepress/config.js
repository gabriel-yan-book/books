module.exports = {
  title: '西阁 - 闫亚兵',
  description: 'Just playing around',
  themeConfig: {
    smoothScroll: true,
    displayAllHeaders: true,
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
          { text: 'Vue技术笔记', link: 'https://gabriel-yan-book.github.io/vue-books/' },
          { text: 'git技术笔记', link: 'https://gabriel-yan-book.github.io/vue-books/' },
          { text: 'webpack技术笔记', link: 'https://gabriel-yan-book.github.io/vue-books/' }
        ]
      },
      { text: '关于我', link: '/about/#联系方式' },
      { text: '个人博客', link: 'https://google.com',target:'_blank' },
      { text: '查看源码', link: 'https://github.com/gabriel-yan-book/books',target:'_blank' },
    ]
  },
  plugins: ['@vuepress/back-to-top']
}