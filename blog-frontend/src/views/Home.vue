<template>
    <div class="home page">
        <section class="hero">
            <h1>欢迎来到博客空间</h1>

            <!-- 搜索框 -->
            <div class="search-box">
                <!-- 搜索图形 -->
                <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
                    <!-- 放大镜手柄 -->
                    <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <!-- 输入设置 -->
                <input
                    v-model.trim="keyword"
                    type="text"
                    inputmode="search"
                    class="search-input"
                    placeholder="搜索文章标题、关键字或分类…"
                    @keydown.esc="keyword = ''"
                >
                <!-- 清除图标 -->
                <button
                    v-if="keyword"
                    class="search-clear"
                    type="button"
                    aria-label="清空搜索"
                    @click="keyword = ''"
                >×</button>
            </div>

            <p v-if="keyword" class="search-tip">
                共找到 <strong>{{ filteredArticles.length }}</strong> 篇相关文章
            </p>
        </section>

        <section class="article-list">
            <h2>{{ keyword ? '搜索结果' : '最新文章' }}</h2>
            <!-- 文章卡片 -->
            <div
                v-for="article in filteredArticles"
                :key="article.id"
                class="article-card"
            >
                <RouterLink 
                v-for="article in filteredArticles" 
                :key="article.id" 
                :to="'/post/' + article.id" 
                class="article-card"
                style="display: block; text-decoration: none; color: inherit;"
                >
                    <h3>
                        <template v-for="(seg, i) in highlight(article.title)" :key="'t' + i">
                            <mark v-if="seg.match">{{ seg.text }}</mark>
                            <template v-else>{{ seg.text }}</template>
                        </template>
                    </h3>
                    <p>
                        <template v-for="(seg, i) in highlight(article.desc)" :key="'d' + i">
                            <mark v-if="seg.match">{{ seg.text }}</mark>
                            <template v-else>{{ seg.text }}</template>
                        </template>
                    </p>
                    <span class="meta">
                        <template v-for="(seg, i) in highlight(article.category)" :key="'c' + i">
                            <mark v-if="seg.match">{{ seg.text }}</mark>
                            <template v-else>{{ seg.text }}</template>
                        </template>
                        · {{ article.date }}
                    </span>
                </RouterLink>
            </div>

            <p v-if="filteredArticles.length === 0" class="empty">
                没有找到与“{{ keyword }}”相关的文章，换个关键词试试～
            </p>
        </section>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { RouterLink } from 'vue-router'

       // 默认的 3 篇文章（第一次打开、localStorage 里还没有数据时用）
    const defaultArticles = [
        {
            id: 1,
            title: 'Vue3 Router 入门：实现页面跳转',
            desc: '记录我从0开始配置路由、实现导航栏跳转的踩坑过程...',
            category: '前端学习',
            date: '2026-10-22'
        },
        {
            id: 2,
            title: 'Flex布局：写好导航栏的核心',
            desc: '为什么导航栏总是折行、不居中？一篇讲透flex常用属性...',
            category: 'CSS基础',
            date: '2026-10-20'
        },
        {
            id: 3,
            title: '我的全栈博客规划：后面要加RAG智能问答',
            desc: '这个博客不只是静态页面，后面会接入向量数据库、AI Agent...',
            category: '项目规划',
            date: '2026-10-18'
        }
    ]

    // 从 localStorage 读；没有就存一份默认的进去，再读出来
    const saved = JSON.parse(localStorage.getItem('articles') || 'null')
    const articles = ref(saved && saved.length ? saved : defaultArticles)
    if (!saved) {
        localStorage.setItem('articles', JSON.stringify(defaultArticles))
    }

    // 搜索关键词
    const keyword = ref('')

    // 过滤后的文章列表
    const filteredArticles = computed(() => {
        const kw = keyword.value.toLowerCase()
        if (!kw) return articles.value
        return articles.value.filter(a =>
            a.title.toLowerCase().includes(kw) ||
            a.desc.toLowerCase().includes(kw) ||
            a.category.toLowerCase().includes(kw)
        )
    })

    // 把文本按关键词切分，用于 <mark> 高亮
    const highlight = (text) => {
        const kw = keyword.value
        if (!kw) return [{ text, match: false }]

        const lowerText = text.toLowerCase()
        const lowerKw = kw.toLowerCase()
        const segments = []
        let start = 0
        let idx = lowerText.indexOf(lowerKw)

        while (idx !== -1) {
            if (idx > start) {
                segments.push({ text: text.slice(start, idx), match: false })
            }
            segments.push({ text: text.slice(idx, idx + kw.length), match: true })
            start = idx + kw.length
            idx = lowerText.indexOf(lowerKw, start)
        }
        if (start < text.length) {
            segments.push({ text: text.slice(start), match: false })
        }
        return segments
    }
</script>

<style scoped>
    .home {
        max-width: 1000px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    .hero {
        text-align: center;
        padding: 30px 0 40px;
    }
    .hero h1 {
        font-size: 36px;
        color: #222;
        margin-bottom: 30px;
    }

    /*  搜索框  */
    .search-box {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        max-width: 520px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 999px;
        padding: 0 16px;
        height: 48px;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-box:focus-within {
        border-color: #42b983;
        box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.15);
    }
    .search-icon {
        width: 20px;
        height: 20px;
        color: #999;
        flex-shrink: 0;
        margin-right: 10px;
    }
    .search-input {
        flex: 1;
        min-width: 0;
        height: 100%;
        border: none;
        outline: none;
        background: transparent;
        font-size: 16px;
        color: #333;
    }
    .search-input::placeholder {
        color: #aaa;
    }
    .search-clear {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        margin-left: 8px;
        border: none;
        border-radius: 50%;
        background: #f0f0f0;
        color: #666;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
    }
    .search-clear:hover {
        background: #e0e0e0;
        color: #333;
    }

    .search-tip {
        margin-top: 14px;
        font-size: 14px;
        color: #888;
    }
    .search-tip strong {
        color: #42b983;
    }

    /*  文章列表  */
    .article-list h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 24px;
    }
    .article-card {
        background: #ffffff;
        padding: 24px;
        border-radius: 10px;
        margin-bottom: 16px;
        border: 1px solid #eee;
        transition: box-shadow 0.2s;
    }
    .article-card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }
    .article-card h3 {
        font-size: 20px;
        color: #222;
        margin-bottom: 10px;
    }
    .article-card p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 12px;
    }
    .article-card .meta {
        font-size: 14px;
        color: #999;
    }

    /* 关键词高亮 */
    mark {
        background: rgba(66, 185, 131, 0.25);
        color: inherit;
        padding: 0 2px;
        border-radius: 3px;
    }

    .empty {
        text-align: center;
        color: #999;
        font-size: 15px;
        padding: 40px 0;
        background: #ffffff;
        border: 1px dashed #e0e0e0;
        border-radius: 10px;
    }

    /*  响应式  */
    @media (max-width: 640px) {
        .home {
            padding: 24px 16px;
        }
        .hero {
            padding: 36px 0 28px;
        }
        .hero h1 {
            font-size: 26px;
            margin-bottom: 20px;
        }
        .search-box {
            height: 44px;
            padding: 0 12px;
        }
        .search-input {
            font-size: 15px;
        }
        .article-list h2 {
            font-size: 20px;
            margin-bottom: 18px;
        }
        .article-card {
            padding: 18px;
        }
        .article-card h3 {
            font-size: 17px;
        }
        .article-card p {
            font-size: 14px;
        }
    }
</style>