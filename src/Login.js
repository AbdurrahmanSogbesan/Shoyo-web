import { Button } from "@material-ui/core";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase/firebase";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { useNavigate } from "react-router-dom";
// import Yogurt from "./images/yogurt.png";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            userName: result.user.displayName,
            email: result.user.email,
            id: result.user.uid,
          })
        );
        navigate("/");
        toast.success(
          `Welcome ${result.user.displayName}!`,
          { position: toast.POSITION.TOP_CENTER },
          { autoClose: 10000 }
        );
        toast.clearWaitingQueue();
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // ...
      })
      .catch((error) =>
        toast.error(
          error,
          { position: toast.POSITION.TOP_CENTER },
          { autoClose: 10000 }
        )
      );
  };

  return (
    <div className="login">
      <span className="shoyo-name">
        <RiceBowlIcon sx={{ fontSize: "28px", color: "#6d7ae0", mr: "10px" }} />
        Shoyo's Creamery
      </span>

      <div className="container-left">
        <div className="sign-in-container">
          <span className="sign-in">Sign In</span>
          <small className="small-text">Log In to get access to the cart</small>
          <Button
            variant="contained"
            onClick={signIn}
            className="login-button"
            endIcon={<GoogleIcon />}
            color="secondary"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="container-right">
        {/* <img src={Yogurt} alt="yogurt" className="yogurt" /> */}
      </div>
    </div>
  );
}

export default Login;
