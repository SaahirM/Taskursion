import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function SignedOutHeader() {
  return (
    <AppBar position="sticky" sx={{backgroundColor: 'black'}}>
      <Toolbar>
        <Link href={'/'} style={{textDecoration: 'none', color: 'white'}}>
          <Typography>Taskursion</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}