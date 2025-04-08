'use client';
import { runEnhancement } from '@/lib/predict';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://brmujlepxhlabvonxmen.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJybXVqbGVweGhsYWJ2b254bWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTIxNjcsImV4cCI6MjA1OTY2ODE2N30.Y1ay0YDlb6n7tiNvwztNjzzEzeWynq4QYQAn5ElFrTc'
);

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [predictedUrl, setPredictedUrl] = useState('');


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('photos')
      .upload(fileName, file);

    if (error) {
      console.error('Upload failed:', error.message);
      return;
    }

    const publicUrl = supabase.storage
      .from('photos')
      .getPublicUrl(fileName).data.publicUrl;

      setImageUrl(publicUrl);

      // Run real AI prediction using Replicate
      try {
        const enhanced = await runEnhancement(publicUrl);
        setPredictedUrl(enhanced);
      } catch (err) {
        console.error('Enhancement failed:', err);
      }
      

    
  };

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload Your Photo</h1>
      
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

      <div className="mt-4">
        <label htmlFor="treatment" className="block text-sm font-medium mb-1">
          Select Treatment Type
        </label>
        <select
          id="treatment"
          value={selectedTreatment}
          onChange={(e) => setSelectedTreatment(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 px-3 py-2 rounded w-full"
        >
          <option value="">-- Choose --</option>
          <option value="nose">Nose Job (Rhinoplasty)</option>
          <option value="chin">Chin Filler</option>
          <option value="jawline">Jawline Enhancement</option>
          <option value="cheeks">Cheek Filler</option>
          <option value="botox">Botox (Forehead/Smile Lines)</option>
        </select>
      </div>

      {imageUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Preview:</h2>
          <img src={imageUrl} alt="Uploaded" className="rounded border max-w-xs" />
        </div>
      )}
      {predictedUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-green-400">AI Predicted Result:</h2>
          <img src={predictedUrl} alt="Predicted Result" className="rounded border max-w-xs" />
        </div>
      )}

    </main>
  );
}
