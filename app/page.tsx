import { CaveBackgroundWrapper } from "@/components/shared/CaveBackgroundWrapper"
import { Navigation, Footer } from "@/components/layout"
import { Hero } from "@/components/sections/Hero"
import { OpsTablet } from "@/components/sections/OpsTablet"
import { EquipmentWall } from "@/components/sections/EquipmentWall"
import { TerminalDashboard } from "@/components/sections/TerminalDashboard"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Story } from "@/components/sections/Story"

export default function Home() {
  return (
    <>
      <CaveBackgroundWrapper />
      <Navigation />
      <main>
        <Hero />
        <Story />
        <OpsTablet />
        <EquipmentWall />
        <TerminalDashboard />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
