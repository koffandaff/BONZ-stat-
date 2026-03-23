"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loader from "@/components/ui/Loader"
import Nav from "@/components/sections/Nav"
import Hero from "@/components/sections/Hero"
import Marquee from "@/components/ui/Marquee"
import Footer from "@/components/sections/Footer"
import { initLenis } from "@/lib/lenis"

// Lazy-load the heavy canvas sections — they won't block initial paint
const About   = dynamic(() => import("@/components/sections/About"),   { ssr: false })
const Vision  = dynamic(() => import("@/components/sections/Vision"),  { ssr: false })
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false })

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      const destroyLenis = initLenis()
      return () => destroyLenis()
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Nav />
          <Hero />
          <Marquee />
          <About />
          <Vision />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  )
}
