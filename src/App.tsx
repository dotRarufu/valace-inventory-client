import { Routes, Route, Navigate } from 'react-router-dom';
import ActivityLog from './pages/activity-log';
import Accounts from './pages/accounts';
import Login from './pages/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import useUser from './hooks/useUser';
import { UserContext } from './contexts/UserContext';
import Items from './pages/items';
import { Toaster } from 'react-hot-toast';
import UserDataDisplay from './pages/user-data-display/UserDataDisplay';
import SidebarWrapper from './components/ui/SidebarWrapper';
import Landing from './pages/landing/Landing';
import Reports from './pages/reports/Reports';
import Unauthorized from './pages/unauthorized/unauthorized';
import Shipment from './pages/officer/shipment/Shipment';
import Stocks from './pages/officer/stocks/Stocks';
import Utilize from './pages/officer/utilize/Utilize';
import MobileAppWrapper from './components/ui/MobileAppWrapper';
import ShipmentItemInfo from './pages/officer/shipment/ShipmentItemInfo';
import StockItemInfo from './pages/officer/stocks/StocktemInfo';
import StockItemHistory from './pages/officer/stocks/StockItemHistory';

const App = () => {
  const { user, setShouldGetUser } = useUser();

  return (
    <UserContext.Provider value={{ user, setShouldGetUser }}>
      <Toaster />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute
              redirectPath={
                user === null ? '/login' : user.is_admin ? '/admin' : '/staff'
              }
              isAllowed={!!user && user.is_admin}
              children={<SidebarWrapper />}
            />
          }
        >
          <Route index element={<Navigate to="items" />} />
          <Route path="reports" element={<Reports />} />

          <Route path="items" element={<Items />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="activity-log" element={<ActivityLog />} />
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route
          path="staff"
          element={
            <ProtectedRoute
              redirectPath={
                user === null ? '/login' : !user.is_admin ? '/staff' : '/admin'
              }
              isAllowed={!!user && !user.is_admin}
              children={<SidebarWrapper />}
            />
          }
        >
          <Route index element={<Navigate to="items" />} />
          <Route path="reports" element={<Reports />} />
          <Route path="items" element={<Items />} />
        </Route>
        <Route
          path="officer"
          element={
            <ProtectedRoute
              // redirectPath={
              //   user === null ? '/login' : user.role
              // }
              // isAllowed={!!user && !user.is_admin}
              redirectPath={''}
              isAllowed={true}
              children={<MobileAppWrapper />}
            />
          }
        >
          <Route index element={<Navigate to="shipments" />} />
          <Route path="shipments" element={<Shipment />}>
            <Route path=":id" element={<ShipmentItemInfo />} />
          </Route>
          <Route path="stocks" element={<Stocks />}>
            <Route path=":id" element={<StockItemInfo />}>
              <Route path="history">
                <Route path=":id" element={<StockItemHistory />} />
              </Route>
            </Route>
          </Route>
          <Route path="utilize" element={<Utilize />} />
        </Route>

        <Route path="user" element={<UserDataDisplay />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
