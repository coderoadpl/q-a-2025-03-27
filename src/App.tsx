import { useMemoryGameStore } from "./storeToReactAdapter";
import { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Stack,
  ThemeProvider,
  createTheme
} from "@mui/material";

const theme = createTheme();

const App = () => {
  const { board, startTime, endTime, startGame, flipCard } = useMemoryGameStore((state) => state);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Update timer while game is running
  useEffect(() => {
    if (!startTime || endTime) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  // Calculate grid columns based on board size
  const gridColumns = Math.sqrt(board.length) || 2;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Memory Game
          </Typography>
          
          {/* Game controls */}
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
          
          {/* Game board */}
          {board.length > 0 && (
            <Grid 
              container 
              spacing={2}
              sx={{ 
                display: 'grid',
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: 2
              }}
            >
              {board.map((card) => (
                <Paper
                  key={card.id}
                  onClick={() => !card.isMatched && !endTime && flipCard(card.id)}
                  elevation={1}
                  sx={{
                    width: 80, 
                    height: 80,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.875rem', 
                    borderRadius: 1,
                    cursor: !card.isMatched && !endTime ? 'pointer' : 'default',
                    bgcolor: card.isMatched 
                      ? 'success.light' 
                      : card.isFlipped 
                        ? 'primary.light' 
                        : 'grey.300',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: !card.isMatched && !endTime 
                        ? 'grey.400' 
                        : undefined
                    }
                  }}
                >
                  {(card.isFlipped || card.isMatched) ? card.value : '?'}
                </Paper>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
