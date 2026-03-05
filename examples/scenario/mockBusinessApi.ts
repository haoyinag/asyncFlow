export interface LoginInput {
  account: string;
  password: string;
  captcha: string;
}

export interface LoginSession {
  sessionId: string;
  account: string;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface VipInfo {
  expiresAt: string;
  daysLeft: number;
}

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error("aborted"));
    };

    const cleanup = () => {
      if (signal) signal.removeEventListener("abort", onAbort);
    };

    if (signal) signal.addEventListener("abort", onAbort, { once: true });
  });
}

export async function getLoginQrCode(signal?: AbortSignal) {
  await sleep(180, signal);
  const qrId = `qr_${Date.now()}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrId)}`;
  return { qrId, qrUrl };
}

export async function loginByPassword(input: LoginInput, qrId: string, signal?: AbortSignal): Promise<LoginSession> {
  await sleep(260, signal);

  if (!input.account || !input.password || !input.captcha) {
    throw new Error("账号、密码、验证码不能为空");
  }

  if (input.captcha.toLowerCase() !== "abcd") {
    throw new Error("验证码错误，示例统一使用 abcd");
  }

  return {
    sessionId: `sess_${qrId}_${Math.random().toString(36).slice(2, 8)}`,
    account: input.account
  };
}

export async function getToken(sessionId: string, signal?: AbortSignal): Promise<TokenPayload> {
  await sleep(220, signal);
  return {
    accessToken: `at_${sessionId}`,
    refreshToken: `rt_${sessionId}`,
    expiresIn: 3600
  };
}

export async function fetchNotices(token: string, signal?: AbortSignal) {
  await sleep(120, signal);
  const resp = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3", { signal });
  const data = (await resp.json()) as Array<{ id: number; title: string }>;
  return data.map((it) => ({ id: it.id, title: it.title, from: token.slice(0, 6) }));
}

export async function fetchPagedList(token: string, page: number, pageSize: number, signal?: AbortSignal) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`;
  const resp = await fetch(url, { signal });
  const data = (await resp.json()) as Array<{ id: number; title: string }>;
  return {
    page,
    pageSize,
    items: data.map((it) => ({ ...it, sourceToken: token.slice(0, 6) })),
    hasMore: page < 2
  };
}

export async function fetchVipInfo(_token: string, signal?: AbortSignal): Promise<VipInfo> {
  await sleep(90, signal);

  // 模拟“即将到期”，方便展示续费提示
  const daysLeft = 3;
  const expiresAt = new Date(Date.now() + daysLeft * 24 * 3600 * 1000).toISOString();

  return {
    expiresAt,
    daysLeft
  };
}
