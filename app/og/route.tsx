import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export function GET(request: Request) {
  return new ImageResponse(
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <div tw="flex flex-col">
          <h1 tw="text-6xl font-bold tracking-tight text-gray-900">M1n</h1>
          <p tw="text-2xl text-gray-600 mt-2">Developer & Open Source Creator</p>
        </div>
        <div tw="absolute bottom-8 right-8 text-sm text-gray-500">m1n.land</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
