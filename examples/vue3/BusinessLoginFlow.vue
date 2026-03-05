<script setup lang="ts">
import { computed, reactive } from "vue";
import { asyncGroup, deferFlow, useVueAsyncFlow } from "../../src/index";
import { asyncFlowEngine } from "../scenario/engine";
import {
  fetchNotices,
  fetchPagedList,
  fetchVipInfo,
  getLoginQrCode,
  getToken,
  loginByPassword,
  type LoginInput
} from "../scenario/mockBusinessApi";

const form = reactive<LoginInput>({
  account: "",
  password: "",
  captcha: ""
});

const loginFlow = asyncFlowEngine.createFlow(
  deferFlow([
    { id: "qr", run: async ({ signal }) => getLoginQrCode(signal) },
    {
      id: "login",
      run: async ({ input, pick, signal }) => {
        const qr = pick("qr") as { qrId: string };
        return loginByPassword(input as LoginInput, qr.qrId, signal);
      }
    },
    {
      id: "token",
      run: async ({ pick, signal }) => {
        const loginRes = pick("login") as { sessionId: string };
        return getToken(loginRes.sessionId, signal);
      }
    },
    { id: "enterHome", run: () => ({ route: "/home" }) },
    asyncGroup(
      [
        {
          id: "notices",
          run: async ({ pick, signal }) => {
            const token = (pick("token") as { accessToken: string }).accessToken;
            return fetchNotices(token, signal);
          }
        },
        {
          id: "listPages",
          run: async ({ pick, signal }) => {
            const token = (pick("token") as { accessToken: string }).accessToken;
            const page1 = await fetchPagedList(token, 1, 5, signal);
            const page2 = page1.hasMore ? await fetchPagedList(token, 2, 5, signal) : null;
            return {
              pages: [page1, page2].filter(Boolean),
              total: page1.items.length + (page2?.items.length ?? 0)
            };
          }
        },
        {
          id: "vip",
          run: async ({ pick, signal }) => {
            const token = (pick("token") as { accessToken: string }).accessToken;
            return fetchVipInfo(token, signal);
          }
        }
      ],
      "homeData"
    ),
    {
      id: "vipTip",
      run: ({ pick }) => {
        const vip = pick("vip") as { daysLeft: number; expiresAt: string };
        return {
          needRenew: vip.daysLeft <= 7,
          message:
            vip.daysLeft <= 7
              ? `VIP 剩余 ${vip.daysLeft} 天，将于 ${new Date(vip.expiresAt).toLocaleDateString()} 到期，请及时续费。`
              : "VIP 有效期充足"
        };
      }
    }
  ], "business-login-flow")
);

const { run, cancel, status, loading, data, error } = useVueAsyncFlow(loginFlow);

const qrUrl = computed(() => {
  const root = data.value as { byId?: Record<string, { data?: unknown }> } | undefined;
  return (root?.byId?.qr?.data as { qrUrl?: string } | undefined)?.qrUrl ?? "";
});

const notices = computed(() => {
  const root = data.value as { byId?: Record<string, { data?: unknown }> } | undefined;
  return (root?.byId?.notices?.data as Array<{ id: number; title: string }> | undefined) ?? [];
});

const vipTip = computed(() => {
  const root = data.value as { byId?: Record<string, { data?: unknown }> } | undefined;
  return (root?.byId?.vipTip?.data as { message?: string } | undefined)?.message ?? "";
});

async function submit() {
  await run({ ...form });
}
</script>

<template>
  <main style="font-family: sans-serif; max-width: 760px; margin: 0 auto; padding: 16px">
    <h1>Vue3 业务场景示例</h1>
    <p>用户动作：输入账号/密码/验证码 -> 点击登录</p>

    <div style="display:flex; gap:16px; align-items:flex-start;">
      <div>
        <p>二维码：</p>
        <img v-if="qrUrl" :src="qrUrl" alt="qr" width="140" height="140" />
        <div v-else style="width:140px;height:140px;background:#f1f1f1;display:flex;align-items:center;justify-content:center;">未获取</div>
      </div>

      <form @submit.prevent="submit" style="display:flex;flex-direction:column;gap:8px;flex:1;">
        <input v-model="form.account" placeholder="账号" />
        <input v-model="form.password" type="password" placeholder="密码" />
        <input v-model="form.captcha" placeholder="验证码（输入 abcd）" />

        <div>
          <button type="submit">登录并加载首页数据</button>
          <button type="button" @click="cancel('manual_cancel')" style="margin-left:8px">取消流程</button>
        </div>
      </form>
    </div>

    <hr />
    <p>Status: {{ status }}</p>
    <p>Loading: {{ loading }}</p>
    <p style="color:#c00">Error: {{ error?.message }}</p>

    <h3>公告</h3>
    <ul>
      <li v-for="n in notices" :key="n.id">{{ n.title }}</li>
    </ul>

    <h3>VIP 提示</h3>
    <p>{{ vipTip }}</p>
  </main>
</template>
