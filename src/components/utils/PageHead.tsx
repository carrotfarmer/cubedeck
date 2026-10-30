import Head from "next/head";
import React from "react";

interface PageHeadProps {
  title: string;
}

export const PageHead: React.FC<PageHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="A free cube timer with practice sessions, solve statistics, and groups."
      />
      <meta name="theme-color" content="#F3D563" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
