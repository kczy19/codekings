import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Room } from './pages/Room';
import { CreateRoom } from './pages/CreateRoom';
import { JoinRoom } from './pages/JoinRoom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/room/create" element={<CreateRoom />} />
        <Route path="/room/join" element={<JoinRoom />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-8">Code Battle</h1>
                <div className="space-y-4">
                  <a
                    href="/room/create"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-center"
                  >
                    Create Room
                  </a>
                  <a
                    href="/room/join"
                    className="block w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition text-center"
                  >
                    Join Room
                  </a>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}