import React, { useEffect } from "react";
import { runParallel, useReactAsyncTask } from "../../src/index";
import { fetchNotices, fetchPagedList, fetchVipInfo } from "../scenario/mockBusinessApi";

interface HomePageProps {
  accessToken: string;
  qrUrl?: string;
  onBack?: () => void;
}

export default function HomePage({ accessToken, qrUrl, onBack }: HomePageProps) {
  const { run, cancel, status, loading, data, error } = useReactAsyncTask(async ({ signal, input }) => {
    const token = String(input);

    const [notices, listPage, vip] = await runParallel(
      [
        () => fetchNotices(token, signal),
        () => fetchPagedList(token, 1, 10, signal),
        () => fetchVipInfo(token, signal)
      ],
      undefined,
      { concurrency: 2, signal }
    );

    const vipTip =
      vip.daysLeft <= 7
        ? `VIP 剩余 ${vip.daysLeft} 天，请及时续费`
        : "VIP 有效期充足";

    return { notices, listPage, vip, vipTip };
  });

  useEffect(() => {
    void run(accessToken);
  }, [accessToken, run]);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <h1>Home Page (Parallel Block)</h1>
      <p>流程：首页加载时并发请求公告、列表、VIP 信息</p>

      {qrUrl ? <img src={qrUrl} alt="qr" width={90} height={90} /> : null}

      <div style={{ marginTop: 10 }}>
        <button onClick={() => run(accessToken)}>Reload Home Data</button>
        <button onClick={() => cancel("manual_cancel")} style={{ marginLeft: 8 }}>
          Cancel
        </button>
        {onBack ? (
          <button onClick={onBack} style={{ marginLeft: 8 }}>
            Back to Login
          </button>
        ) : null}
      </div>

      <hr />
      <p>Status: {status}</p>
      <p>Loading: {String(loading)}</p>
      <p style={{ color: "#c00" }}>Error: {error?.message}</p>
      <p>VIP Tip: {data?.vipTip}</p>
      <p>Notices: {Array.isArray(data?.notices) ? data.notices.length : 0}</p>
      <p>List Items: {Array.isArray(data?.listPage?.items) ? data.listPage.items.length : 0}</p>
    </main>
  );
}
