<template>
    <div class="detail">
        <div v-if="article" class="card">
            <h1>{{ article.title }}</h1>
            <p class="meta">{{ article.date }} · {{ article.category }}</p>
            <div class="content">{{ article.content }}</div>
            
            <button class="back-btn" @click="$router.push('/')">返回首页</button>
        </div>
        
        <div v-else class="not-found">
            文章不存在，可能已经被删除了。
            <button class="back-btn" @click="$router.push('/')">返回首页</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    // useRoute 用来获取网址里的参数（比如 /post/123 里的 123）
    const route = useRoute()
    const article = ref(null)

    onMounted(() => {
        // 1. 从网址里拿到文章的 id
        const id = Number(route.params.id)

        // 2. 去 localStorage 里把所有的文章都拿出来
        const saved = JSON.parse(localStorage.getItem('articles') || '[]')

        // 3. 用 find 找到 id 对应的那篇
        article.value = saved.find(item => item.id === id)
    })
</script>

<style scoped>
    .detail {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    .card {
        background: #ffffff;
        padding: 40px;
        border-radius: 12px;
        border: 1px solid #eee;
    }
    h1 {
        font-size: 28px;
        color: #222;
        margin-bottom: 12px;
    }
    .meta {
        color: #999;
        font-size: 14px;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid #eee;
    }
    .content {
        font-size: 16px;
        line-height: 1.8;
        color: #333;
        white-space: pre-wrap; /* 让换行生效 */
        margin-bottom: 40px;
    }
    .back-btn {
        padding: 8px 20px;
        background: #f0f0f0;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        color: #333;
    }
    .back-btn:hover {
        background: #e0e0e0;
    }
    .not-found {
        text-align: center;
        padding: 60px 20px;
        color: #999;
    }
    @media (max-width: 640px) {
        .card { padding: 24px; }
        h1 { font-size: 22px; }
    }
</style>