import { useState } from 'react';
import { FlashcardAgent } from './components/FlashcardAgent';
import { FlashcardTable } from './components/FlashcardTable';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  example: string;
  notes: string;
}

export default function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated flashcards based on prompt
    const newFlashcards = generateMockFlashcards(prompt);
    setFlashcards(prev => [...prev, ...newFlashcards]);
    
    setIsGenerating(false);
  };

  const handleDelete = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
  };

  const handleClear = () => {
    setFlashcards([]);
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

        {flashcards.length > 0 && (
          <FlashcardTable 
            flashcards={flashcards}
            onDelete={handleDelete}
            onClear={handleClear}
          />
        )}
      </div>
    </div>
  );
}

function generateMockFlashcards(prompt: string): Flashcard[] {
  // Parse prompt to extract language and topic
  const lowerPrompt = prompt.toLowerCase();
  
  // Spanish examples
  if (lowerPrompt.includes('spanish') || lowerPrompt.includes('español')) {
    if (lowerPrompt.includes('food') || lowerPrompt.includes('comida')) {
      return [
        {
          id: crypto.randomUUID(),
          front: 'la manzana',
          back: 'apple',
          example: 'Me gusta comer una manzana todos los días.',
          notes: 'Feminine noun'
        },
        {
          id: crypto.randomUUID(),
          front: 'el pan',
          back: 'bread',
          example: 'El pan está muy fresco hoy.',
          notes: 'Masculine noun'
        },
        {
          id: crypto.randomUUID(),
          front: 'el agua',
          back: 'water',
          example: 'Necesito beber más agua.',
          notes: 'Masculine article with feminine noun'
        },
        {
          id: crypto.randomUUID(),
          front: 'la carne',
          back: 'meat',
          example: 'No como carne, soy vegetariano.',
          notes: 'Feminine noun'
        },
        {
          id: crypto.randomUUID(),
          front: 'el arroz',
          back: 'rice',
          example: 'El arroz con pollo es mi plato favorito.',
          notes: 'Masculine noun'
        }
      ];
    } else if (lowerPrompt.includes('greet') || lowerPrompt.includes('hello')) {
      return [
        {
          id: crypto.randomUUID(),
          front: 'hola',
          back: 'hello',
          example: '¡Hola! ¿Cómo estás?',
          notes: 'Informal greeting'
        },
        {
          id: crypto.randomUUID(),
          front: 'buenos días',
          back: 'good morning',
          example: 'Buenos días, señor García.',
          notes: 'Formal/informal, used until noon'
        },
        {
          id: crypto.randomUUID(),
          front: 'buenas tardes',
          back: 'good afternoon',
          example: 'Buenas tardes, ¿cómo le va?',
          notes: 'Used from noon until evening'
        }
      ];
    } else {
      return [
        {
          id: crypto.randomUUID(),
          front: 'hablar',
          back: 'to speak',
          example: 'Me gusta hablar español.',
          notes: 'Regular -ar verb'
        },
        {
          id: crypto.randomUUID(),
          front: 'comer',
          back: 'to eat',
          example: 'Vamos a comer juntos.',
          notes: 'Regular -er verb'
        },
        {
          id: crypto.randomUUID(),
          front: 'vivir',
          back: 'to live',
          example: 'Yo vivo en Madrid.',
          notes: 'Regular -ir verb'
        }
      ];
    }
  }
  
  // French examples
  if (lowerPrompt.includes('french') || lowerPrompt.includes('français')) {
    return [
      {
        id: crypto.randomUUID(),
        front: 'bonjour',
        back: 'hello',
        example: 'Bonjour, comment allez-vous?',
        notes: 'Formal/informal greeting'
      },
      {
        id: crypto.randomUUID(),
        front: 'merci',
        back: 'thank you',
        example: 'Merci beaucoup pour votre aide.',
        notes: 'Common expression'
      },
      {
        id: crypto.randomUUID(),
        front: 'le chat',
        back: 'cat',
        example: 'Le chat est mignon.',
        notes: 'Masculine noun'
      }
    ];
  }
  
  // German examples
  if (lowerPrompt.includes('german') || lowerPrompt.includes('deutsch')) {
    return [
      {
        id: crypto.randomUUID(),
        front: 'guten Tag',
        back: 'good day',
        example: 'Guten Tag, wie geht es Ihnen?',
        notes: 'Formal greeting'
      },
      {
        id: crypto.randomUUID(),
        front: 'danke',
        back: 'thank you',
        example: 'Danke schön!',
        notes: 'Common expression'
      },
      {
        id: crypto.randomUUID(),
        front: 'das Buch',
        back: 'book',
        example: 'Das Buch ist interessant.',
        notes: 'Neuter noun'
      }
    ];
  }
  
  // Default examples
  return [
    {
      id: crypto.randomUUID(),
      front: 'example word',
      back: 'translation',
      example: 'This is an example sentence using the word.',
      notes: 'Generated from your prompt'
    },
    {
      id: crypto.randomUUID(),
      front: 'another word',
      back: 'another translation',
      example: 'Here is another example sentence.',
      notes: 'Additional context or grammar notes'
    }
  ];
}
