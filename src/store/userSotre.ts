import { logoutApi } from '@/apis/user'
import router from '@/router'
import { defineStore } from 'pinia'
import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'])


export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: {
            id: 0,
            account: '',
            nickname: '',
            email: '',
            avatar: '',
            identity: ''
        }
    }),
    actions: {
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo
        },
        async logout() {
            const res = await logoutApi()
            if (res.code === 200) {
                this.userInfo.id = 0
                this.userInfo.account = ''
                this.userInfo.avatar = ''
                this.userInfo.nickname = ''
                this.userInfo.avatar = ''
                this.userInfo.email = ''
                this.userInfo.identity = ''
                router.push('/login')
                message.success(res.msg)
            }
        }

    },
    // 持久化
    persist: true
})
