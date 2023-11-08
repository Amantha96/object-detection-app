import './App.css';
import { Grid } from '@mui/material';
import TopBar from './components/TopBar/TopBar';
import MiddleBox from './components/MiddleBox/Middlebox';


function App() {
  return (
    <Grid>

      <Grid>
        <TopBar />
      </Grid>


      <Grid >
        <MiddleBox />
      </Grid>




    </Grid>
  );
}

export default App;
