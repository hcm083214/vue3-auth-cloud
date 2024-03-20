<template>
    <div class="register">
        <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" class="register-form">
            <h3 class="title">iauth {{ $t('common.appName') }}</h3>
            <el-form-item prop="userName">
                <el-input v-model="registerForm.userName" type="text" auto-complete="on" :placeholder="$t('login.username')"
                    :prefix-icon="User">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="registerForm.password" type="password" auto-complete="on"
                    :placeholder="$t('login.password')" :prefix-icon="Lock" @keyup.enter="handleRegister">
                </el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
                <el-input v-model="registerForm.confirmPassword" type="password" auto-complete="on"
                    :placeholder="$t('login.checkPassword')" :prefix-icon="Lock" @keyup.enter="handleRegister">
                </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="registerForm.captchaEnabled">
                <el-input v-model="registerForm.code" auto-complete="on" :placeholder="$t('login.code')" style="width: 63%"
                    :prefix-icon="Key" @keyup.enter="handleRegister">
                </el-input>
                <div class="register-code">
                    <img :src="registerForm.codeUrl" @click="getCode" class="register-code-img" />
                </div>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button :loading="registerForm.loading" type="primary" style="width:100%;"
                    @click.prevent="handleRegister(registerFormRef)">
                    <span v-if="!registerForm.loading">{{ $t("login.register") }}</span>
                    <span v-else>{{ $t("login.register") }}...</span>
                </el-button>
                <div style="float: right;">
                    <router-link class="link-type" :to="'/login'">{{ $t('common.login') }}</router-link>
                </div>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <div class="el-register-footer">
            <span>Copyright © 2018-2023 All Rights Reserved.</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { User, Lock, Key } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from 'element-plus'


import { getCodeApi, registerApi } from "@/api/login.js";
import { $t } from "@/utils/i18n";

const router = useRouter();
onMounted(() => {
    getCode();
})
const registerForm = reactive({
    userName: '',
    password: '',
    confirmPassword: '',
    code: '',
    // 验证码开关
    captchaEnabled: true,
    // 验证码图片地址
    codeUrl: '',
    loading: false,
    uuid: '',
});
const registerFormRef = ref<FormInstance>();
const confirmPasswordValidate = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error($t('login.passwordPlaceholder')))
    } else if (value !== registerForm.password) {
        callback(new Error($t('login.passwordNotEqual')))
    } else {
        callback();
    }
}
const registerRules = reactive({
    userName: [
        { required: true, message: $t('login.usernamePlaceholder'), trigger: 'blur' },
    ],
    password: [
        { required: true, message: $t('login.passwordPlaceholder'), trigger: 'blur' },
    ],
    confirmPassword: [{ validator: confirmPasswordValidate, trigger: 'blur' }],
    code: [{ required: true, trigger: "change", message: $t('login.codePlaceholder') }]
})

const getCode = async () => {
    const result = await getCodeApi();
    registerForm.captchaEnabled = result.data.captchaEnabled;
    registerForm.codeUrl = `data:image/png;base64,${result.data.base64Url}`;
    registerForm.uuid = result.data.uuid;
};

const handleRegister = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            registerForm.loading = true;
            const result = await registerApi(registerForm);
            registerForm.loading = false;
            if (result.code == 200) {
                router.push("/login");
            } else {
                ElMessage(
                    {
                        message: result.msg,
                        type: 'warning',
                    }
                )
            }
        } else {
            console.log('error submit!', fields)
        }
    })
};

</script>
<style  lang="scss" scoped>
.register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/images/login-background.jpg");
    background-size: cover;
}

.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
}

.register-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;

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

.register-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}

.register-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
        cursor: pointer;
        vertical-align: middle;
    }
}

.el-register-footer {
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

.register-code-img {
    height: 38px;
}
</style>
