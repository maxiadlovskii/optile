import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px'
  },
  card: {
    margin: '8px',
    cursor: 'pointer'
  },
  isActive: {
    border: '2px solid black',
    cursor: 'initial'
  },

  cardContent: {
    position: 'relative'
  },

  blur: {
    position: 'absolute',
    content: '" "',
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: '3'
  },

  isMobile: {
    width: '100%'
  },

  control: {
    minWidth: '20px',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer'
  }
}));
