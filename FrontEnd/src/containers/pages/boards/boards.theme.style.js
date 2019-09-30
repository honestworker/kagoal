const styles = theme => ({
  background: {
    background: '#fff',
    width: '100%',
    height: '50vh',
  },
  'primary-card': {
    background: theme.palette.primary.light,
  },
  'board-add-panel': {
    'border': '2px dashed #eee',
    'border-color': theme.palette.text.primary,
    'box-shadow': 'none',
    'margin': '20px 0px',
    'vertical-align': 'top',
    'cursor': 'pointer',
    'border-radius': '2px',
    '&:hover': {
      'border-color': theme.palette.primary.light,
    },
  },
  'board-panel': {
    'margin': '20px 0',
    'box-shadow': '0 2px 4px 0 rgba(192,208,230,0.5)',
    'vertical-align': 'top',
    'cursor': 'pointer',
    'border-radius': '2px',
    'background': '#FFF',
    '&:hover': {
      'box-shadow': '2px 3px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
    },
  },
});

export default styles;
