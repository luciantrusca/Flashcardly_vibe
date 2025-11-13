import { useState } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

interface FlashcardAgentProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  maxCards?: number;
}

export function FlashcardAgent({ onGenerate, isGenerating, maxCards }: FlashcardAgentProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
      setPrompt('');
      
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const examplePrompts = [
    'Create 5 Spanish food vocabulary flashcards',
    'Generate French greetings with examples',
    'Make German basic verbs flashcards',
    'Create Spanish greeting phrases',
    'Verbs of Action & Movement'
  ];

  return (
    <Card className="p-6 shadow-lg border-slate-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-slate-900">AI Agent</h2>
        </div>
        
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the flashcards you want to create... (e.g., 'Create 10 Spanish food vocabulary flashcards with examples')"
          className="min-h-[120px] resize-none"
          disabled={isGenerating}
        />

        <div className="flex flex-wrap gap-2">
          <p className="text-slate-600 text-sm w-full">Quick prompts:</p>
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-sm px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-slate-500">
              Press <kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-300">Cmd/Ctrl + Enter</kbd> to generate
            </p>
            <p className="text-xs text-slate-400">
              Maximum {maxCards} flashcards per generation
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Flashcards
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
