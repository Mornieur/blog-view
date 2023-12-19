import { Box, Skeleton, Typography } from '@mui/material';

type DataPostProps = {
  title: string;
  body: string;
};

const DataPost: React.FC<DataPostProps> = ({ title, body }) => {
  return (
    <Box
      sx={{
        maxWidth: '80%',
        m: 'auto',
        mt: 4,
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ p: '1rem 0' }}
        data-testid="skeleton"
      />
      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        {body}
      </Typography>
    </Box>
  );
};

export default DataPost;
