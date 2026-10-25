<template>
    <div class="publish">
        <h2>发布文章</h2>

        <form @submit.prevent="handleSubmit">
            <label class="field">
                <span>标题</span>
                <input v-model.trim="form.title" type="text" placeholder="给文章起个标题">
            </label>

            <label class="field">
                <span>分类</span>
                <input v-model.trim="form.category" type="text" placeholder="如：前端学习">
            </label>

            <label class="field">
                <span>正文</span>
                <textarea v-model.trim="form.content" placeholder="写点什么…"></textarea>
            </label>

            <p v-if="error" class="error">{{ error }}</p>

            <div class="actions">
                <button type="button" class="btn-cancel" @click="goHome">取消</button>
                <button type="submit" class="btn-submit">发布</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    // 表单数据
    const form = ref({
        title: '',
        category: '',
        content: ''
    })
    const error = ref('')

    const goHome = () => {
        router.push('/')
    }

    const handleSubmit = () => {
        error.value = ''

        // 简单校验
        if (!form.value.title) {
            error.value = '标题不能为空'
            return
        }
        if (!form.value.content) {
            error.value = '正文不能为空'
            return
        }

        // 1. 读出浏览器里已有的文章（没有就是空数组）
        const saved = JSON.parse(localStorage.getItem('articles') || '[]')

        // 2. 组装一篇新文章
        const newArticle = {
            id: Date.now(),                                  // 用当前时间戳当唯一 id
            title: form.value.title,
            desc: form.value.content.slice(0, 80),           // 取正文前 80 字当摘要
            content: form.value.content,
            category: form.value.category || '未分类',
            date: new Date().toISOString().slice(0, 10)      // 2026-10-24 这种格式
        }

        // 3. 放到最前面，再存回浏览器
        saved.unshift(newArticle)
        localStorage.setItem('articles', JSON.stringify(saved))

        // 4. 回首页看效果
        router.push('/')
    }
</script>

<style scoped>
    .publish {
        max-width: 700px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    .publish h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 24px;
    }
    .field {
        display: block;
        margin-bottom: 18px;
    }
    .field span {
        display: block;
        font-size: 14px;
        color: #666;
        margin-bottom: 6px;
    }
    .field input,
    .field textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 15px;
        outline: none;
        font-family: inherit;
    }
    .field input:focus,
    .field textarea:focus {
        border-color: #42b983;
    }
    .field textarea {
        min-height: 200px;
        resize: vertical;
        line-height: 1.6;
    }
    .error {
        color: #e74c3c;
        font-size: 14px;
        margin-bottom: 12px;
    }
    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    .btn-cancel,
    .btn-submit {
        padding: 9px 20px;
        border-radius: 6px;
        font-size: 15px;
        cursor: pointer;
        border: 1px solid #ccc;
        background: #fff;
        color: #333;
    }
    .btn-cancel:hover {
        border-color: #999;
    }
    .btn-submit {
        background: #42b983;
        border-color: #42b983;
        color: #fff;
    }
    .btn-submit:hover {
        background: #369870;
    }
    @media (max-width: 640px) {
        .publish {
            padding: 24px 16px;
        }
        .publish h2 {
            font-size: 20px;
        }
    }
</style>