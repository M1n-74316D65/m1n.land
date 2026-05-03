import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export function GET(request: Request) {
  return new ImageResponse(
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <div tw="flex flex-col">
          <h1 tw="text-7xl font-bold tracking-tighter text-gray-900">M1n</h1>
          <p tw="text-xl font-mono text-gray-500 mt-2 tracking-wide uppercase">
            Developer & Open Source Creator
          </p>
        </div>
        <div tw="absolute bottom-8 right-8 text-sm font-mono text-gray-400 tracking-wider uppercase">
          m1n.land
        </div>
      </div>
      {/* Brutalist top border */}
      <div tw="absolute top-0 left-0 right-0 h-2 bg-green-500" />
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
