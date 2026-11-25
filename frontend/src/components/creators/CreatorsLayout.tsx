import type { JSX } from 'react'
import type * as React from 'react'
import { Link } from 'react-router-dom'

import { LiquidGlass } from '@/components/LiquidGlass'

const upcomingNavigationItems = ['위탁계약', '입고배치', '판매', '폐기기록', '정산명세서']

export function CreatorsLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <aside className="fixed top-0 left-0 h-screen w-[240px]">
        <LiquidGlass className="h-full w-full" contentClassName="flex h-full flex-col items-center px-5 py-8 text-center">
          <p className="text-xl font-bold text-[#1C1C1E]">MakerShelf</p>

          <nav className="mt-12 flex w-full flex-col items-center gap-4" aria-label="Primary navigation">
            <Link to="/creators" className="rounded-full bg-[#0088FF] px-5 py-2 text-white">
              창작자
            </Link>
            {upcomingNavigationItems.map((item) => (
              <span key={item} className="pointer-events-none inline-flex cursor-not-allowed items-center gap-1.5 text-[#8E8E93]">
                {item}
                <span className="rounded-full bg-[#F2F2F7] px-1.5 text-[10px] text-[#8E8E93]">예정</span>
              </span>
            ))}
          </nav>
        </LiquidGlass>
      </aside>

      <header className="fixed top-0 left-[240px] right-0 h-[88px]">
        <LiquidGlass className="h-full w-full" radius="0">
          {null}
        </LiquidGlass>
      </header>

      <main className="ml-[240px] min-h-screen bg-white pt-[88px]">
        <div className="mx-auto max-w-[1080px] px-8 py-10">{children}</div>
      </main>
    </div>
  )
}
