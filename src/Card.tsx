import { Paper, Box } from "@mui/material";

export interface CardProps {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick?: () => void;
}

export const Card = ({ id, value, isFlipped, isMatched, onClick }: CardProps) => {
  return (
    <Box
      style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: isFlipped || isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      <Paper
        key={`${id}-front`}
        onClick={onClick}
        elevation={1}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.875rem',
          borderRadius: 1,
          cursor: onClick ? 'pointer' : 'default',
          bgcolor: 'grey.300',
          '&:hover': {
            bgcolor: onClick ? 'grey.400' : undefined
          }
        }}
      >
        ?
      </Paper>
      <Paper
        key={`${id}-back`}
        elevation={1}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.875rem',
          borderRadius: 1,
          bgcolor: isMatched ? 'success.light' : 'primary.light',
          transform: 'rotateY(180deg)',
        }}
      >
        {value}
      </Paper>
    </Box>
  );
}; 