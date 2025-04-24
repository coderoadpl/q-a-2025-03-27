import { Paper } from "@mui/material";

export interface CardProps {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick?: () => void;
}

export const Card = ({ id, value, isFlipped, isMatched, onClick }: CardProps) => {
  return (
    <Paper
      key={id}
      onClick={onClick}
      elevation={1}
      sx={{
        aspectRatio: '1/1',
        width: '100px',
        height: '100px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '1.875rem', 
        borderRadius: 1,
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: isMatched 
          ? 'success.light' 
          : isFlipped 
            ? 'primary.light' 
            : 'grey.300',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: onClick 
            ? 'grey.400' 
            : undefined
        }
      }}
    >
      {(isFlipped || isMatched) ? value : '?'}
    </Paper>
  );
}; 