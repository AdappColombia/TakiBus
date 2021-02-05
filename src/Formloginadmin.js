import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import { Class } from "@material-ui/icons";
import firebaseConfig from "./firebaseConfig";
import Box from '@material-ui/core/Box';

/****************************************
 * Etilos de Uso:
 * estos dan el estilo css a los componentes
 * toma como referencia el tema general
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  paperTiket: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },

  gridLogin: {
    padding: 50,
  },

  paperLogin: {
    width: "60%", // Fix IE 11 issue.
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    margin: 25,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Formloginadmin = (props) => {
  const { email, setEmail, pass, setPass, logearUsuario, crearUsuario } = props;
  const [open, setOpen] = React.useState(false);
  const [opentiket, setOpenTiket] = React.useState(false);
  const [numTiket, setNumTiket] = React.useState("");
  const [tiket, setTiket] = React.useState("");
  const [openNew, setOpenNew] = React.useState("");
  const [user, setUser] = React.useState("");
  const classes = useStyles();

  /*******************************************
   * Manejo de Clikc abrir:
   * maneja el evento de abrir el dialogo
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /******************************************
   * Manejo de Cierre:
   * maneja el evento de cerrar el Dialogo,
   * verifica si se ha ingresado algun email;
   * si es asi ejecuta la funcion
   * pasada por props logearUsuario.
   */
  const handleClose = () => {
    if (email != "") {
      logearUsuario();
    }

    setOpen(false);
  };

  /*******************************************
   * Manejo de Clikc abrir:
   * maneja el evento de abrir el dialogo
   */
  const handleClickOpenTiket = () => {
    setOpenTiket(true);
  };

  /******************************************
   * Manejo de Cierre:
   * maneja el evento de cerrar el Dialogo,
   * verifica si se ha ingresado algun email;
   * si es asi ejecuta la funcion
   * pasada por props logearUsuario.
   */
  const handleCloseTiket = () => {
    setOpenTiket(false);
  };

  const consultarUser =() => {
    // cunsultamos si de alguna forma esta logeado
    var user = firebaseConfig.auth().currentUser;
    console.log("Este es: ",user);
    setOpenNew(true);
  }


  const handleOpenNew = () => {
    consultarUser();
 
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };



  const consultarTiket = () => {
    firebaseConfig
      .firestore()
      .collection("tikets")
      .doc(numTiket)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTiket(doc.data().nombre);
          handleClickOpenTiket();
        } else {
          alert("Este tiket no exite");
        }
      });
  };

  return (




    <Grid

    container
    direction="row"
    justify="center"
    alignItems="center"
      
    >
      {/*<!-- grid numero uno -->*/}
      <Grid item xs={6}>
       
      <Box mt={10}></Box>
      <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
           
            <Grid container
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
              <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
                

                <Typography component="h1" variant="h5">
                  TakiBus
                </Typography>
              </Grid>
     

    
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />


                
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
          

              

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {this.peticionGetAdmin()}}
      
                >
                  Iniciar Sesión
                </Button>

              

   
                <Grid container
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >


                <Link 
                  href="#" 
                  to="/"
                  variant="body2">
                  Volver a Usuarios
                </Link>
                </Grid>

              
                <Grid container
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >

                    
                     Inicio de sesión tipo administrador 
                </Grid>
     
            </div>
          
          </Container>
      </Grid>


    </Grid>


  );
};

export default Formloginadmin;
