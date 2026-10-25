<template>
    <div class="navbar-wrap" :class="{ 'navbar-wrap-fixed': isFixed }">
        <nav class="navbar">
            <!-- logo -->
            <RouterLink to="/" class="logo">
                <img src="../assets/one-logo.png" alt="logo">
            </RouterLink>
            <!-- 中间导航菜单区域 -->
            <div class="nav-menu" :class="{ 'nav-menu-open': menuOpen }">
                <RouterLink to="/" class="nav-item" @click="closeMenu">首页</RouterLink>
                <RouterLink to="/featured" class="nav-item" @click="closeMenu">所有文章</RouterLink>
                <RouterLink to="/ai-chat" class="nav-item" @click="closeMenu">AI问答</RouterLink>
                <RouterLink to="/message" class="nav-item" @click="closeMenu">留言板</RouterLink>
                <RouterLink to="/about" class="nav-item" @click="closeMenu">关于我</RouterLink>
            </div>
            <!-- 登录+注册 -->
            <div class="nav-actions">
                <RouterLink to="/login" class="btn-login">登录</RouterLink>
                <RouterLink to="/register" class="btn-register">注册</RouterLink>
            </div>
            <!-- 汉堡按钮（仅小屏显示） -->
            <button
                class="menu-toggle"
                :class="{ 'is-active': menuOpen }"
                @click="toggleMenu"
                aria-label="菜单"
                :aria-expanded="menuOpen"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    import { ref, onMounted, onUnmounted, watch } from 'vue'
    import { useRoute } from 'vue-router'

    const isFixed = ref(false)
    const menuOpen = ref(false)
    const route = useRoute()

    const handleScroll = () => {
        isFixed.value = window.scrollY > 60
    }

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
        menuOpen.value = false
    }

    // 路由变化自动收起菜单
    watch(() => route.fullPath, closeMenu)

    onMounted(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })
</script>

<style scoped>
    .navbar-wrap {
        position: sticky;
        top: 0;
        z-index: 99;
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px solid #eaeaea;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .navbar-wrap-fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        z-index: 99;
    }

    /* ===== 导航主体：固定值 → clamp 流式值，1440px 以上与原来完全一致 ===== */
    .navbar {
        position: relative; /* 供小屏下拉菜单定位，不影响布局 */
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: clamp(16px, 6.25vw, 90px);
        height: clamp(60px, 6.25vw, 90px);
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 clamp(12px, 1.39vw, 20px);
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
    }
    .logo img {
        height: clamp(50px, 6.25vw, 90px);
        width: auto;
        max-width: 100%;
        object-fit: contain;
        border-radius: 0;
        border: none;
        background-color: transparent;
    }

    .nav-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: clamp(14px, 4.17vw, 60px);
        min-width: 0;
    }
    .nav-item {
        color: #333;
        font-size: clamp(15px, 1.74vw, 25px);
        text-decoration: none;
        white-space: nowrap;
        transition: color 0.2s;
    }
    .nav-item:hover {
        color: #42b983;
    }

    .nav-actions {
        display: flex;
        gap: clamp(8px, 1.25vw, 18px);
        flex-shrink: 0;
    }
    .btn-login {
        color: #333;
        font-size: clamp(14px, 1.39vw, 20px);
        text-decoration: none;
        padding: 6px clamp(10px, 1.11vw, 16px);
        border-radius: 4px;
        border: 1px solid #ccc;
        white-space: nowrap;
    }
    .btn-login:hover {
        background-color: rgba(66, 185, 131, 0.08);
    }
    .btn-register {
        color: #fff;
        font-size: clamp(14px, 1.39vw, 20px);
        text-decoration: none;
        padding: 6px clamp(10px, 1.11vw, 16px);
        border-radius: 4px;
        background-color: #42b983;
        white-space: nowrap;
    }
    .btn-register:hover {
        background-color: #369870;
    }

    /* 汉堡按钮：默认隐藏 */
    .menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        width: 36px;
        height: 36px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        flex-shrink: 0;
    }
    .menu-toggle span {
        display: block;
        width: 22px;
        height: 2px;
        background-color: #333;
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.2s ease;
    }
    .menu-toggle.is-active span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }
    .menu-toggle.is-active span:nth-child(2) {
        opacity: 0;
    }
    .menu-toggle.is-active span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }

    /* ===== 断点微调 ===== */
    @media (max-width: 1200px) {
        .navbar { gap: 32px; }
        .nav-menu { gap: 26px; }
    }

    @media (max-width: 900px) {
        .navbar {
            justify-content: space-between;
            gap: 16px;
            padding: 0 20px;
        }
        .nav-menu {
            margin: 0 10px;
            gap: 18px;
        }
    }

    @media (max-width: 768px) {
        .nav-menu { gap: 14px; }
        .nav-item { font-size: 15px; }
    }

    /* 640px 以下：显示汉堡，菜单改为下拉面板 */
    @media (max-width: 640px) {
        .navbar {
            justify-content: space-between;
            height: 60px;
            padding: 0 14px;
        }
        .logo img {
            height: 44px;
        }
        .nav-actions {
            gap: 8px;
        }
        .btn-login,
        .btn-register {
            font-size: 14px;
            padding: 5px 12px;
        }

        .menu-toggle {
            display: flex;
        }

        /* 覆盖原来 display:none，改为可展开的下拉面板 */
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            gap: 0;
            background-color: #ffffff;
            padding: 4px 20px;
            border-top: 1px solid #eaeaea;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }
        .nav-menu-open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto;
        }
        .nav-item {
            font-size: 16px;
            padding: 13px 0;
            border-bottom: 1px solid #f2f2f2;
        }
        .nav-item:last-child {
            border-bottom: none;
        }
    }

    @media (max-width: 360px) {
        .navbar { padding: 0 10px; }
        .logo img { height: 38px; }
        .btn-login,
        .btn-register {
            font-size: 13px;
            padding: 4px 9px;
        }
        .menu-toggle {
            width: 32px;
        }
    }
</style>