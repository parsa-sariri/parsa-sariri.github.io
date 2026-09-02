import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Home from '@/pages/Home';
import WriteupsPage from '@/pages/WriteupsPage';
import SingleWriteupPage from '@/pages/SingleWriteupPage';
import { LanguageProvider } from '@/lib/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <CustomCursor />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/writeups" element={<WriteupsPage />} />
            <Route path="/writeups/:slug" element={<SingleWriteupPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </LanguageProvider>
  )
}

export default App