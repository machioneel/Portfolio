import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <header className="mb-8 md:mb-12">
          <h1 id="experience-title" className="text-3xl md:text-4xl font-bold tracking-tight">
            Professional Experience
          </h1>
          <p className="text-muted-foreground mt-2">Ringkasan pengalaman kerja profesional.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Senior Frontend Engineer • Perusahaan A</CardTitle>
              <p className="text-sm text-muted-foreground">2022 — Sekarang</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>Membangun UI performa tinggi dengan React + TypeScript.</li>
                <li>Mengarahkan migrasi desain sistem dan aksesibilitas.</li>
                <li>Berkolaborasi lintas tim untuk rilis fitur besar.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frontend Engineer • Perusahaan B</CardTitle>
              <p className="text-sm text-muted-foreground">2020 — 2022</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                <li>Implementasi komponen UI reusable dengan shadcn/tailwind.</li>
                <li>Optimasi TTI dan CLS melalui code-splitting dan lazy loading.</li>
                <li>Meningkatkan skor Lighthouse hingga 95+.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Experience
