import React, { useState } from "react";
import { useReactAsyncTask } from "../../src/index";
import { getLoginQrCode, getToken, loginByPassword } from "../scenario/mockBusinessApi";

type LoginForm = {
  account: string;
  password: string;
  captcha: string;
};

export type LoginSuccessPayload = {
  accessToken: string;
  qrUrl: string;
};

interface LoginPageProps {
  onLoginSuccess: (payload: LoginSuccessPayload) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [form, setForm] = useState<LoginForm>({ account: "", password: "", captcha: "" });

  const { run, cancel, status, loading, error, meta } = useReactAsyncTask(
    async ({ signal, input, setMeta }) => {
      const payload = input as LoginForm;

      const qr = await getLoginQrCode(signal);
      setMeta({ qrUrl: qr.qrUrl });

      const loginRes = await loginByPassword(payload, qr.qrId, signal);
      const token = await getToken(loginRes.sessionId, signal);

      onLoginSuccess({ accessToken: token.accessToken, qrUrl: qr.qrUrl });
      return { accessToken: token.accessToken };
    },
    {},
    { qrUrl: "" }
  );

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <h1>Login Page (Serial Only)</h1>
      <p>流程：二维码 -> 登录 -> Token -> 跳首页</p>

      {meta.qrUrl ? <img src={String(meta.qrUrl)} alt="qr" width={120} height={120} /> : null}

      <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
        <input
          placeholder="account"
          value={form.account}
          onChange={(e) => setForm((s) => ({ ...s, account: e.target.value }))}
        />
        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
        />
        <input
          placeholder="captcha (abcd)"
          value={form.captcha}
          onChange={(e) => setForm((s) => ({ ...s, captcha: e.target.value }))}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => run({ ...form })}>Login</button>
        <button onClick={() => cancel("manual_cancel")} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>

      <hr />
      <p>Status: {status}</p>
      <p>Loading: {String(loading)}</p>
      <p style={{ color: "#c00" }}>Error: {error?.message}</p>
    </main>
  );
}
