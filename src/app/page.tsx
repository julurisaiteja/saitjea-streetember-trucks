import Image from "next/image";
import Link from "next/link";
import { brand, items, formatMoney } from "@/lib/data";
import { AddButton } from "@/components/AddButton";
import { PromoStrip } from "@/components/PromoStrip";
import { ReviewRail } from "@/components/ReviewRail";

export default function HomePage() {
  const featured = items.slice(0, 4);
  return (
    <div data-style="graffiti-street" className="spray">
      <PromoStrip />
      <section className="relative min-h-[100svh] overflow-hidden halftone-dark">
        <video className="absolute inset-0 h-full w-full object-cover opacity-45" autoPlay muted loop playsInline poster={brand.heroStill}>
          <source src={brand.heroVideo!} type="video/mp4" />
        </video>
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 md:px-8">
          <p className="tag font-display text-6xl text-accent md:text-8xl anim-rise">{brand.name}</p>
          <h1 className="mt-3 max-w-md text-xl font-medium">{brand.tagline}</h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/locator" className="bg-accent px-5 py-3 text-sm font-bold text-black rotate-[-1deg]">{brand.cta}</Link>
            <Link href="/shop" className="border-2 border-accent2 px-5 py-3 text-sm font-bold text-accent2 rotate-[1deg]">Order ahead</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-14 md:grid-cols-3 md:px-8">
        {[["MAP","Live truck pins"],["TAG","Spray the flavor"],["GO","ETA order-ahead"]].map(([k,v]) => (
          <div key={k} className="border-2 border-dashed border-accent/50 bg-surface/80 p-6 rotate-[-1deg] anim-sway">
            <p className="font-display text-4xl text-accent">{k}</p>
            <p className="mt-2 text-mute">{v}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <h2 className="font-display text-4xl text-accent2">Street menu</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <article key={item.id} className="overflow-hidden border-2 border-line bg-surface">
              <div className="relative aspect-square">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="25vw" />
              </div>
              <div className="p-3">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-xs text-mute">{item.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-accent font-bold">{formatMoney(item.price)}</span>
                  <AddButton item={item} label="Add" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h2 className="font-display text-4xl text-accent2 anim-rise">Crew rotation</h2>
        <p className="mt-2 max-w-lg text-mute">Three trucks, one map. Order-ahead locks your slot before the lunch rush.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Ember Cart","Smoke Lane","Night Bite"].map((t,i)=>(
            <div key={t} className="border-2 border-accent/40 bg-surface p-5 rotate-[-1deg] anim-sway" style={{animationDelay:`${i*200}ms`}}>
              <p className="font-display text-2xl text-accent">{t}</p>
              <p className="text-sm text-mute">Live pin · demo ETA</p>
            </div>
          ))}
        </div>
      </section>
      <section className="halftone-dark border-t-2 border-accent/30 py-12 text-center">
        <p className="font-display text-3xl text-accent anim-pulse">TAG · MAP · GO</p>
        <p className="mt-2 text-sm text-mute">Spray the flavor, find the pin, beat the line.</p>
      </section>

      <ReviewRail />
    </div>
  );
}
