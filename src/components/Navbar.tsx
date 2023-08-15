import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useTheme } from "@mui/material/styles";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectQuanty, setOpenCart } from "../store/CartSlice";
import { SelectCategory } from ".";
import { destroyToken } from "../utils/token";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const totalQty = useSelector(selectQuanty);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCartToggle = () => {
    dispatch(setOpenCart({ cartState: true }));
  };

  const onNavScroll = () => {
    window.scrollY > 30 ? setNavbar(true) : setNavbar(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          !navbar
            ? "absolute top-7 left-0 right-0 opacity-100 z-50"
            : "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme"
        }
      >
        <nav className="flex items-center justify-between nike-container">
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo/img"
              className={`w-16 h-auto cursor-pointer ${
                navbar && "filter brightness-0"
              }`}
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="grid items-center" onClick={handleClickOpen}>
              <MagnifyingGlassIcon
                className={`icon-style ${
                  navbar && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="grid items-center">
              <HeartIcon
                className={`icon-style ${
                  navbar && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="grid items-center">
              <button
                type="button"
                onClick={onCartToggle}
                className="border-none outline-none active:scale-110 transition-all duration-300 relative"
              >
                <ShoppingBagIcon
                  className={`icon-style ${
                    navbar && "text-slate-900 transition-all duration-300"
                  }`}
                />
                <div
                  className={`absolute top-4 right-0  shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navbar
                      ? "bg-slate-900 text-slate-100 shadow-slate-900"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                >
                  {totalQty}
                </div>
              </button>
            </li>
            <li onClick={()=>{
              destroyToken()
            }}>
              <Stack direction="row" spacing={2}>
                <Avatar className="cursor-pointer" alt={"Hasan"} src="/static/images/avatar/1.jpg" />
              </Stack>
            </li>
          </ul>
        </nav>
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {" Search and find your shoes by searching it 🤩"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ m: "10px" }}>
                <SelectCategory />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="error" autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleClose}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </header>
    </>
  );
};

export default Navbar;
