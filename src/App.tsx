import { useState } from 'react';
import { FlashcardAgent } from './components/FlashcardAgent';
import { FlashcardTable } from './components/FlashcardTable';
import Flashcard from './types/flashcard';
import generateFlashcards from './services/geminiClient';

export default function App() {
  const [collection, setCollection] = useState<Flashcard[]>([]);
  const [previewCards, setPreviewCards] = useState<Flashcard[]>([]);
  const [lastPrompt, setLastPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setLastPrompt(prompt);

    // AI-generated flashcards based on prompt
    const newFlashcards = generateFlashcards(prompt);
    setPreviewCards(await newFlashcards);
    setIsGenerating(false);
  };

  const handleRegenerate = async () => {
    if (!lastPrompt) return;
    await handleGenerate(lastPrompt);
  };

  const handleAddToCollection = () => {
    setCollection(prev => [...prev, ...previewCards]);
    setPreviewCards([]);
    setLastPrompt('');
  };

  const handleDeletePreview = (id: string) => {
    setPreviewCards(prev => prev.filter(card => card.id !== id));
  };

  const handleDeleteCollection = (id: string) => {
    setCollection(prev => prev.filter(card => card.id !== id));
  };

  const handleClearPreview = () => {
    setPreviewCards([]);
    setLastPrompt('');
  };

  const handleClearCollection = () => {
    setCollection([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <header className="text-center space-y-2 py-8">
          <h1 className="text-slate-900">AI Flashcard Generator</h1>
          <p className="text-slate-600">Create language learning flashcards with AI assistance</p>
        </header>

        <FlashcardAgent 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating}
        />

        {previewCards.length > 0 && (
          <FlashcardTable 
            title="Preview"
            description="Review the generated flashcards below"
            flashcards={previewCards}
            onDelete={handleDeletePreview}
            onClear={handleClearPreview}
            isPreview={true}
            onAddToCollection={handleAddToCollection}
            onRegenerate={handleRegenerate}
            isRegenerating={isGenerating}
          />
        )}

        {collection.length > 0 && (
          <FlashcardTable 
            title="My Collection"
            description="All your saved flashcards"
            flashcards={collection}
            onDelete={handleDeleteCollection}
            onClear={handleClearCollection}
            isPreview={false}
          />
        )}
      </div>
    </div>
  );
}