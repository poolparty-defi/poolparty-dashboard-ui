import { Container, Grid } from '@material-ui/core';
import AssetCard from './components/AssetCard/AssetCard';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
        <Header />
        <br/>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {
              [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(() => (
                <Grid item xs={3}>
                  <AssetCard title="Some Title" subheader="Some sub header" />
                </Grid>
              ))
            }
          </Grid>
        </Container>
    </div>
  );
}

export default App;
