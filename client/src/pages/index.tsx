import React from 'react'
import Head from 'next/head'
import TypeTest from '../components/TypeTest/TypeTest'
const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>This is the title of my page</title>
        <meta name="description" content="This is the description of my page" />
        <meta name="keywords" content="next.js, react, javascript" />
      </Head>
      <h1 className="">This is the content of my page</h1>
      <TypeTest></TypeTest>
    </div>
  )
}

export default IndexPage
