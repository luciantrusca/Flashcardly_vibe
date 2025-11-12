import { Flashcard } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Trash2, Download, FileText, Plus, RefreshCw, Loader2 } from 'lucide-react';

interface FlashcardTableProps {
  title: string;
  description: string;
  flashcards: Flashcard[];
  onDelete: (id: string) => void;
  onClear: () => void;
  isPreview: boolean;
  onAddToCollection?: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export function FlashcardTable({ 
  title, 
  description, 
  flashcards, 
  onDelete, 
  onClear,
  isPreview,
  onAddToCollection,
  onRegenerate,
  isRegenerating = false
}: FlashcardTableProps) {
  const handleExport = () => {
    const csv = [
      ['Front', 'Back', 'Example', 'Notes'],
      ...flashcards.map(card => [
        card.front,
        card.back,
        card.example,
        card.notes
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className={`shadow-lg ${isPreview ? 'border-blue-300 border-2' : 'border-slate-200'}`}>
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-600" />
              <h2 className="text-slate-900">{title}</h2>
              <span className={`px-2 py-1 ${isPreview ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'} rounded-full text-sm`}>
                {flashcards.length} {flashcards.length === 1 ? 'card' : 'cards'}
              </span>
            </div>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {isPreview ? (
              <>
                <Button
                  onClick={onRegenerate}
                  disabled={isRegenerating}
                  variant="outline"
                  className="gap-2"
                >
                  {isRegenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </>
                  )}
                </Button>
                <Button
                  onClick={onAddToCollection}
                  className="gap-2"
                  disabled={isRegenerating}
                >
                  <Plus className="w-4 h-4" />
                  Add to Collection
                </Button>
                <Button
                  variant="outline"
                  onClick={onClear}
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  disabled={isRegenerating}
                >
                  <Trash2 className="w-4 h-4" />
                  Discard
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleExport}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={onClear}
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Front (Word/Phrase)</TableHead>
              <TableHead className="w-[200px]">Back (Translation)</TableHead>
              <TableHead>Example Sentence</TableHead>
              <TableHead className="w-[200px]">Notes</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flashcards.map((card) => (
              <TableRow key={card.id} className="hover:bg-slate-50">
                <TableCell>{card.front}</TableCell>
                <TableCell>{card.back}</TableCell>
                <TableCell className="text-slate-600">{card.example}</TableCell>
                <TableCell className="text-slate-500 text-sm">{card.notes}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(card.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
