import {Container, MuiThemeProvider} from '@material-ui/core';
import Header from './components/Header/Header';
import theme from "./theme";
import MarketPlace from "./components/Market/MarketPlace";
import {UseWalletProvider} from "use-wallet";

function App() {
    return (
        <UseWalletProvider
            pollBalanceInterval={100} // unsure about this.
            pollBlockNumberInterval={100} // unsure about this.
            connectors={
                {
                    injected: {
                        chainId: [4]
                    }
                }
            }
        >
            <MuiThemeProvider theme={theme(false)}>
                <div className="App">
                    <Header/>
                    <br/>

                    <Container maxWidth="lg">
                        <MarketPlace/>
                    </Container>
                </div>
            </MuiThemeProvider>
        </UseWalletProvider>
    );
}

export default App;
