import React from 'react'
import '../globals.css' // Import your global stylesheet

function MyApp({ Component, pageProps }) {
  // You can add context providers, layouts, or other global components here
  return <Component {...pageProps} />
}

export default MyApp
