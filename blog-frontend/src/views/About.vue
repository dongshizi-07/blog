<template>
    <div class="about">
        <h2>关于我</h2>
        <p>这是关于我的页面。</p>
        
        <!-- 发布入口 -->
        <RouterLink to="/publish" class="publish-btn">
            ✍️ 发布新文章
        </RouterLink>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
</script>

<style scoped>
    .about {
        max-width: 700px;
        margin: 0 auto;
        padding: 40px 20px;
        text-align: center;
    }
    .publish-btn {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 24px;
        background: #42b983;
        color: #fff;
        text-decoration: none;
        border-radius: 6px;
    }
</style>