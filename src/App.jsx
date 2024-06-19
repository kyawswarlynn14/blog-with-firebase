import { Route, Routes } from "react-router-dom"
import Posts from "./pages/Posts"
import PostDetail from "./pages/PostDetail"
import CategoryPosts from "./pages/CategoryPosts"
import AppStarter from "./pages/AppStarter"
import PageNotFound from "./pages/PageNotFound"
import { DataProvider } from "./utils/DataContext"

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<AppStarter />}>
          <Route path="" index={true} element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/category-posts/:id" element={<CategoryPosts />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </DataProvider>
  )
} 

export default App
