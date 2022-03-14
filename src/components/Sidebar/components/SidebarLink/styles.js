import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#98a2e496",
    },
  },
  linkActive: {
    backgroundColor: "#fff",
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover": {
      backgroundColor: "#98a2e496",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: "#fff",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    justifyContent: "center",
  },
  linkIconActive: {
    color: "#b41712",
  },
  linkText: {
    padding: 0,
    color: "#fff",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: "#b41712",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
