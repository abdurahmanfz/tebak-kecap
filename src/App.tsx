import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameProvider } from './features/game/state';
import { Game } from './features/game/components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <Game />
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
