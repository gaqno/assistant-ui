"use client";

import { Shadcn } from "@/components/shadcn/Shadcn";
import { useChat } from "ai/react";
import {
  AssistantRuntimeProvider,
  ChatModelAdapter,
  useLocalRuntime,
} from "@assistant-ui/react";
import { AsteraiClient } from "@asterai/client";

export default function HomePage() {
  return (
    <main className="container mx-auto flex flex-col gap-6 self-stretch p-4">
      <CustomProvider>
        <Shadcn />
      </CustomProvider>
    </main>
  );
}

export type AssistantProps = {
  chat: ReturnType<typeof useChat>;
};

const CustomModelAdapter: ChatModelAdapter = {
  async run({ messages }) {
    const query = messages[messages.length - 1]?.content as any;
    const appId = process.env['NEXT_PUBLIC_VERCEL_ASTERAI_APP_ID'] as string;
    const queryKey = process.env['NEXT_PUBLIC_VERCEL_ASTERAI_PUBLIC_QUERY_KEY'] as string;

    const client = new AsteraiClient({
      appId,
      queryKey,
    });

    const response = await client.query({ query: query[0]?.text });

    return {
      content: [
        {
          type: "text",
          text: await response.text() || "Error: No response from Asterai",
        },
      ],
    };
  },
};

const CustomProvider = ({ children }: { children: React.ReactNode }) => {
  const runtimeCustom = useLocalRuntime(CustomModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtimeCustom}>
      {children}
    </AssistantRuntimeProvider>
  );
};
