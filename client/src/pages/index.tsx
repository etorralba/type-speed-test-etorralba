import React from 'react'
import Head from 'next/head'
import TypeParagraph from '../components/TypeParagraph/TypeParagraph'

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>This is the title of my page</title>
        <meta name="description" content="This is the description of my page" />
        <meta name="keywords" content="next.js, react, javascript" />
      </Head>
      <h1 className="">This is the content of my page</h1>
      <TypeParagraph text="Hello World!"></TypeParagraph>
    </div>
  )
}

export default IndexPage
