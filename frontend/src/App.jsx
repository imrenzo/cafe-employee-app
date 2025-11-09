import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CafesPages from './pages/CafesPage'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import EmployeesPage from './pages/EmployeesPage';
import EmployeesForm from './pages/EmployeesForm';
import CafesForm from './pages/CafesForm';
import { AppLayout, CenteredPage } from './components/AppLayout';
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {

  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path='/' element={<CafesPages />} />
            <Route path='/employees/cafe/:cafeName' element={<EmployeesPage />} />
            <Route path='/employees/' element={<EmployeesPage />} />

            {/* Form */}
            <Route path='/employees/add' element={<CenteredPage><EmployeesForm /></CenteredPage>} />
            <Route path='/employees/edit' element={<CenteredPage><EmployeesForm required /></CenteredPage>} />

            <Route path='/cafes/add' element={<CenteredPage><CafesForm /></CenteredPage>} />
            <Route path='/cafes/edit' element={<CenteredPage><CafesForm required /></CenteredPage>} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </>
  )
}

export default App

