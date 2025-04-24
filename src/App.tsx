import { useMemoryGameStore } from "./storeToReactAdapter";
import { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Stack,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { Card } from "./Card";

const theme = createTheme();

const App = () => {
  const { board, startTime, endTime, startGame, flipCard, restartGame } = useMemoryGameStore((state) => state);
  const isGameStarted = Boolean(startTime)
  const isRestartAvailable = isGameStarted

  const [elapsedTime, setElapsedTime] = useState(startTime ? Math.floor((Date.now() - startTime) / 1000) : 0);

  useEffect(() => {
    if (!startTime || endTime) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const gridColumns = Math.floor(Math.sqrt(board.length)) || 4;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Memory Game
          </Typography>
          
          {!isGameStarted && (
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => startGame('very-easy')}
              >
                Very Easy
              </Button>
              <Button 
                variant="contained" 
                onClick={() => startGame('easy')}
              >
                Easy
              </Button>
              <Button 
                variant="contained" 
                onClick={() => startGame('medium')}
              >
                Medium
              </Button>
              <Button 
                variant="contained" 
                onClick={() => startGame('hard')}
              >
                Hard
              </Button>
            </Stack>
          )}

          {isRestartAvailable && (
            <Button 
              variant="contained" 
              onClick={restartGame}
            >
              Restart
            </Button>
          )}
          {/* Game status */}
          {startTime && (
            <Box sx={{ mb: 2 }}>
              <Typography>Time: {elapsedTime} seconds</Typography>
              {endTime && (
                <Typography color="success.main" fontWeight="bold">
                  Game complete! Total time: {Math.floor((endTime - startTime) / 1000)} seconds
                </Typography>
              )}
            </Box>
          )}
          
          {board.length > 0 && (
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: 2,
                width: '100%',
                maxWidth: `${gridColumns * 100}px`,
                margin: '0 auto'
              }}
            >
              {board.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  value={card.value}
                  isFlipped={card.isFlipped}
                  isMatched={card.isMatched}
                  onClick={!card.isMatched && !endTime ? () => flipCard(card.id) : undefined}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
