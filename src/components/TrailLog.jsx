import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

export default function TrailLog({ componentBackgroundColour, componentHeadingColour, trailLogData }) {
    const data = Array.isArray(trailLogData) ? trailLogData : [];
    return (
        <Box
            sx={{
                borderRadius: 2,
                height: { xs: "30vh", md: "50vh" },
                pb: 3,
                backgroundColor: componentBackgroundColour || "rgba(164, 218, 195, 0.5)",
                width: { xs: "100vw", md: "35vw" },
                maxWidth: {xs: '100%', md: '400px'},
                maxHeight: "500px",
                mt: 0
            }}>
            <Box
                sx={{
                    borderRadius: 2,
                    backgroundColor: componentHeadingColour || "rgba(122, 220, 185, 0.6)",
                    pt: 1,
                    pb: 0.5,
                    mb: 1
                }}>
                <Typography variant="h4" fontSize={{ xs: "20px", md: "25px" }} gutterBottom textAlign="center">
                    Trail Log
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    overflow: "auto",
                    height: "calc(100% - 54px)"
                }}>
                {data.length === 0 ? (
                    <Typography variant="body1" color="text.secondary" sx={{mt: 3}}>
                        Pokémon has not found anything
                    </Typography>
                ) : (
                    <List>
                        {data.map((log, index) => {
                            // Split the log into time and message
                            const [time, message] = log.split("\n");
                            return (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={
                                            <>
                                                <Typography
                                                    variant="body2"
                                                    component="span"
                                                    sx={{ fontWeight: "bold", color: "primary.main"}}>
                                                    {time}
                                                </Typography>
                                                <Typography variant="body2" component="span" sx={{ display: "block" }}>
                                                    {message}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Box>
        </Box>
    );
}

TrailLog.propTypes = {
    componentBackgroundColour: PropTypes.string,
    componentHeadingColour: PropTypes.string,
    trailLogData: PropTypes.array
};
