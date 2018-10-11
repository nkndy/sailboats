import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
  copyright: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 8,
  },
});
const footers = [
  {
    title: 'About Us',
    description: ['Our Story', 'Company', 'Careers'],
  },
  {
    title: 'FAQ',
    description: ['Are Listings Free?'],
  },
  {
    title: 'Support',
    description: ['Ask Us', 'Become A Partner', 'Current Partners'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function Footer(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Footer */}
      <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="headline" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography key={item} variant="subheading" color="textSecondary">
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={32} justify="space-evenly">
          <Grid item xs>
            <div className={classNames(classes.copyright)}>
              <Typography variant="caption" color="textSecondary">Fair Winds and Following Seas
              <span role="img" aria-label="sheep"> ⛵ </span>
              The Tradewind Crew
              </Typography>
            </div>
          </Grid>
        </Grid>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
