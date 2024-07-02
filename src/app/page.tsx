'use client'

import {useState} from 'react';
import {FilterTable} from '@/components/FilterTable';
import {RefreshContext} from '@/context/RefreshContext';


export default function Home() {
  const [refresh, setRefresh] = useState(false);


  return (
    <main>
      <RefreshContext.Provider value={{refresh, setRefresh}}>
        <FilterTable/>
      </RefreshContext.Provider>
    </main>
  );
}
