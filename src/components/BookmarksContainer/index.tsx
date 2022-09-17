import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useBookmarks } from "../../providers/BookmarksProvider";

const Bookmark = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const BookmarksContainer = () => {
  const { loading, root, map } = useBookmarks();

  if (loading) {
    return <></>;
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {root.map(id => {
          const node = map[id];
          return (
            <Grid item xs={2}>
              <Bookmark>{node.title}</Bookmark>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  )
}