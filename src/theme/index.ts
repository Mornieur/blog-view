export const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: '#ececec',
    minHeight: '100vh',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: '#333',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
};
