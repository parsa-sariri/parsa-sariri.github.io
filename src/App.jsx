import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import WriteupsCatalog from '@/pages/WriteupsCatalog';
import WriteupReader from '@/pages/WriteupReader';
import { LanguageProvider } from '@/lib/LanguageContext';
import CustomCursor from '@/components/CustomCursor';

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <CustomCursor />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/writeups" element={<WriteupsCatalog />} />
            <Route path="/writeups/:slug" element={<WriteupReader />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </LanguageProvider>
  )
}

export default App