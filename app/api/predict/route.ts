// app/api/predict/route.ts

import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

console.log('Using token:', process.env.REPLICATE_API_TOKEN);
export async function POST(req: Request) {
  const { imageUrl } = await req.json();

  try {
    const output = await replicate.run(
        "tencentarc/gfpgan:1c1f3c896d8a52f6ac3ab8c77a7cb1b60855b4d0e5b4cba75e3c7c892e14dbee",
        {
          input: {
            img: imageUrl,
          },
        }
      ) as string[];
      
      
      return NextResponse.json({ predictedUrl: output[0] });
      
  } catch (err) {
    console.error('Replicate error:', err);
    return NextResponse.json({ error: 'Prediction failed' }, { status: 500 });
  }
}
