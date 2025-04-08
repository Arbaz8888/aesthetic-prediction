export async function runEnhancement(imageUrl: string) {
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });
  
    const data = await res.json();
    return data.predictedUrl;
  }
  