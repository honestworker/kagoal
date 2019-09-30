/*eslint no-useless-escape: 0*/
export default `import React from 'react';
import Typography from '@material-ui/core/Typography';

const style = {
  width: '100%',
  maxWidth: 500
};

export default function Types() {
  return (
    <div style={style}>
      <Typography variant="h1" gutterBottom>
        Headline 1
      </Typography>
      <Typography variant="h2" gutterBottom>
        Headline 2
      </Typography>
      <Typography variant="h3" gutterBottom>
        Headline 3
      </Typography>
      <Typography variant="h4" gutterBottom>
        Headline 4
      </Typography>
      <Typography variant="h5" gutterBottom>
        Headline 5
      </Typography>
      <Typography variant="h6" gutterBottom>
        Headline 6
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Subheading 1
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Subheading 2
      </Typography>
      <Typography variant="body2" gutterBottom>
        Body 2
      </Typography>
      <Typography variant="body1" gutterBottom align="right">
        Body 1
      </Typography>
      <Typography variant="caption" gutterBottom align="center">
        Caption
      </Typography>
      <Typography gutterBottom noWrap>
        {\`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        \`}
      </Typography>
      <Typography variant="button" gutterBottom>
        Button
      </Typography>
    </div>
  );
}`;
