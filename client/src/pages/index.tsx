import React from "react";
import Head from "next/head";

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>This is the title of my page</title>
        <meta name="description" content="This is the description of my page" />
        <meta name="keywords" content="next.js, react, javascript" />
      </Head>
      <h1>This is the content of my page</h1>
    </div>
  );
};

export default IndexPage;