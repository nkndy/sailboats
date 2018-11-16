import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";

const styles = theme => ({
  tagline: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
  fullWidth : {
    width: '100%',
  },
});

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ["Easily Add photo's", 'Email Phone & SMS Contact', 'SomeOther Feature'],
    buttonText: 'Post Now for free',
    buttonVariant: 'outlined',
    buttonLink: '/new-sailboat-listing',
  },
  {
    title: 'Premium Listing',
    subheader: 'Most popular',
    price: '19',
    description: [
      'Everything in free',
      '+ add videos to your listing',
      '+ chat right on the site to interested buyers',
      '+ An Extra listing on our homepage and Search Bias',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
    buttonLink: '/new-sailboat-listing',
  },
  {
    title: 'List as a Broker',
    price: '89',
    description: [
      'Includes 10 Premium Listings',
      'Phone & email support',
      'Additional in listing broker identity and contact details',
      'Additional Premium Listings at 50% off',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
    buttonLink: '/new-sailboat-listing',
  },
];

function PricingTable(props) {
    const { classes } = props;
    return (
      <React.Fragment>
        <Typography variant="h5" component="h3" className={classNames(classes.tagline)}>
          List your sailboat
        </Typography>
        <Grid container spacing={40} alignItems="flex-end">
          {tiers.map(tier => (
            // Premium card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  // action={tier.title === 'Premium Listing' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h6" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <NavLink to={tier.buttonLink} style={{ width: '100%' }}>
                    <Button variant={tier.buttonVariant} color="secondary" className={classes.fullWidth}>
                      {tier.buttonText}
                    </Button>
                  </NavLink>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
}

PricingTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PricingTable);
