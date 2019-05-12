import Colors from "./utils/Color";
const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  gridGrafico: {
    padding: 50
  },
  carousel: {
    height: 150,
    backgroundColor: Colors.blueDetails
  },
  gridTitle: {
    marginTop: 20,
    marginBottom: 10
  },
  gridCard: {
    padding: 30,
    height: "100%"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  },
  button: {
    backgroundColor: Colors.begeEscuro,
    color: Colors.white,
    "&:hover": {
      backgroundColor: Colors.begeClaro
    }
  },
  media: {
    maxHeight: 150,
    [theme.breakpoints.down(1100 + theme.spacing.unit * 3 * 2)]: {
      height: 90
    }
  },
  slideshowContainer: {
    maxWidth: 1000,
    position: "relative",
    margin: "auto"
  },
  imagem: {
    height: 300,
    [theme.breakpoints.down(1100 + theme.spacing.unit * 3 * 2)]: {
      height: 100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

export default styles;
