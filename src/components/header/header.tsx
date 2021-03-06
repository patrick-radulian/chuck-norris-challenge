import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

function Header() {
    return (
        <Box m={4}>
            <Typography variant='h5' fontFamily="Lora" fontWeight={300} align='center'>
                Welcome to the <em>dadochunda </em>
                <Typography display="inline" color={blue[400]}>noun</Typography>
            </Typography>

            <Typography align='center' color={blue[200]}>\ 'da • də • chun, • də \</Typography>

            <Typography align='center' variant='subtitle2' fontFamily="Lora" fontWeight={300}>
                <em>(<u>da</u>ily <u>do</u>se of <u>Chu</u>ck <u>N</u>orris <u>d</u>elivery <u>a</u>pparatus)</em>
            </Typography>
        </Box>
    )
}

export default Header;