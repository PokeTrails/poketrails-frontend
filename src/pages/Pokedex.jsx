import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, CircularProgress, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { capitaliseName } from "../utils";

const Pokedex = () => {

    // Initialise state variables
    const [pokemonData, setPokemonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [nonDonatedPopup, setNonDonatedPopup] = useState(null);

    const apiURL = `${import.meta.env.VITE_API_SERVER_URL}/pokedex`;
    const jwt = localStorage.getItem("jwt");


    // Fetch Pokémon data from the server
    useEffect(() => {
        const fetchPokedexData = async () => {
            try {
                const response = await axios.get(apiURL, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                setPokemonData(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching Pokémon data:", err);
                setError("Failed to fetch Pokémon data.");
                setIsLoading(false);
            }
        };

        fetchPokedexData();
    }, [apiURL, jwt]);

    // Handle Pokémon click event
    const handlePokemonClick = (pokemon) => {
        if (pokemon.donated) {
            setSelectedPokemon(pokemon);
        } else {
            setNonDonatedPopup(pokemon);
        }
    };

    // Handle close dialog event
    const handleCloseDialog = () => {
        setSelectedPokemon(null);
        setNonDonatedPopup(null);
    };

    // Handle close non-donated popup event
    const handleCloseNonDonatedPopup = () => {
        setNonDonatedPopup(null);
    };


    // Display loading spinner while fetching data
    if (isLoading) {
        return <CircularProgress sx={{ mt: 2 }} />;
    }

    // Display error message if data fetching failed
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    // Sort the Pokémon data into donated and non-donated by Pokedex ID
    const donatedPokemons = pokemonData.filter((pokemon) => pokemon.donated);
    const sortedDonatedPokemon = donatedPokemons.sort((a, b) => a.species_id - b.species_id);

    const nonDonatedPokemons = pokemonData.filter((pokemon) => !pokemon.donated);
    const sortedNonDonatedPokemons = nonDonatedPokemons.sort((a, b) => a.species_id - b.species_id);

    return (
        <Box
            sx={{
                mt: 2,
                pb: 3,
                backgroundColor: "#E4BCAF",
                width: { xs: "100%", md: "90%" },
                maxWidth: "1200px",
                mx: "auto",
                borderRadius: 2
            }}>
            <Box
                sx={{
                    borderRadius: 2,
                    backgroundColor: "#DFAB9A",
                    pt: 1,
                    pb: 0.5,
                    mb: 1
                }}>
                <Typography variant="h4" fontSize={{ xs: "20px", md: "25px" }} gutterBottom textAlign="center">
                    Pokédex
                </Typography>
            </Box>

            {/* Donated Pokémon Section */}
            <Box
                sx={{
                    mb: 3,
                    padding: 3,
                    borderRadius: 2,
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(15px)",
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "20px"
                }}>
                <Typography variant="h5" gutterBottom fontSize={{xs: '18px', md: '22px'}}>
                    Donated Pokémon
                </Typography>
                <Grid container spacing={2}>
                    {sortedDonatedPokemon.map((pokemon) => (
                        <Grid
                            item
                            key={pokemon._id}
                            xs={4}
                            sm={3}
                            md={2}
                            sx={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                onClick={() => handlePokemonClick(pokemon)}
                                sx={{
                                    border: 1,
                                    borderColor: "#DBAF8E",
                                    borderRadius: 2,
                                    backgroundColor: "#FBAF8E",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: "80px", sm: "100px", md: "90px" },
                                    height: { xs: "80px", sm: "100px", md: "90px" },
                                    margin: "8px",
                                    cursor: "pointer",
                                    overflow: "hidden"
                                }}>
                                <img
                                    src={pokemon.sprite}
                                    alt={pokemon.nickname}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        transition: "none"
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Non-Donated Pokémon Section */}
            <Box
                sx={{
                    padding: 2,
                    borderRadius: 2,
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(15px)",
                    marginLeft: "20px",
                    marginRight: "20px",
                    position: "relative",
                    minHeight: "300px" // Ensure there's enough space for floating Pokémon
                }}>
                <Typography variant="h5" gutterBottom fontSize={{xs: '18px', md: '22px'}}>
                    Undiscovered Pokémon
                </Typography>
                <Grid container spacing={2} sx={{ position: "relative" }}>
                    {sortedNonDonatedPokemons.map((pokemon) => (
                        <Grid
                            item
                            key={pokemon._id}
                            xs={4}
                            sm={3}
                            md={2}
                            sx={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                onClick={() => handlePokemonClick(pokemon)}
                                sx={{
                                    border: 1,
                                    borderColor: "#DBAF8E",
                                    borderRadius: 2,
                                    backgroundColor: "#FBAF8E",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: { xs: "80px", sm: "100px", md: "90px" },
                                    height: { xs: "80px", sm: "100px", md: "90px" },
                                    margin: "8px",
                                    cursor: "pointer",
                                    overflow: "hidden"
                                }}>
                                <img
                                    src={pokemon.sprite}
                                    alt={pokemon.nickname}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                        filter: "grayscale(100%) brightness(0%)" // Apply black color filter to sprite
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {selectedPokemon && (
                <Dialog open={true} onClose={handleCloseDialog}>
                    <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton>
                        <img
                            src={selectedPokemon.sprite}
                            alt={selectedPokemon.nickname}
                            style={{ 
                                height: 'auto',
                                maxWidth: "100px", 
                                maxHeight: "130px",
                                transition: "none" }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {capitaliseName(selectedPokemon.species)} #{selectedPokemon.species_id}
                        </Typography>
                        <Typography sx={{ mt: 1, textAlign: "center" }}>{selectedPokemon.flavour_text}</Typography>
                        <Typography sx={{ mt: 1, textAlign: "center" }}>
                            Discovered Date: {new Date(selectedPokemon.createdAt).toLocaleDateString()}
                        </Typography>
                    </DialogContent>
                </Dialog>
            )}

            {nonDonatedPopup && (
                <Dialog open={true} onClose={handleCloseNonDonatedPopup}>
                    <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleCloseNonDonatedPopup}>
                            <CloseIcon />
                        </IconButton>
                        <img
                            src={nonDonatedPopup.sprite} // Use nonDonatedPopup.sprite instead of selectedPokemon.sprite
                            alt={nonDonatedPopup.nickname} // Use nonDonatedPopup.nickname
                            style={{ 
                                height: 'auto',
                                maxWidth: "100px", 
                                maxHeight: "130px", 
                                transition: "none", 
                                filter: "grayscale(100%) brightness(0%)" }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            ??? #{nonDonatedPopup.species_id}
                        </Typography>
                        <Typography sx={{ mt: 1, textAlign: "center" }}>
                            You need to donate this Pokémon before you can view its details.
                        </Typography>
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    );
};

export default Pokedex;
