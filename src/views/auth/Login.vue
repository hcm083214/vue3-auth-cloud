<template>
    <div class="login">
        <el-form :model="loginForm" :rules="loginRules" class="login-form" ref="loginFormRef">
            <h3 class="title">auth {{ $t("common.appName") }}</h3>
            <el-form-item prop="userName">
                <el-input v-model="loginForm.userName" type="text" auto-complete="off"
                    :placeholder="$t('login.usernamePlaceholder')" :prefix-icon="User">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" auto-complete="off"
                    :placeholder="$t('login.passwordPlaceholder')" :prefix-icon="Lock"
                    @keyup.enter="handleLogin(loginFormRef)">
                </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="loginForm.captchaEnabled" class="login-form-item-code">
                <el-input v-model="loginForm.code" auto-complete="off" :placeholder="$t('login.codePlaceholder')"
                    style="width: 63%" :prefix-icon="Key" @keyup.enter="handleLogin(loginFormRef)">
                </el-input>
                <div class="login-code">
                    <img :src="loginForm.codeUrl" @click="getCode" class="login-code-img" />
                </div>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">{{ $t('login.remember')
                }}</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button :loading="loginForm.loading" type="primary" style="width:100%;"
                    @click.prevent="handleLogin(loginFormRef)">
                    <span v-if="!loginForm.loading">{{ $t('common.login') }}</span>
                    <span v-else>{{ $t('common.login') }}...</span>
                </el-button>
                <div style="float: right;" v-if="loginForm.register">
                    <router-link class="link-type" :to="'/register'">{{ $t('login.register') }}</router-link>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="img">
                    <icon icon="svg-icon:gitee" :size="35" @click="giteeLogin" class="pointer" />
                </div>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2018-2023 All Rights Reserved.</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { User, Lock, Key } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

import { encrypt, decrypt } from '@/utils/jsencrypt';
import { setToken } from '@/utils/token';
import { REDIRECT_KEY } from "@/router/index";
import { getCodeApi, loginApi, preLoginByThirdPartyApi } from "@/api/login";
import Icon from "@/components/Icon.vue";
import { $t } from "@/utils/i18n";
import { USERPERMISSIONSTORAGE } from "@/router/asyncRoutes"

const router = useRouter();
const route = useRoute();

const STORAGE_USER = "storageUser";
const redirectPath = route.query[REDIRECT_KEY] as string || "/";

onMounted(() => {
    getCode();
    const userStr = localStorage.getItem(STORAGE_USER);
    if (userStr != null) {
        let user = JSON.parse(userStr);
        loginForm.userName = user.userName;
        loginForm.password = decrypt(user.password) as string;
    }
})

const loginForm = reactive({
    userName: 'admin',
    password: 'admin123',
    code: '',
    // 验证码开关
    captchaEnabled: true,
    // 验证码图片地址
    codeUrl: '',
    rememberMe: true,
    loading: false,
    register: true,
    uuid: "",
});
const loginFormRef = ref<FormInstance>();
const loginRules = reactive<FormRules>({
    userName: [
        { required: true, message: $t('login.usernamePlaceholder'), trigger: 'blur' },
    ],
    password: [
        { required: true, message: $t('login.passwordPlaceholder'), trigger: 'blur' },
    ],
    code: [{ required: true, trigger: "change", message: $t('login.codePlaceholder') }]
});

const rememberMeFn = (isRememberMe: boolean) => {
    if (isRememberMe) {
        localStorage.setItem(STORAGE_USER, JSON.stringify({
            userName: loginForm.userName,
            password: encrypt(loginForm.password),
        }))
    } else {
        localStorage.removeItem(STORAGE_USER);
    }
}

const handleLogin = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            loginForm.loading = true;
            rememberMeFn(loginForm.rememberMe);
            const result = await loginApi(loginForm);
            loginForm.loading = false;
            if (result.code == 200) {
                setToken(result.data.token);
                localStorage.setItem(USERPERMISSIONSTORAGE, result.data.permissions.join())
                router.push(redirectPath);
            } else {
                ElMessage({
                    message: result.msg,
                    type: 'warning',
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
};

const getCode = async () => {
    const result = await getCodeApi();
    loginForm.captchaEnabled = result.data.captchaEnabled;
    loginForm.codeUrl = `data:image/png;base64,${result.data.base64Url}`;
    loginForm.uuid = result.data.uuid;
};

const giteeLogin = async () => {
    const result = await preLoginByThirdPartyApi('gitee');
    if (result.code === 200) {
        window.location = result.data.authorizeUrl;
        localStorage.setItem("giteeUuid", result.data.uuid);
        localStorage.setItem("thirdPartySource", "gitee")
    }
}
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../../assets/images/login-background.jpg");
    background-size: cover;
}

.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
}

.login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;

    :deep(.el-form-item__content) {
        justify-content: space-between;
    }

    .el-input {
        height: 38px;

        input {
            height: 38px;
        }
    }

    .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
    }
}

.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}

.login-code {
    width: 33%;
    height: 38px;

    img {
        cursor: pointer;
        vertical-align: middle;
    }
}

.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}

.login-code-img {
    height: 38px;
}
</style>