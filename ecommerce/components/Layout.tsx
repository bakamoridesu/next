import Head from 'next/head'
import React, { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type Props = {
  children: ReactNode
}
export const Layout = ({ children }: Props) => {
  return (
    <div className='layout'>
      <Head>
        <title>Sample store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}