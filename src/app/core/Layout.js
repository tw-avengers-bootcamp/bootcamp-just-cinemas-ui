import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => {
  return ({
    root: {
      flexGrow: 1,
    },

    paper: {
      height: 140,
      width: 100,
    },
    demo: {
      marginTop: 50
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  })
}

class Layout extends React.Component {
  state = {
    spacing: '16',
    open : false,
    username : ''
  };


  
  openModal = (username) => {
    this.setState({ open: true , username }, () => {})
  }

  render() {
    const { classes, children, col } = this.props
    const { spacing } = this.state
    let size = parseInt(12 / col)

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="left" spacing={Number(spacing)}>
            {React.Children.map(children, (child, index) => (
              <Grid key={index} xs={size} item>
                {React.cloneElement(child, {openModal: this.openModal})}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  col: PropTypes.number.isRequired,
  children: PropTypes.array
}

export default withStyles(styles)(Layout)