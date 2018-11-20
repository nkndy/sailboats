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
import PricingCard from './PricingCard';

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
        <Grid container spacing={24} alignItems="flex-end">
          {tiers.map(tier => (
            // Premium card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={4}>
              <div>
                <PricingCard title={tier.title}/>
              </div>
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
