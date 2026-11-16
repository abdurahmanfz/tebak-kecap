# Word Data Service Layer

## Overview

This service layer provides data fetching capabilities with automatic fallback between API and local JSON data.

## Architecture

```
┌─────────────────────┐
│   React Components  │
└──────────┬──────────┘
           │ useWords()
┌──────────▼──────────┐
│   TanStack Query    │
└──────────┬──────────┘
           │ fetchWords()
┌──────────▼──────────┐
│   Word Service      │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
┌───▼───┐    ┌───▼───┐
│  API  │    │ Local │
│ (Future)│  │  JSON │
└───────┘    └───────┘
```

## Usage

### Basic Usage

```tsx
import { useWords } from '@/features/game/hooks';

function MyComponent() {
  const { data, isLoading, error } = useWords();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  
  return (
    <ul>
      {data.data.map(word => (
        <li key={word.display}>{word.display}</li>
      ))}
    </ul>
  );
}
```

### With Category Filter

```tsx
const { data } = useWords('Kadaharan'); // Only food words
```

## Configuration

### Environment Variables

```bash
# Use API instead of local JSON
VITE_USE_API=true

# API base URL
VITE_API_BASE_URL=https://api.example.com/v1
```

### Fallback Strategy

1. If `VITE_USE_API=true`: Try API first, fall back to local JSON on error
2. If `VITE_USE_API=false` (default): Use local JSON only

## Future API Integration

When the API is ready:

1. Set `VITE_USE_API=true` in `.env`
2. Configure `VITE_API_BASE_URL`
3. Implement the API endpoint at `/api/words`

Expected API response format:

```json
{
  "data": [
    {
      "display": "SURABI",
      "category": "Kadaharan",
      "clueSu": "...",
      "clueEn": "...",
      "trivia": "..."
    }
  ],
  "total": 45,
  "category": "Sadaya"
}
```

## Testing

The service includes a simulated 300ms delay in development mode to test loading states.
