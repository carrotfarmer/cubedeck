import Head from "next/head";
import React from "react";

interface PageHeadProps {
  title: string;
}

export const PageHead: React.FC<PageHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
