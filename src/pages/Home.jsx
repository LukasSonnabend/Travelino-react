import React, { useState } from 'react';
import { NavigationBar, MainSearch, Footer} from '../index.jsx';

function Home() {
    return (
      <div>
          <NavigationBar/>
          <MainSearch/>
          <Footer/>
      </div>
    );
  }
  
  export default Home;