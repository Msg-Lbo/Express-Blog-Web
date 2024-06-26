import { useUserStore } from "@/store/userSotre";
import { createRouter, createWebHistory } from "vue-router";
import { createDiscreteApi } from 'naive-ui'
import { isAdminApi } from '@/apis/user'
const { message } = createDiscreteApi(['message'])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home_page/home/index.vue"),
      redirect: "/list",
      children: [
        {
          path: "/detail",
          name: "detail",
          component: () => import("@/views/home_page/article_detail/index.vue"),
        },
        {
          path: "/list",
          name: "list",
          component: () => import("@/views/home_page/article_list/index.vue"),
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('@/views/home_page/categories/index.vue')
        },
        {
          path: '/archives',
          name: 'archives',
          component: () => import('@/views/home_page/archives/index.vue')
        },
        {
          path: '/friends',
          name: 'friends',
          component: () => import('@/views/home_page/friends/index.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/home_page/about/index.vue')
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login_page/index.vue'),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import('@/views/admin_page/home_admin/index.vue'),
      redirect: '/dashboard',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/admin_page/dashboard/index.vue'),
        },
        {
          path: '/article-manager',
          name: 'article-manager',
          component: () => import('@/views/admin_page/article_admin/index.vue'),
        },
        {
          path: '/category-manager',
          name: 'category-manager',
          component: () => import('@/views/admin_page/category_admin/index.vue'),
        },
        {
          path: '/comments-manager',
          name: 'comments-manager',
          component: () => import('@/views/admin_page/comments_admin/index.vue'),
        },
        {
          path: '/friends-manager',
          name: 'friends-manager',
          component: () => import('@/views/admin_page/friends_admin/index.vue'),
        },
        {
          path: '/other-settings',
          name: 'other-settings',
          component: () => import('@/views/admin_page/settings_admin/index.vue'),
        },
        {
          path: '/images-manager',
          name: 'images-manager',
          component: () => import('@/views/admin_page/image_admin/index.vue'),
        }
      ]
    }
  ],
});


const isAdmin = async () => {
  const res = await isAdminApi();
  if (res.code === 200 && res.msg) {
    return true;
  }else{
    return false;
  }
}

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  // 如果需要登录
  if (to.meta.requireAuth) {
    if (userStore.userInfo.account === '') {
      message.error('您还没有登录，请先登录');
      next('/login');
    }
    // 如果是管理员
    if (await isAdmin()) {
      next();
    } else {
      message.error('您不是管理员，无法访问');
      next('/login');
    }
  } else {
    // 不需要登录的情况下直接放行
    next();
  }
});
export default router;