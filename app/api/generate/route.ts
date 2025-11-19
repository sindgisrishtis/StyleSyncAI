import { NextResponse, NextRequest } from 'next/server';
import { OpenAI } from 'openai';

export const dynamic = 'force-dynamic';

const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY, // Ensure your .env file contains the key
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    const { prompt, editText } = body;
    const finalPrompt = editText ? `${prompt}, but with changes: ${editText}` : prompt;

    if (!finalPrompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await client.images.generate({
      model: 'black-forest-labs/flux-dev',
      response_format: 'url',
      extra_body: {
        response_extension: 'webp',
        width: 1024,
        height: 1024,
        num_inference_steps: 28,
        negative_prompt: '',
        seed: -1,
      },
      prompt: finalPrompt,
    });

    if (!response.data || response.data.length === 0) {
      return NextResponse.json({ error: 'No image generated' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: response.data[0].url });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
