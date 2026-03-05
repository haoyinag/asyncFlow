import React, { useState } from "react";
import HomePage from "./HomePage";
import LoginPage, { type LoginSuccessPayload } from "./LoginPage";

export default function LoginVipNativeFirst() {
  const [session, setSession] = useState<LoginSuccessPayload | null>(null);

  if (!session) {
    return <LoginPage onLoginSuccess={(payload) => setSession(payload)} />;
  }

  return (
    <HomePage
      accessToken={session.accessToken}
      qrUrl={session.qrUrl}
      onBack={() => setSession(null)}
    />
  );
}
